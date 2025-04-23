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
    {
      courseId,
      name,
      email,
      dateBooked: new Date()
    },
    (err, doc) => {
      if (err) {
        console.error("Error creating booking:", err);
        return res.status(500).send("Booking failed");
      }
      res.send("TEST!!! REFACTOR LATER booking confirmation thank you for enrolling!"); 
    }
  );
});

module.exports = router;
