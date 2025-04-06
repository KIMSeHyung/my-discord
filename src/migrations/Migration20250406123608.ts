import { Migration } from '@mikro-orm/migrations';

export class Migration20250406123608 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "discord";`);
    this.addSql(`create table "discord"."user" ("id" serial primary key, "name" varchar(255) not null);`);
  }

}
