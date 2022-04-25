"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.number();
const firstName = joi_1.default.string();
const lastName = joi_1.default.string();
const password = joi_1.default.string();
const email = joi_1.default.string().email();
exports.createUserSchema = joi_1.default.object({
    email: email.required(),
    password: password.required(),
});
exports.updateUserSchema = joi_1.default.object({
    firstName: firstName,
    lastName: lastName,
});
exports.getUserSchema = joi_1.default.object({
    id: id.required(),
});
