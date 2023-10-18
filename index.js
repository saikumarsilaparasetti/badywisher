const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const logger = require("./logger");

const app = express();
const cron = require("node-cron");
const { wishController } = require("./controllers");

// ss mm hh dd mm yy
cron.schedule("00 58 19 * * *", () => {
  logger.info("cron check--");
  wishController.checkAndWish();
});

const port = process.env.PORT || 3000;
const route = require("./routes");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
