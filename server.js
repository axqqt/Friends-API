const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const path = require("path");
const fs = require("fs"); 


app.use(express.json());
if (!fs.existsSync(path.join(__dirname, "public"))) {
  fs.mkdirSync(path.join(__dirname, "public"));
}
app.use(express.static(path.join(__dirname, "public")));

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
