const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");
// router.use('/', Celebritie);

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then(celebrities => {
      res.render("celebrities/index", { celebrities });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  let celebrityId = req.params.id;
  console.log(celebrityId);
  res.render("celebrities/celebrity");
});

router.get("/celebrity/:id", (req, res, next) => {
  let celebrityId = req.params.id;
  Celebrity.find({ _id: celebrityId })
    .then(celebrity => {
      res.render("celebrities/celebrity", { celebrity });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/celebrities/new", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
  newCelebrity
    .save()
    .then(celebrity => {
      res.redirect("/celebrities");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
