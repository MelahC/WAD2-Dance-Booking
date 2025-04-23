const { bookingsDB } = require("../data/db");

function createBooking(bookingData, callback) {
  bookingsDB.insert(bookingData, callback);
}

function getBookingsByCourse(courseId, callback) {
  bookingsDB.find({ courseId }, callback);
}

module.exports = {
  createBooking,
  getBookingsByCourse,
};