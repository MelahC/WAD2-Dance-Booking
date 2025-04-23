const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.use(express.urlencoded({ extended: true }));

router.get("/login", authController.loginPage);
router.post("/login", authController.userLogin);
router.get("/logout", authController.logoutUser);

module.exports = router;
