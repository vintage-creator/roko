require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const rokoDb = require("./config/database");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const authRoute = require("./routes/auth");
const app = express();
const cors = require("cors");
const rateLimiter = require("./middlewares/rateLimit");

rokoDb();

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.Secret_ID,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      secure: false, // Set to true if your app is running over HTTPS
    },
  })
);
app.use(flash());
app.use(rateLimiter);
app.use("/auth", authRoute);
// app.use("/cleanup", cleanUpRoute);

const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8000;

app.get("/home(.html)?", (req, res) => {
  if (!req.session.verified) {
    return res.redirect("/signin");
  }
  res.render("index");
});

app.get("/", (req, res) => {
  res.render("signin", { flashMessages: req.flash() });
});

app.get("/signin", (req, res) => {
  res.render("signin", { flashMessages: req.flash() });
});

// Catch-all handler should be the last route
app.all("*", (req, res) => {
  res.render("404");
});

mongoose.connection.once("open", async () => {
  const chalk = (await import("chalk")).default; // Import chalk dynamically
  console.log(chalk.blue("Connected to Roko Database."));
  app.listen(port, (err) => {
    if (err) {
      throw new Error("Error connecting to the server");
    }
    console.log(chalk.bgRed(`Server is running on http://localhost:${port}`));
  });
});

mongoose.connection.on("error", async (err) => {
  const chalk = (await import("chalk")).default; // Import chalk dynamically
  console.error(chalk.red("Roko database connection error:", err));
  process.exit(1);
});
