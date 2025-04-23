const coursesModel = require("../models/coursesModel");
const bookingsModel = require("../models/bookingsModel");

exports.showDashboard = (req, res) => {
  coursesModel.getAllCourses((err, courses) => {
    if (err) return res.status(500).send("Error loading courses");
    res.render("organiser/dashboard", { courses });
  });
};

exports.addCourse = (req, res) => {
  const { name, duration, price, location, description } = req.body;
  coursesModel.createCourse(
    { name, duration, price, location, description },
    (err) => {
      if (err) console.error(err);
      res.redirect("/organiser/dashboard");
    },
  );
};

exports.deleteCourse = (req, res) => {
  const { courseId } = req.body;
  coursesModel.deleteCourse(courseId, (err) => {
    if (err) console.error(err);
    res.redirect("/organiser/dashboard");
  });
};

exports.showEditForm = (req, res) => {
  const courseId = req.params.id;
  coursesModel.getCourseById(courseId, (err, course) => {
    if (err || !course) return res.status(404).send("Course not found");
    res.render("organiser/editCourse", { course });
  });
};

exports.updateCourse = (req, res) => {
  const courseId = req.params.id;
  const updatedData = {
    name: req.body.name,
    duration: req.body.duration,
    price: req.body.price,
    location: req.body.location,
    description: req.body.description,
  };
  coursesModel.updateCourse(courseId, updatedData, (err) => {
    if (err) console.error(err);
    res.redirect("/organiser/dashboard");
  });
};

exports.showClassList = (req, res) => {
  const courseId = req.params.id;
  bookingsModel.getBookingsByCourse(courseId, (err, participants) => {
    if (err) return res.status(500).send("Error loading participants");
    res.render("organiser/classList", { participants });
  });
};
