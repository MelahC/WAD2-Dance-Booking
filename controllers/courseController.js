const coursesModel = require("../models/coursesModel");

exports.listAll = (req, res) => {
  coursesModel.getAllCourses((err, courses) => {
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).send("Error loading courses");
    }
   
    courses.forEach((course) => {
      if (course.sessions && course.sessions.length > 0) {
        course.sessions.sort((a, b) => new Date(a.date) - new Date(b.date));
        course.startDate = course.sessions[0].date;
        course.endDate = course.sessions[course.sessions.length - 1].date;
        course.numSessions = course.sessions.length;
      } else {
        course.startDate = null;
        course.endDate = null;
        course.numSessions = 0;
      }
    });

    res.render("courses", { courses });
  });
};
