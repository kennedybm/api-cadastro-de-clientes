import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1663857070598 implements MigrationInterface {
    name = 'firstMigration1663857070598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Contacts" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "mobileNumber" character varying(11) NOT NULL, "clientId" uuid, CONSTRAINT "UQ_e21d198c32f66a0e53bf7c46def" UNIQUE ("email"), CONSTRAINT "UQ_f57f317a3c76113c92c0bbfa28c" UNIQUE ("mobileNumber"), CONSTRAINT "PK_68782cec65c8eef577c62958273" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Clients" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "mobileNumber" character varying(11) NOT NULL, "registerDate" date NOT NULL, CONSTRAINT "UQ_38fd02fc8a88ed82f0c1e6eee4e" UNIQUE ("email"), CONSTRAINT "UQ_1465de5c3770ade0d19e9d87b13" UNIQUE ("mobileNumber"), CONSTRAINT "PK_8dadaa0dc6305d95e1d1a6b9544" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_60bce1c0ade7ca5dfcfee8c4f78" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_60bce1c0ade7ca5dfcfee8c4f78"`);
        await queryRunner.query(`DROP TABLE "Clients"`);
        await queryRunner.query(`DROP TABLE "Contacts"`);
    }

}
