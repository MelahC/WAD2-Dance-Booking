const bcrypt = require("bcrypt");
const { usersDB } = require("../data/db");

exports.showDashboard = (req, res) => {
  usersDB.find({}, (err, users) => {
    if (err) {
      console.error("Error loading users:", err);
      return res.status(500).send("Error loading users");
    }
    res.render("adminDashboard", { users });
  });
};

exports.addOrganiser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "organiser",
    };
    usersDB.insert(newUser, (err) => {
      if (err) {
        console.error("Error inserting organiser:", err);
      }

      res.redirect("/admin");
    });
  } catch (error) {
    console.error("Error in addOrganiser:", error);
    res.redirect("/admin");
  }
};

exports.deleteUser = (req, res) => {
  const { userId } = req.body;
  usersDB.remove({ _id: userId }, {}, (err) => {
    if (err) {
      console.error("Error deleting user:", err);
    }
    res.redirect("/admin");
  });
};
