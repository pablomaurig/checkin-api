"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "pablo",
    password: "admin123",
    database: "hotel",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});
