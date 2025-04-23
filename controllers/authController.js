const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.loginPage = (req, res) => {
  res.render("user/login");
};

exports.userLogin = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, (err, user) => {
    if (err || !user) {
      return res.render("user/login", { error: "Invalid email" });
    }

    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) {
        return res.render("user/login", { error: "Invalid password" });
      }

      req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };

      if (user.role === "admin") {
        res.redirect("/admin");
      } else if (user.role === "organiser") {
        res.redirect("/organiser/dashboard");
      } else {
        res.redirect("/");
      }
    });
  });
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

// Middleware: Only allow user with role "organiser"
exports.ensureOrganiser = (req, res, next) => {
  if (req.session.user && req.session.user.role === "organiser") {
    return next();
  }
  // If not, redirect to login
  res.redirect("/login");
};

// Middleware: Only allow user with role "admin"
exports.ensureAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  // If not, redirect to login
  res.redirect("/login");
};
