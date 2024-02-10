if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  const express = require("express");
  const cors = require("cors");
  const db = require("./models");
  const app = express();
  const dbConfig = require("./config/db.config");
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  
  require("./routes/auth.route")(app);
  
  db.mongoose
    .connect(`mongodb+srv://${dbConfig.DB_USER}:${dbConfig.DB_PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}`)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
  