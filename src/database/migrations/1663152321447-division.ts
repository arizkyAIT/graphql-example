import { MigrationInterface, QueryRunner } from "typeorm";

export class division1663152321447 implements MigrationInterface {
    name = 'division1663152321447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "divisions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(5) DEFAULT '', "name" character varying(100) DEFAULT '', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "department_id" uuid, CONSTRAINT "PK_c1f864477b3fd0954564108ed96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "divisions" ADD CONSTRAINT "FK_27b9da91c6b2a08e91798eda7d2" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "divisions" DROP CONSTRAINT "FK_27b9da91c6b2a08e91798eda7d2"`);
        await queryRunner.query(`DROP TABLE "divisions"`);
    }

}
