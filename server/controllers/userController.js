const db = require("../models/");

module.exports = {
  findAll: function (req, res) {
    db.User.find({})
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
    console.log("findbyID triggered");
  },
  createUser: function ({ body }, res) {
    const bcrypt = require("bcryptjs");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(body.userPassword, salt, function (err, hash) {
        body.userPassword = hash;
        db.User.create(body)
          .then(console.log(body), (dbModel) => res.json(dbModel))
          .catch((err) => res.status(422).json(err));

        //body.userPassword now posts encrypted password into mongo.
      });
    });
    // .then(res.status(200))
    // .catch(res.status(500));
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  login: function (req, res) {
    db.User.findOne({
      username: req.body.data.username,
      // userPassword: req.body.data.userPassword,
    })
      .then((dbModel) => {
        const bcrypt = require("bcryptjs");
        const hash = dbModel.userPassword;

        console.log("hash:", hash);
        bcrypt.compare(
          req.body.data.userPassword,
          hash,
          function (err, isMatch) {
            if (err) {
              throw err;
            } else if (!isMatch) {
              console.log("Password doesn't match!");
            } else {
              console.log("Password matches!");
            }
          }
        );

        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
};
