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
require("reflect-metadata");
require("module-alias/register");
require("source-map-support/register");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
const config_1 = require("./config/config");
const port = config_1.config.port;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.AppDataSource.initialize();
        app_1.default.listen(port, () => {
            console.log('Server is running on port: ', port);
        });
    });
}
main();
