const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const mongoose = require("mongoose");
const routes = require("./routes");
const https = require("https");
const constants = require("./utils/constants");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

// Connect to MongoDB
const connection_string = process.env.DB_CONNECTION_STRING;
mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database...");
  })
  .then(() => {
    let serverConfig = process.env.DEV_ENV;
    let httpsServer;

    //spin up the https server in case of not local env
    if (serverConfig != constants.LOCAL_DEV_ENV) {
      httpsServer = https.createServer(app);
    }
    //start the respective server
    if (serverConfig === constants.LOCAL_DEV_ENV) {
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    } else if (
      serverConfig === constants.STAGING_DEV_ENV ||
      serverConfig === constants.PROD_DEV_ENV
    ) {
      httpsServer.listen(process.env.PORT, () => {
        console.log(`HTTPS Server running on port ${process.env.PORT}`);
      });
    } else {
      console.log("please check your .env file for the specification");
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("Could not connect to Database...");
    console.error(err);
    process.exit(1);
  });
