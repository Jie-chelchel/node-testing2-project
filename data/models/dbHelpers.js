const db = require("../db-config.js");

const add = async (lesson) => {
  const [id] = await db("lessons").insert(lesson);
  return findById(id);
};

const find = async () => {
  const lessons = await db("lessons");
  return lessons;
};

const findById = async (id) => {
  const selectedLesson = await db("lessons").where({ id }).first();
  return selectedLesson;
};

const update = async (id, updatedLesson) => {
  await db("lessons").where({ id }).update(updatedLesson, [id]);

  return findById(id);
};

const remove = async (id) => {
  const deletedLesson = await findById(id);
  await db("lessons").where({ id }).del();
  return deletedLesson;
};
module.exports = { add, remove, find, findById, update };
