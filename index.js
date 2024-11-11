const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "anjalithombre";
const { UserModel, todoModel } = require("./db");

async function ConnectDb() {
  console.log("Connecting...");
  try {
    await mongoose.connect(
      "mongodb+srv://Anjali2312:2vtO3XhNSRrJM1FW@cluster0.rc7j8.mongodb.net/anjali-todo",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

ConnectDb();

const app = express();
app.use(express.json());
app.post("/signUp", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  //add it to db
  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({ msg: "You have signedUp successfully" });
});

app.post("/signIn", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  //search user in db
  const founduser = await UserModel.findOne({
    email: email,
    password: password,
  });

  if (founduser) {
    const token = jwt.sign({ id: founduser._id }, JWT_SECRET);
    res.json({ token: token });
  } else {
    res.status(404).json({ msg: "You have to signed Up first!!!" });
  }
});

function authMiddleware(req, res, next) {
  const token = req.headers.token;
  const verified = jwt.verify(token, JWT_SECRET);
  const username = verified.username;
  if (username) {
    req.username = username;
    next();
  } else {
    res.status(400).json({ msg: "Sorry you have not signed In" });
  }
}

app.post("/addTodo", authMiddleware, function (req, res) {
  const desc = req.body.desc;
  const done = req.body.done;
  const userId = req.body.userID;
  //find userID
  //append todos in his todos list
  res.json({ msg: "Your todo is added" });
});

app.get("/getTodo", authMiddleware, function (req, res) {
  //fetch data from database using token
  //1.find the user
  //2.find todos list of corresponding users

  res.json({
    //send all todos from db
  });
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});