import {MigrationInterface, Table,QueryRunner} from "typeorm";

export class Category1606874874491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
       await queryRunner.createTable(new Table({
            name:"categories",
            columns:[
                {
                    name:"id",
                    type:"uuid",
                    isPrimary:true,
                    generationStrategy:'uuid',
                    default:"uuid_generate_v4()"
                },
                {
                    name:"title",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"created_at",
                    type:"timestamp",
                    isNullable:false,
                    default:"now()"
                },
                {
                    name:"updated_at",
                    type:"timestamp",
                    isNullable:false,
                    default:"now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories')
    }

}
