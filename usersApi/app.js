import express from "express";
import dotenv from "dotenv";
import user_router from "./routes/users.routes.js";
import requests_router from "./routes/requests.routes.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

app.use("/users", user_router);
app.use("/requests", requests_router);
