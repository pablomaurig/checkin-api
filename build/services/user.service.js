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
const boom_1 = __importDefault(require("@hapi/boom"));
const user_entity_1 = require("../entities/user.entity");
const hash_1 = require("@utils/hash");
class UserService {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_entity_1.User.find();
            if (users.length === 0)
                throw boom_1.default.notFound('User not found');
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOneBy({
                id: id,
            });
            if (!user) {
                throw boom_1.default.notFound('User not found');
            }
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOneBy({
                email: email,
            });
            if (!user) {
                throw boom_1.default.notFound('User not found');
            }
            return user;
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            const hash = yield (0, hash_1.hashPassword)(password);
            const user = new user_entity_1.User();
            user.email = email;
            user.password = hash;
            user.role = 'host';
            yield user.save();
            return user.id;
        });
    }
    updateUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOneBy({ id: id });
            if (!user) {
                throw boom_1.default.notFound('User does not exists');
            }
            const updateUser = Object.assign(Object.assign({}, body), { updatedAt: new Date() });
            yield user_entity_1.User.update({ id: id }, updateUser);
            const updatedUser = yield user_entity_1.User.findOneBy({ id: id });
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.User.findOneBy({ id: id });
            if (!user) {
                throw boom_1.default.notFound('User does not exists');
            }
            yield user.remove();
            return user;
        });
    }
}
exports.default = UserService;
