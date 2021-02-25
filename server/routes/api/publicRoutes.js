const router = require("express").Router();
const { findAll, findByUser } = require("../../controllers/publicController");

router.route("/").get(findAll);
router.route("/:id").get(findByUser);

module.exports = router;
