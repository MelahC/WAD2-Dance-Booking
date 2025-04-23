const db = require("../data/db");

// Cteate a function to get all courses
function getAllCourses(callback) {
  db.coursesDB.find({}, (err, docs) => {
    if (err) return callback(err);
    callback(null, docs);
  });
}

// Return a single course by id
function getCourseById(id, callback) {
  db.coursesDB.findOne({ _id: id }, (err, doc) => {
    if (err) return callback(err);
    callback(null, doc);
  });
}

// Create a new course
function createCourse(courseData, callback) {
  db.coursesDB.insert(courseData, (err, newDoc) => {
    if (err) return callback(err);
    callback(null, newDoc);
  });
}

// Delete a course by id
function deleteCourse(courseId, callback) {
  db.coursesDB.remove({ _id: courseId }, {}, (err, numRemoved) => {
    if (err) return callback(err);
    callback(null, numRemoved);
  });
}

// Update a course
function updateCourse(courseId, updatedData, callback) {
  db.coursesDB.update(
    { _id: courseId },
    { $set: updatedData },
    {},
    (err, numReplaced) => {
      if (err) return callback(err);
      callback(null, numReplaced);
    },
  );
}

// Exports the functions
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
};
