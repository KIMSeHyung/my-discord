import { Options } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  driver: PostgreSqlDriver,
  clientUrl: process.env.DB_HOST,
  schema: 'discord',
  entities: ['dist/**/*.entity.*'],
  entitiesTs: ['src/**/*.entity.*'],
  highlighter: new SqlHighlighter(),
  extensions: [Migrator, SeedManager],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  logger: console.log,
};

export default config;
