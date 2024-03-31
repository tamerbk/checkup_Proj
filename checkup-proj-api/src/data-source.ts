import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ec2-13-37-108-197.eu-west-3.compute.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'patrona',
  database: 'checkup',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
});
