"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_handler_1 = require("@middlewares/auth.handler");
const validator_handler_1 = __importDefault(require("@middlewares/validator.handler"));
const user_schema_1 = require("@schemas/user.schema");
const user_controller_1 = require("@controllers/user.controller");
const router = express_1.default.Router();
router.get('/', auth_handler_1.checkApiKey, user_controller_1.getUsers);
router.get('/:id', 
// checkApiKey,
(0, validator_handler_1.default)(user_schema_1.getUserSchema, 'params'), user_controller_1.getUserById);
router.post('/', (0, validator_handler_1.default)(user_schema_1.createUserSchema, 'body'), user_controller_1.createUser);
router.patch('/:id', (0, validator_handler_1.default)(user_schema_1.updateUserSchema, 'body'), user_controller_1.updateUser);
router.delete('/:id', user_controller_1.deleteUser);
exports.default = router;
