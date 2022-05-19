import { User, connect, IUserModel } from "./db";
require("dotenv").config();
import cors = require("cors");
import path = require("path");
import express = require("express");

const jsonParser = express.json();
const app = express();
app.use(cors());
connect();
const corsReq = cors();
// GET - request----------------------------------------------
//get users list
app.get("/api/users", corsReq, (req, res) => {
  try {
    const getAllUser = async () => {
      const allUsers = await User.findAll();
      res.send(allUsers);
    };
    getAllUser();
  } catch (err) {
    res.status(400).send(err);
  }
});

// POST - request---------------------------------------------

//login
app.post("/api/users/login", corsReq, jsonParser, (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }
  const user = req.body;
  const getUser = async () => {
    const userLog = await User.findAll({
      where: {
        name: user.name,
        password: user.password,
        status: true,
      },
    });
    userLog.forEach((el: IUserModel) => (el.dateLogin = new Date()));
    userLog.forEach((el) => el.save());
    userLog.length !== 0 ? res.send(userLog) : res.status(404).send();
  };
  getUser();
});

//Add user
app.post("/api/users", corsReq, jsonParser, (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }
  const user = req.body;
  const setUser = async () => {
    user.dateReg = new Date();
    const allUsers = await User.findAll();
    if (allUsers.find((el: IUserModel) => el.name === user.name)) {
      return res.status(409).send("Пользователь уже существует");
    } else {
      await User.create(user);
      console.log("Пользователь успешно создан!");
      res.send(allUsers);
    }
  };
  setUser();
});

//Remove user
app.post("/api/users/delete", corsReq, jsonParser, (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }
  const users = req.body; //body - array
  const setUser = async () => {
    await User.destroy({
      where: {
        id: users.map((el: IUserModel) => el.id),
      },
    });
    console.log("Users removed!");
    const allUsers = await User.findAll();
    res.send(allUsers);
  };
  setUser();
  // res.send('Users removed!');
});

//Ban user
app.put("/api/users/ban", corsReq, jsonParser, (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }
  const users = req.body;
  try {
    const banUser = async () => {
      await User.update(
        { status: false },
        {
          where: {
            id: users.map((el: IUserModel) => el.id),
          },
        }
      );
      const allUsers = await User.findAll();
      res.send(allUsers);
    };
    banUser();
  } catch (err) {
    res.status(400).send(err);
  }
});

//Unblock user
app.put("/api/users/unblock", corsReq, jsonParser, (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }
  const users = req.body;
  const banUser = async () => {
    await User.update(
      { status: true },
      {
        where: {
          id: users.map((el: IUserModel) => el.id),
        },
      }
    );
    const allUsers = await User.findAll();
    res.send(allUsers);
  };
  banUser();
});

const port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "./build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
