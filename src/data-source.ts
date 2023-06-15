// https://typeorm.io/#quick-start
import { DataSource } from 'typeorm';

import { User } from './app/entities/user';

export const AppDataSource: DataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
