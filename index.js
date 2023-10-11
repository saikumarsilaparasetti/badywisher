const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");

const logger = require("./logger");

const app = express();

const port = process.env.PORT || 3000;
const route = require("./routes");
mongoose.connect("mongodb://localhost:27017/bdaywisher", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect(
//   "mongodb+srv://saikumar:saikumar21@cluster0.kxdfx.mongodb.net/SGAcc_db?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );
mongoose.connection.on("connected", () => {
  logger.info("Connected to database");
});
mongoose.connection.on("error", (error) => {
  logger.error("Error in connecting to database");
});
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(route);

app.listen(port, (result, error) => {
  if (error) logger.error(error);
  logger.info("App is runnig on Port: " + port);
});
