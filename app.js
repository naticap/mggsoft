'use strict';

const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const auth = require("./middlewares/auth.js");
const AccessControl = require('accesscontrol');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Test API" });
});

require("./routes/auth.js")(app);
app.use(auth);
require("./routes/user.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});