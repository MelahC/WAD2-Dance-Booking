const db = require("../data/db"); 

// Cteate a function to get all courses
function getAllCourses(callback) {
  db.coursesDB.find({}, (err, docs) => {
    if (err) return callback(err);
    callback(null, docs);
  });
}

// Exports the functions
module.exports = {
  getAllCourses,
};