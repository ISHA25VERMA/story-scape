/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable(
    "platform.map_story_chapter",
    function (table) {
      table.increments("id").notNullable();
      table.integer("fk_story_id").notNullable();
      table.integer("fk_chapter_id");
      table.timestamps("created_at");
      table.boolean("is_deleted").defaultTo(false);
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("platform.map_story_chapter");
};
