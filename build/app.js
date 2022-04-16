"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const WHITE_LIST = ['http://localhost:8080', 'https://app.com'];
// const options = {
//   origin: (origin, callback) => {
//     if (WHITE_LIST.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Cross origin not allowed'));
//     }
//   }
// };
// app.use(cors(options));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
(0, routes_1.default)(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
exports.default = app;
