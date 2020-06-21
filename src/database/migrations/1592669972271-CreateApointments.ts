import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateApointments1592669972271
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}

/**
 * Migrations funcionam como uma linha do tempo da base da aplicação,
 * mantendo a base versiondada.
 *
 * O função do metodo down é desfazer o que o que foi executado no metodo up
 *
 * Você só pode alterar uma migration se ela ainda não foi compartilhada, ex:
 * GIT.
 * Se não, será necessario criar uma nova migration com a alteração
 */
