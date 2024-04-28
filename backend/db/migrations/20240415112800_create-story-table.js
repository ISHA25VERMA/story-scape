/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  const q = knex.schema.createTable("platform.story", function (table) {
    table.increments("id");
    table.string("title", 255).notNullable();
    table.string("cover_image_url", 255);
    table.timestamps("created_at");
    table.integer("created_by");
    table.boolean("is_deleted").defaultTo(false);
    table.string("genre", 255);
    table.string("state", 255);
  });
  return q;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("platform.story");
};
