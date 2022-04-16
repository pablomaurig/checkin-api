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
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../services/user.service"));
// const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');
const router = express_1.default.Router();
const service = new user_service_1.default;
router.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield service.getUsers();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}));
// router.get('/:id',
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const user = await service.getUserById(id);
//       res.json(user);
//     } catch (error) {
//       next(error);
//     }
//   });
// router.post('/', 
//   createUserSchema,
//   async (req, res) => {
//     try {
//       // @ts-expect-error
//       const { id } = req.params;
//       const user = await service.getUserById(id);
//       res.json({message: 'todo piola'});
//     } catch (error:any) {
//       res.status(404).json({
//         message: error.message
//       });
//     }
// });
// router.patch('/', 
//   updateUserSchema,
//   async (req, res) => {
//     try {
//       // @ts-expect-error
//       const { id } = req.params;
//       const user = await service.getUserById(id);
//       res.json(user);
//     } catch (error: any) {
//       res.status(404).json({
//         message: error.message
//       });
//     }
// });
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await service.getUserById(id);
//     res.json(user);
//   } catch (error: any) {
//     res.status(404).json({
//       message: error.message
//     });
//   }
// });
exports.default = router;
