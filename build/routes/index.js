"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_router_1 = __importDefault(require("./booking.router"));
const user_router_1 = __importDefault(require("./user.router"));
const routerApi = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    router.use('/bookings', booking_router_1.default);
    router.use('/users', user_router_1.default);
};
exports.default = routerApi;
