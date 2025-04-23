const bcrypt = require("bcrypt");
const { usersDB } = require("../data/db");

async function seed() {
  const hashedPassword = await bcrypt.hash("secret123", 10);

  const user = {
    name: "Admin User",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  };

  // remove existing user with same email
  usersDB.remove({ email: user.email }, {}, (err) => {
    if (err) {
      console.error("Error removing user:", err);
    } else {
      // insert new
      usersDB.insert(user, (err, newDoc) => {
        if (err) {
          console.error("Insert failed:", err);
        } else {
          console.log("✅ Admin user seeded successfully:", newDoc.email);
        }
      });
    }
  });
}

seed();
