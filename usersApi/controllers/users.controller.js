import {
  _getUsers,
  _getUserById,
  _getUserByUsername,
  _addUser,
  _updateUser,
  _getPwd,
} from "../models/users.model.js";
import bcrypt from "bcrypt";

let usersLogged = new Set();

const getUsers = async (req, res) => {
  try {
    const data = await _getUsers();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "No Users" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await _getUserById(id);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "No User" });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const data = await _getUserByUsername(username);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "No User" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, first_name, last_name, email } = req.body;
  try {
    await _updateUser(id, username, first_name, last_name, email);
    res.status(200).json({ msg: "Updated successfuly" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Can not update a post" });
  }
};

const registerUser = async (req, res) => {
  const { username, firstname, lastname, email, pwd } = req.body;
  try {
    const saltRounds = 10;
    const users = await _getPwd(username);
    if (users.find((item) => item == username) === undefined) {
      bcrypt.hash(pwd, saltRounds, async (err, hash) => {
        await _addUser(username, firstname, lastname, email, hash);
      });
      res.status(200).json({ msg: "Register successfuly" });
    } else {
      res.status(401).json({ msg: "User already exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Cannot register" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const saltRounds = 10;

    bcrypt.hash(password.toString(), saltRounds, async (err, hash) => {
      const pwdRetrieved = await _getPwd(username);

      const match = await bcrypt.compare(password, pwdRetrieved[0]["pwd"]);
      if (match) {
        usersLogged.add(username);
        res.status(200).json({ msg: "Logged" });
        console.log(usersLogged);
      } else {
        res.status(401).json({ msg: "Incorrect password" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Cannot login" });
  }
};

const authUser = async (req, res) => {
  const { username } = req.params;
  try {
    if (usersLogged.has(username)) {
      res.status(200).json({ msg: "Authenticated" });
    } else {
      res.status(401).json({ msg: "Not authenticated" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Cannot authenticate" });
  }
};

export {
  getUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  loginUser,
  registerUser,
  authUser,
};
