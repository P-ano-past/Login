const router = require("express").Router();
const {
  findAll,
  createUser,
  createPost,
  remove,
  update,
  findById,
  login,
  newTextPost,
} = require("../../controllers/userController");

router.route("/").get(findAll).post(createUser);
router.route("/:id").delete(remove).put(update).get(findById);
router.route("/post/:id").post(createPost).get(newTextPost);
router.route("/login").post(login);

module.exports = router;
