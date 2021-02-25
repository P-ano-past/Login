const db = require("../models/");

module.exports = {
  findAll: function (req, res) {
    db.User.find({})
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  findByUser: function (req, res) {
    // console.log("req.params", req.params);
    // console.log("req.params.id", req.params.id);
    db.User.find({ username: req.params.id })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
