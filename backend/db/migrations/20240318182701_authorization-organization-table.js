/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("auth.organizaton", function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.boolean("is_deleted").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("auth.organizaton");
};
