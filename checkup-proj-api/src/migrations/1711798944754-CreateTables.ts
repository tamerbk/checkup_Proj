import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1711798944754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "members" (
            "member_id" SERIAL PRIMARY KEY,
            "member_first_name" varchar NOT NULL,
            "member_last_name" varchar NOT NULL,
            "member_card_id" numeric,
            "phone_number" int 
        );
    `);

  
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
