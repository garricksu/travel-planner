import path from "path";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const dataSource = new DataSource({
  type: 'postgres',
  database: 'travel',
  username: 'garricksu',
  password: '9628FatalGDS',
  logging: true,
  entities: [User],
  migrations: [path.join(__dirname, './migrations/*')],
  synchronize: true,
})