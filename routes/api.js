const uploadSingleImage = require("../middleware/upload");
const userController = require("../controllers/userController");

router.post(
  "/users/:id/upload",
  uploadSingleImage("photo"), // nama field di postman
  userController.uploadPhoto
);