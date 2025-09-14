"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenUtils_1 = require("../../../utils/tokenUtils");
const RedisService_1 = __importDefault(require("../../redis/RedisService"));
const AppError_1 = require("../../../error/AppError");
const errorMessages_1 = require("../../../constants/errorMessages");
const statusCodes_1 = require("../../../constants/statusCodes");
const UserMapper_1 = __importDefault(require("../../../mappers/user/UserMapper"));
const registration_validation_1 = require("../../../validations/auth/registration.validation");
const signin_validation_1 = require("../../../validations/auth/signin.validation");
class AuthService {
    constructor(authRepository, hash) {
        this._authRepository = authRepository;
        this._hash = hash;
    }
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = registration_validation_1.RegistrationSchema.parse(userData);
                if (!validatedData.email) {
                    throw new AppError_1.ValidationError(errorMessages_1.ErrorMessages.EMAIL_MISSING, statusCodes_1.StatusCodes.BAD_REQUEST);
                }
                const existingUser = yield this._authRepository.checkUserExist(validatedData.email);
                if (existingUser) {
                    throw new AppError_1.ValidationError(errorMessages_1.ErrorMessages.USER_ALREADY_EXISTS, statusCodes_1.StatusCodes.BAD_REQUEST);
                }
                if (!validatedData.password) {
                    throw new AppError_1.ValidationError(errorMessages_1.ErrorMessages.PASSWORD_MISSING, statusCodes_1.StatusCodes.BAD_REQUEST);
                }
                const hashedPassword = yield this._hash.hash(validatedData.password);
                const parsedUserData = Object.assign(Object.assign({}, validatedData), { password: hashedPassword });
                const mappedData = UserMapper_1.default.toModel(parsedUserData);
                const createdUser = yield this._authRepository.createUser(mappedData);
                const userDetails = UserMapper_1.default.toIUserDTO(createdUser);
                let accessToken, refreshToken;
                try {
                    accessToken = (0, tokenUtils_1.generateAccessToken)(userDetails);
                    refreshToken = (0, tokenUtils_1.generateRefreshToken)(userDetails);
                }
                catch (error) {
                    if (error) {
                        throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                    }
                }
                if (!accessToken || !refreshToken)
                    throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                //Store the refresh token in Redis with a TTL 
                const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60;
                try {
                    yield RedisService_1.default.storeRefreshToken(userDetails.user_id, refreshToken, REFRESH_TOKEN_TTL);
                }
                catch (error) {
                    if (error) {
                        // Roll back user creation if Redis fails 
                        yield RedisService_1.default.deleteRefreshToken(userDetails.user_id);
                        throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.REFRESH_TOKEN_STORAGE_ERROR, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                    }
                }
                return { userDetails, accessToken };
            }
            catch (error) {
                throw (0, AppError_1.wrapServiceError)(error);
            }
            ;
        });
    }
    signin(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                signin_validation_1.SigninSchema.parse(formData);
                const userDetails = yield this._authRepository.checkUserExist(formData.email);
                if (!userDetails) {
                    throw new AppError_1.ValidationError(errorMessages_1.ErrorMessages.USER_NOT_FOUND, statusCodes_1.StatusCodes.BAD_REQUEST);
                }
                const mapToDTO = UserMapper_1.default.toIUserDTO(userDetails);
                const hashedPasswordInDatabase = mapToDTO.password;
                const userProvidedPassword = formData.password;
                // Check whether the password matches
                const isMatched = yield this._hash.verify(userProvidedPassword, hashedPasswordInDatabase);
                if (!isMatched) {
                    throw new AppError_1.ValidationError(errorMessages_1.ErrorMessages.INVALID_CREDENTIALS, statusCodes_1.StatusCodes.UNAUTHORIZED);
                }
                // Generate tokens using the utility functions 
                let accessToken, refreshToken;
                try {
                    accessToken = (0, tokenUtils_1.generateAccessToken)(mapToDTO);
                    refreshToken = (0, tokenUtils_1.generateRefreshToken)(mapToDTO);
                }
                catch (error) {
                    if (error)
                        throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                }
                if (!accessToken || !refreshToken)
                    throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                //Store the refresh token in Redis with a TTL 
                const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60;
                try {
                    yield RedisService_1.default.storeRefreshToken(mapToDTO.user_id, refreshToken, REFRESH_TOKEN_TTL);
                }
                catch (error) {
                    if (error)
                        throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.REFRESH_TOKEN_STORAGE_ERROR, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                }
                return { userDetails: mapToDTO, accessToken };
            }
            catch (error) {
                throw (0, AppError_1.wrapServiceError)(error);
            }
            ;
        });
    }
    signout(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (0, tokenUtils_1.extractUserIdFromToken)(accessToken);
                const isRefreshTokenRemoved = yield RedisService_1.default.deleteRefreshToken(userId);
                if (!isRefreshTokenRemoved) {
                    throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.REFRESH_TOKEN_REMOVAL_ERROR, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                }
                return true;
            }
            catch (error) {
                throw (0, AppError_1.wrapServiceError)(error);
            }
        });
    }
}
exports.default = AuthService;
