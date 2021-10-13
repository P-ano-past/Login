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
  auth0Login,
} = require("../../controllers/userController");

router.route("/").get(findAll).post(createUser);
router.route("/:id").delete(remove).put(update).get(findById);
router.route("/post/:id").post(createPost);
router.route("/profileUpdate/:id").post(updateProfile);
router.route("/login").post(login);
router.route("/auth0login").post(auth0Login);

module.exports = router;
