import {
  _getRequests,
  _getRequestById,
  _addRequest,
  _addVoluteerRequests,
} from "../models/requests.model.js";

const getRequests = async () => {
  try {
    const data = await _getRequests();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await _getRequestById(id);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "No request found" });
  }
};

const createRequest = async (req, res) => {
  const { title, description, begindate, enddate, username } = req.body;
  try {
    await _addRequest(title, description, begindate, enddate, username);
    res.status(200).json({ msg: "Added successfuly" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Cannot register" });
  }
};

const registerRequest = async (req, res) => {
  const { user_id, request_id } = req.body;
  try {
    await _addVoluteerRequests(user_id, request_id)
    res.status(200).json({msg: "Register successfuly"})
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Cannot register" });
  }
};

export { getRequests, getRequestById, createRequest, registerRequest };
