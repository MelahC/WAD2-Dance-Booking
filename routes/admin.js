const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { ensureAdmin } = require("../controllers/authController");

// For parsing form data
router.use(express.urlencoded({ extended: true }));

// GET /admin -> Show the admin dashboard
router.get("/", ensureAdmin, adminController.showDashboard);

// POST /admin/delete-user -> Delete a user
router.post("/delete-user", ensureAdmin, adminController.deleteUser);

// POST /admin/add-organiser -> Add a new organiser
router.post("/add-organiser", ensureAdmin, adminController.addOrganiser);

module.exports = router;
