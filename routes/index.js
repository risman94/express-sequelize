var express = require("express");
var router = express.Router();
var models = require("./../models");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// create user
router.post("/v1", (req, res) => {
  models.User
    .create({
      username: req.body.username
    })
    .then(result => {
      res.json(result);
    });
});

// list all user and task
router.get("/v1", (req, res) => {
  models.User
    .findAll({
      include: [
        {
          model: models.Task,
          as: "Tasks"
        }
      ]
    })
    .then(result => {
      res.send(result);
    });
});

// view single user and task
router.get("/v1/:id", (req, res) => {
  models.User
    .findById(req.params.id, { include: [{ model: models.Task, as: "Tasks" }] })
    .then(result => {
      res.send(result);
    });
});

// update user
router.put("/v1/user/:id", (req, res) => {
  models.User
    .update({ username: req.body.username }, { where: { id: req.params.id } })
    .then(() => {
      models.User
        .findById(req.params.id, {
          include: [{ model: models.Task, as: "Tasks" }]
        })
        .then(result => {
          res.send(result);
        });
    });
});

// remove user
router.delete("/v1/:id", (req, res) => {
  models.User
    .findById(req.params.id, {
      include: [{ model: models.Task, as: "Tasks" }]
    })
    .then(result => {
      models.User.destroy({ where: { id: req.params.id } }).then(() => {
        res.send("delete");
      });
    });
});

// create task
router.post("/v2/:userId", (req, res) => {
  models.Task
    .create({ title: req.body.title, userId: req.params.userId })
    .then(result => {
      res.json(result);
    });
});

// list all task
router.get("/v2/:userId", (req, res) => {
  models.Task.findAll({}).then(result => {
    res.send(result);
  });
});

module.exports = router;
