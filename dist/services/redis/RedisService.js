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
const ioredis_1 = __importDefault(require("ioredis"));
// Initialize Redis client
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '13957', 10),
    password: process.env.REDIS_PASSWORD
});
const REDIS_KEY_PREFIX = 'user_stripe_session:';
class RedisService {
    getClient() {
        return redisClient;
    }
    storeRefreshToken(userId, refreshToken, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redisClient.set(`refresh_token:${userId}`, refreshToken, 'EX', ttl);
        });
    }
    getRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redisClient.get(`refresh_token:${userId}`);
        });
    }
    deleteRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield redisClient.del(`refresh_token:${userId}`);
            if (response === 1) {
                return true;
            }
        });
    }
    saveUserStripeSession(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set with expiration 30 minutes
            const key = REDIS_KEY_PREFIX + userId;
            yield redisClient.set(key, sessionId, 'EX', 1800);
        });
    }
    getUserStripeSession(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = REDIS_KEY_PREFIX + userId;
            return yield redisClient.get(key);
        });
    }
    removeUserStripeSession(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = REDIS_KEY_PREFIX + userId;
            yield redisClient.del(key);
        });
    }
}
exports.default = new RedisService();
