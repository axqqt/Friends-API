const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const path = require("path");


app.use(express.json());
app.use(cors());

app.use("/friends", require("./routes/friends"));

app.use("*", async (req, res) => {
  try {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ Alert: "This page results in a 404 error" });
    } else {
      res.type("txt").send("404 error detected");
    }
  } catch (error) {}
});

async function start() {
  try {
    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

start();
