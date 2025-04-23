require("dotenv").config();
const express = require("express");
const path = require("path");

// Importing required packages
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const originalRender = app.response.render;
app.response.render = function (view, locals, callback) {
  console.log(">>> res.render called with:", view);
  return originalRender.call(this, view, locals, callback);
};
const PORT = process.env.PORT || 3000;

// Serve static imges from public folder
app.use(express.static(path.join(__dirname, "public")));

// Set up Mustache
app.engine("mustache", mustacheExpress());
// Tell Express to use Mustache to render
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// Session config
app.use(
  session({
    secret: "dance-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// Flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  next();
});

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

const authRoutes = require("./routes/authenticated");
app.use("/", authRoutes);

const bookingRoutes = require("./routes/booking");
app.use("/", bookingRoutes);

const coursesRoutes = require("./routes/courses");
app.use("/courses", coursesRoutes);

const organiserRoutes = require("./routes/organiser");
app.use("/organiser", organiserRoutes);

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

// Starts the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
