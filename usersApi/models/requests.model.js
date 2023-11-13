import db from "../config/db.js";
import { _getUserByUsername } from "../models/users.model.js";

// create table Users (
// 	id serial primary key,
// 	username varchar(50) unique not null,
// 	pswd varchar(50) not null,
// 	email varchar(255) unique not null,
// 	firstname varchar(50),
// 	lastname varchar(50)
// );

// ***********************************************************
// !!!!! => FORGOT TO ADD THE ADRESS, TO UPADTE LATER <= !!!!!
// ***********************************************************
// create table Requests (
// 	id serial primary key,
// 	title varchar(50) not null,
// 	description text,
// 	begindate date not null,
// 	enddate date,
// 	userowner_id integer,
// 	foreign key (userowner_id) references Users(id) on delete cascade
// );

// create table Voluteers_Requests (
// 	user_id integer not null,
// 	request_id integer not null,
// 	primary key (user_id, request_id),
// 	foreign key (user_id) references Users(id) on delete cascade,
// 	foreign key (request_id) references Requests(id) on delete cascade
// );

const _getRequests = () => {
  return db("requests").select(
    "id",
    "title",
    "description",
    "begindate",
    "enddate",
    "userowner_id"
  );
};

const _getRequestById = (id) => {
  return db("requests")
    .select(
      "id",
      "title",
      "description",
      "begindate",
      "enddate",
      "userowner_id"
    )
    .where({ id });
};

const _addRequest = async (
  title,
  description,
  begindate,
  enddate,
  username
) => {
  const trx = await db.transaction();
  const user = await _getUserByUsername(username);
  const userowner_id = user[0].id;
  try {
    await db("requests")
      .insert({ title, description, begindate, enddate, userowner_id }, [
        "title",
        "description",
        "begindate",
        "enddate",
        "userowner_id",
      ])
      .transacting(trx);
    await trx.commit();
  } catch (err) {
    console.log(err);
    await trx.rollback();
  }
};

const _addVoluteerRequests = async (user_id, request_id) => {
  const trx = await db.transaction();
  try {
    await db("Voluteers_Requests")
      .insert({ user_id, request_id }, ["user_id", "request_id"])
      .transacting(trx);
    await trx.commit();
  } catch (err) {
    console.log(err);
    await trx.rollback();
  }
};

export { _getRequests, _getRequestById, _addRequest, _addVoluteerRequests };
