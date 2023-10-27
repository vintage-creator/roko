require("dotenv").config();
const path = require("path");
const {userDB, paymentDB, claimsDB, policyDB} = require("./config/databases/rokoDatabase");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const authRoute = require("./routes/auth_service/auth");
const subscribeRoute = require("./routes/payment_service/subPlan");
const contactRoute = require("./routes/contact_service/contact");
const userClaimRoute = require("./routes/claim_service/user");
const adminClaimRoute = require("./routes/claim_service/admin");
const userPolicyRoute = require("./routes/policy_service/user");
const adminPolicyRoute = require("./routes/policy_service/admin");
const userProfileRoute = require("./routes/profile_service/user");
const adminProfileRoute = require("./routes/profile_service/admin");
const whRoute = require("./routes/payment_service/wh");
const authenticateUser = require("./middlewares/authenticateUser");
const app = express();
const cors = require("cors");
const rateLimiter = require("./middlewares/rateLimit");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const multer = require('multer');
const upload = multer();


// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.Secret_ID,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 8 * 60 * 60 * 1000, // 24 hours in milliseconds
      secure: false, // Set to true if your app is running over HTTPS
    },
  })
);
app.use(flash());
// Use upload middleware to parse form data
app.use(upload.none()); // This will handle form-data parsing
// app.use(rateLimiter);
app.use("/auth", authRoute);
app.use("/user", userPolicyRoute);
app.use("/admin", adminPolicyRoute);
app.use("/user", userClaimRoute);
app.use("/admin", adminClaimRoute);
app.use("/user", userProfileRoute);
app.use("/admin", adminProfileRoute);
app.use("/subscribe", subscribeRoute);
app.use("/wh", whRoute);
app.use("/contact", contactRoute);
app.use('/roko', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8000;

app.get('/api-docs', (req, res) => {
  res.send(swaggerSpec);
});

app.get("/home(.html)?", authenticateUser(["user", "admin"]), (req, res) => {
  res.render("index", { flashMessages: req.flash() });
});

app.get("/", (req, res) => {
  res.render("signin", { flashMessages: req.flash() });
});

app.get("/signup", (req, res) => {
  res.render("signup", { flashMessages: req.flash() });
});

// Catch-all handler should be the last route
app.all("*", (req, res) => {
  res.render("404");
});

// Define an async function to connect to the databases
async function connectToDatabases() {
  const chalk = (await import("chalk")).default;
  try {
    await Promise.all([
      userDB, 
      paymentDB,
      claimsDB,
      policyDB 
    ]);
    console.log(chalk.bgBlack("Roko:: Databases connected successfully"));

    // Start the server only after both databases are connected
    app.listen(port, () => {
      console.log(chalk.yellow(`Server is running on http://localhost:${port}`));
    });
  } catch (error) {
    console.error(chalk.bgRed("Error connecting to databases:", error));
  }
}

// Call the function to connect to the databases
connectToDatabases();

    
