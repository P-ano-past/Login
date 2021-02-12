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
    // console.log(res.body);
    console.log(req.body);
    console.log(req.params);
    // console.log(body);
    db.User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
    // console.log("findbyID triggered");
  },
  newTextPost: function (req, res) {
    // console.log(res.body);
    console.log("req.body", req.body);
    console.log("req.params", req.params);
    // console.log(body);
    db.User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
    console.log("newTextPost triggered");
  },
  createPost: function ({ body }, res) {
    console.log("body", body);
    console.log("post: ", body.posts.post);
    console.log("author: ", body.posts.author);
    // console.log("res", res);
    db.User.findOneAndUpdate(
      { _id: body.posts.author },
      { $set: { posts: { post: body.posts.post, author: body.posts.author } } }
    )
      .then(console.log("attempt to save"))
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.json(err).status(421))
      .then(res.status(200))

      .catch((err) => res.status(422).json(err));
  },
  createUser: function ({ body }, res) {
    const bcrypt = require("bcryptjs");

    bcrypt.genSalt(10, function (err, salt, next) {
      bcrypt.hash(body.userPassword, salt, function (err, hash) {
        body.userPassword = hash;
        db.User.create(body)
          .then((dbModel) => res.json(dbModel))
          .catch((err) => res.status(421).json(err).then(res.status(200)));
      });
    });
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
      username: req.body.username,
    })
      .then((dbModel) => {
        const bcrypt = require("bcryptjs");
        const hash = dbModel.userPassword;
        bcrypt.compare(req.body.userPassword, hash, function (err, result) {
          if (result === false) {
            res.sendStatus(401);
          } else if (result === true) {
            res.json(dbModel).status(200);
          }
        });
      })
      .catch((err) => res.status(423).json(err));
  },
};
