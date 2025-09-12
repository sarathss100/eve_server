import IAuthService from '../interfaces/IAuthService';
import IAuthRepository from '../../../repositories/auth/interface/IAuthRepository';
import IHash from '../../../utils/auth/interfaces/IHash';
import { extractUserIdFromToken, generateAccessToken, generateRefreshToken } from '../../../utils/tokenUtils';
import RedisService from '../../redis/RedisService';
import { ServerError, ValidationError, wrapServiceError } from '../../../error/AppError';
import { ErrorMessages } from '../../../constants/errorMessages';
import { StatusCodes } from '../../../constants/statusCodes';
import UserMapper from '../../../mappers/user/UserMapper';
import IRegisterDTO from '../../../dtos/auth/IRegisterDTO';
import { RegistrationSchema } from '../../../validations/auth/registration.validation';
import IRegisterationResponseDTO from '../../../dtos/auth/IRegistrationResponseDTO';
import ISigninDTO from '../../../dtos/auth/ISigninDTO';
import { SigninSchema } from '../../../validations/auth/signin.validation copy';

export default class AuthService implements IAuthService {
    private _authRepository: IAuthRepository;
    private _hash: IHash;

    constructor(authRepository: IAuthRepository, hash: IHash) {
        this._authRepository = authRepository;
        this._hash = hash;
    }

    async registerUser(userData: IRegisterDTO): Promise<IRegisterationResponseDTO> {
        try {
            RegistrationSchema.parse(userData); 

            if (!userData.email) {
                throw new ValidationError(ErrorMessages.EMAIL_MISSING, StatusCodes.BAD_REQUEST);
            }

            const existingUser = await this._authRepository.checkUserExist(userData.email);

            if (existingUser) {
                throw new ValidationError(ErrorMessages.USER_ALREADY_EXISTS, StatusCodes.BAD_REQUEST);
            }

            if (!userData.password) {
                throw new ValidationError(ErrorMessages.PASSWORD_MISSING, StatusCodes.BAD_REQUEST);
            }

            const hashedPassword = await this._hash.hash(userData.password);

            const parsedUserData = { ...userData, password: hashedPassword };

            const mappedData = UserMapper.toModel(parsedUserData);

            const createdUser = await this._authRepository.createUser(mappedData);

            const userDetails = UserMapper.toIUserDTO(createdUser);
            
            let accessToken, refreshToken;

            try {
                accessToken = generateAccessToken(userDetails);
                refreshToken = generateRefreshToken(userDetails);
            } catch (error) {
                if (error) {
                    throw new ServerError(ErrorMessages.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
                }
            }

            if (!accessToken || !refreshToken) throw new ServerError(ErrorMessages.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);

            //Store the refresh token in Redis with a TTL 
            const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60;
            
            try {
                await RedisService.storeRefreshToken(userDetails.user_id, refreshToken, REFRESH_TOKEN_TTL);
            } catch (error) {
                if (error) {
                    // Roll back user creation if Redis fails 
                    await RedisService.deleteRefreshToken(userDetails.user_id);
                    throw new ServerError(ErrorMessages.REFRESH_TOKEN_STORAGE_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
                }
            }
            
            return { userDetails, accessToken };
        } catch (error) {
            throw wrapServiceError(error);
        };
    } 

    async signin(formData: ISigninDTO): Promise<IRegisterationResponseDTO> {
        try {
            SigninSchema.parse(formData);

            const userDetails = await this._authRepository.checkUserExist(formData.email);

            if (!userDetails) {
                throw new ValidationError(ErrorMessages.USER_NOT_FOUND, StatusCodes.BAD_REQUEST);
            }

            const mapToDTO = UserMapper.toIUserDTO(userDetails);

            const hashedPasswordInDatabase = mapToDTO.password;

            const userProvidedPassword = formData.password;

            // Check whether the password matches
            const isMatched = await this._hash.verify(userProvidedPassword, hashedPasswordInDatabase!);

            if (!isMatched) {
                throw new ValidationError(ErrorMessages.INVALID_CREDENTIALS, StatusCodes.UNAUTHORIZED);
            } 

            // Generate tokens using the utility functions 
            let accessToken, refreshToken;

            try {
                accessToken = generateAccessToken(mapToDTO);
                refreshToken = generateRefreshToken(mapToDTO);
            } catch (error) {
                if (error) throw new ServerError(ErrorMessages.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
            }

            if (!accessToken || !refreshToken) throw new ServerError(ErrorMessages.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);

            //Store the refresh token in Redis with a TTL 
            const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60;
            try {
                await RedisService.storeRefreshToken(mapToDTO.user_id, refreshToken, REFRESH_TOKEN_TTL);
            } catch (error) {
                if (error) throw new ServerError(ErrorMessages.REFRESH_TOKEN_STORAGE_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
            }
             
            return { userDetails: mapToDTO, accessToken };
        } catch (error) {
            throw wrapServiceError(error);
        };
    }

    async signout(accessToken: string): Promise<boolean> {
        try {
            const userId = extractUserIdFromToken(accessToken);

            const isRefreshTokenRemoved = await RedisService.deleteRefreshToken(userId);

            if (!isRefreshTokenRemoved!) {
                throw new ServerError(ErrorMessages.REFRESH_TOKEN_REMOVAL_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
            }
            
            return true;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }
}

