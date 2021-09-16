exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("lessons")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("lessons").insert([
        { name: "python" },
        { name: "node" },
        { name: "javascript" },
      ]);
    });
};
