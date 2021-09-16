exports.up = function (knex) {
  return knex.schema.createTable("lessons", (tbl) => {
    tbl.increments(); //id filed
    tbl.text("name", 128).notNullable();
  });
};

//undo any changes
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("lessons");
};
