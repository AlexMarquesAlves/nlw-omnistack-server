import { Knex } from "knex";

const tableName = "point_items";

export async function up(knex: Knex) {
  // CRIA A TABELA
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.integer("point_id").notNullable().references("id").inTable("points");
    table.integer("item_id").notNullable().references("id").inTable("items");
  });
}

export async function down(knex: Knex) {
  // VOLTA ATRÁS (DELETA A TABELA)
  return knex.schema.dropTable(tableName);
}
