/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("platform.chapter", function (table) {
    table.increments("id").notNullable();
    table.string("title", 255).notNullable();
    table.string("text", 255);
    table.timestamps("created_at");
    table.integer("created_by");
    table.boolean("is_deleted").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("platform.chapter");
};
