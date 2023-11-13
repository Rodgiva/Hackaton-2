import db from "../config/db.js";

// create table Users (
// 	id serial primary key,
// 	username varchar(50) unique not null,
// 	email varchar(255) unique not null,
// 	firstname varchar(50),
// 	lastname varchar(50),
// 	pwd varchar(100) not null
// );

const _getUsers = () => {
  return db("users").select(
    "id",
    "username",
    "email",
    "firstname",
    "lastname"
  );
};

const _getUserById = (id) => {
  return db("users")
    .select("id", "username", "email", "firstname", "lastname")
    .where({ id });
};

const _getUserByUsername = (username) => {
  return db("users")
    .select("id", "username", "email", "firstname", "lastname")
    .where({ username });
};

const _addUser = async (username, email, firstname, lastname, pwd) => {
  const trx = await db.transaction();
  try {
    await db("users")
      .insert(
        { username, email, firstname, lastname, pwd },
        ["username", "email", "firstname", "lastname", "pwd" ]
      )
      .transacting(trx);
    await trx.commit();
  } catch (err) {
    console.log(err);
    await trx.rollback();
  }
};

const _updateUser = async (id, username, email, firstname, lastname ) => {
  const trx = await db.transaction();
  try {
    await db("users")
      .update(
        { username, email, firstname, lastname },
        ["id", "username", "email", "firstname", "lastname"].where({ id })
      )
      .transacting(trx);
    await trx.commit();
  } catch (err) {
    console.log(err);
    await trx.rollback();
  }
};

const _getPwd = (username) => {
  return db("users").select("pwd").where({ username });
};

export { _getUsers, _getUserById, _getUserByUsername, _addUser, _updateUser, _getPwd };