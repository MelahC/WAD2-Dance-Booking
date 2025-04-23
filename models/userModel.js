const { usersDB } = require("../data/db");
const bcrypt = require("bcrypt");

function createUser({ email, password, role }, callback) {
  bcrypt.hash(password, 10, (err, hashed) => {
    if (err) return callback(err);

    const userDoc = {
      email,
      password: hashed,
      role: role || "organiser",
    };
    usersDB.insert(userDoc, callback);
  });
}

function findUserByEmail(email, callback) {
  usersDB.findOne({ email }, callback);
}

module.exports = {
  createUser,
  findUserByEmail,
};
