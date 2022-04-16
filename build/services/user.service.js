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
class UserService {
    constructor() {
        this.users = [
            {
                id: '123',
                name: 'user',
                lastName: 'lastname',
                password: 'pass',
                role: 'guest',
                email: 'as@asd.com'
            }
        ];
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(user => user.id === id);
            if (!user) {
                throw boom_1.default.notFound('Product not found');
            }
            return user;
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(user => user.email === body.email);
            if (user) {
                throw boom_1.default.badRequest();
            }
            return user;
        });
    }
}
exports.default = UserService;
