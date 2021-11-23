require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const app = express();

const { connect } = require("./config/mongodb");
const MainController = require("./controllers/MainController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/sum", MainController);
app.get("/count", MainController);

connect().then(() => {
  app.listen(port, (_) => {
    console.log("This mongo server running on port:", port);
  });
});
