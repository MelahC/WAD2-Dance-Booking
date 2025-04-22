const Datastore = require("nedb");
const path = require("path");

// Create DB for course info
const coursesDB = new Datastore({
  filename: path.join(__dirname, "courses.db"),
  autoload: true,
});

// Create a DB for users: admin & organiser
const usersDB = new Datastore({
  filename: path.join(__dirname, "users.db"),
  autoload: true,
});

// Create a DB for storing booking information
const bookingsDB = new Datastore({
  filename: path.join(__dirname, "bookings.db"),
  autoload: true,
});

// Export initialised db instances
module.exports = {
  coursesDB,
  usersDB,
  bookingsDB,
};
