const express = require("express");
const router = express.Router();
const organiserController = require("../controllers/organiserController");
const { ensureOrganiser } = require("../controllers/authController");

router.use(express.urlencoded({ extended: true }));

router.get("/dashboard", ensureOrganiser, organiserController.showDashboard);

router.post("/add-course", ensureOrganiser, organiserController.addCourse);
router.post(
  "/delete-course",
  ensureOrganiser,
  organiserController.deleteCourse,
);

router.get(
  "/edit-course/:id",
  ensureOrganiser,
  organiserController.showEditForm,
);
router.post(
  "/edit-course/:id",
  ensureOrganiser,
  organiserController.updateCourse,
);

router.get(
  "/class-list/:id",
  ensureOrganiser,
  organiserController.showClassList,
);

module.exports = router;
