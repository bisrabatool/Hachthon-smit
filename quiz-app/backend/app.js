const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./userDetails");
const app = express();

app.use(cors());
app.use(express.json());

const mongoUrl = "mongodb://localhost:27017";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error connecting to database:", error));

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ status: "error", message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.send({ status: "ok", message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ status: "error", message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
