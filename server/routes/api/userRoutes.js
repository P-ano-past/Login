const router = require("express").Router();
const {
  findAll,
  createUser,
  createPost,
  remove,
  update,
  findById,
  login,
} = require("../../controllers/userController");

router.route("/").get(findAll).post(createUser);
router.route("/:id").delete(remove).put(update).get(findById);
router.route("/post").post(createPost);

router.route("/login").post(login);

module.exports = router;
