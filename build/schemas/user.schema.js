"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string().uuid();
const firtName = joi_1.default.string();
const lastName = joi_1.default.string();
const password = joi_1.default.string();
exports.createUserSchema = joi_1.default.object({
    id: id.required(),
    firtName: firtName.required(),
    lastName: lastName.required(),
    password: password.required()
});
exports.updateUserSchema = joi_1.default.object({
    firtName: firtName.required(),
    lastName: lastName.required(),
    password: password.required()
});
exports.getUserSchema = joi_1.default.object({
    id: id.required()
});
