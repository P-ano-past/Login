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
  },
  findByUser: function (req, res) {
    db.User.findById(req.params.username)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  createPost: function ({ body }, res) {
    db.User.findByIdAndUpdate(
      {
        _id: body.posts.postAuthor_id,
      },
      {
        $push: {
          posts: {
            post: body.posts.post,
            postAuthor_id: body.posts.postAuthor_id,
            author: body.posts.author,

            upsert: true,
            returnNewDocument: true,
          },
        },
      },
      { upsert: true, returnNewDocument: true }
    )
      .then(res.sendStatus(200))
      .catch((err) => res.status(401).json(err));
  },
  deletePost: function ({ body }, res) {
    console.log("body.posts: ", body);
    console.log("body.posts._id: ", body.posts._id);

    db.User.findOne(
      {
        _id: body.posts.postAuthor_id,
      },
      {
        posts: {
          $elemMatch: {
            _id: body.posts._id,
            post: body.posts.post,
            postAuthor_id: body.posts.postAuthor_id,
          },
        },
      }
    )
      .then((res) => console.log("res", res), res.status(200))
      .catch((err) => res.status(401).json(err));
  },
  updateProfile: function ({ body }, res) {
    console.log(body);
    db.User.findByIdAndUpdate(
      {
        _id: body.profile.author_id,
      },
      {
        profile: {
          customHandle: body.profile.customHandle,
          bio: body.profile.bio,

          upsert: true,
          returnNewDocument: true,
        },
      }
    )
      .then(res.sendStatus(200))
      .catch((err) => res.status(401).json(err));
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
  auth0Login: function (req, res) {
    db.User.find({ email: { $eq: req.body.email } })
      .countDocuments()
      .then((dbModel) => {
        if (dbModel === 0) {
          db.User.create({
            username: req.body.username,
            email: req.body.email,
            given_name: req.body.given_name,
            nickname: req.body.nickname,
          })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err).then(res.status(200)));
        } else {
          db.User.find({ email: { $eq: req.body.email } })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err).then(res.status(200)));
        }
      })
      .catch((err) => res.status(422).json(err));
  },
};
