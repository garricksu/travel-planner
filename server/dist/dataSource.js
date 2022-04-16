"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    database: 'travel',
    username: 'garricksu',
    password: '9628FatalGDS',
    logging: true,
    entities: [User_1.User],
    migrations: [path_1.default.join(__dirname, './migrations/*')],
    synchronize: true,
});
//# sourceMappingURL=dataSource.js.map