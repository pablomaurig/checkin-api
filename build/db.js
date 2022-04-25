"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'pablo',
    password: 'admin123',
    database: 'hotel',
    synchronize: true,
    logging: true,
    entities: [user_entity_1.User],
    subscribers: [],
    migrations: [],
});
