const router = require("express").Router();
const {
  findAll,
  createUser,
  createPost,
  remove,
  update,
  updateProfile,
  findById,
  login,
} = require("../../controllers/userController");

router.route("/").get(findAll).post(createUser);
router.route("/:id").delete(remove).put(update).get(findById);
router.route("/post/:id").post(createPost);
router.route("/profileUpdate/:id").post(updateProfile);
router.route("/login").post(login);

module.exports = router;
