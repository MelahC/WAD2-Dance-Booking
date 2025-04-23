const express = require("express");
const router = express.Router();
const coursesModel = require("../models/coursesModel");
const bookingsModel = require("../models/bookingsModel");

router.use(express.urlencoded({ extended: true }));

router.get("/courses/:id/book", (req, res) => {
  const courseId = req.params.id;
  coursesModel.getCourseById(courseId, (err, course) => {
    if (err || !course) {
      console.error("Error fetching course for booking:", err);
      return res.status(404).send("Course not found");
    }

    res.render("bookingForm", { course });
  });
});

router.post("/courses/:id/book", (req, res) => {
  const courseId = req.params.id;
  const { name, email } = req.body;

  bookingsModel.createBooking(
    { courseId, name, email, dateBooked: new Date() },
    (err, doc) => {
      if (err) {
        console.error("Error creating booking:", err);
        return res.status(500).send("Booking failed");
      }

      coursesModel.getCourseById(courseId, (error, course) => {
        if (error || !course) {
          console.error("Couldn't fetch course for confirmation page");
          return res.render("confirmation", {
            message: "Booking created, but course details missing!",
          });
        }

        res.render("confirmation", {
          message: "Your booking is confirmed!",
          courseName: course.name,
          email,
        });
      });
    },
  );
});

module.exports = router;
