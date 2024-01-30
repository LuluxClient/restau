import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1705325886420 implements MigrationInterface {
    name = 'Init1705325886420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` double NOT NULL, \`pic\` varchar(255) NOT NULL, \`category\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL, \`status\` int NOT NULL, \`total_price\` double NOT NULL, \`date_start\` int NOT NULL, \`date_end\` int NOT NULL, \`table_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`table\` (\`id\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`posX\` int NOT NULL, \`posY\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`table\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
