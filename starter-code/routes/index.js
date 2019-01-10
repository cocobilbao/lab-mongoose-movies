const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");


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

router.post("/celebrities/:id/delete", (req, res, next) => {
  let celebritieId = req.params.id;

  Celebrity.findByIdAndRemove({ _id: celebritieId })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(next);
});



router.get('/celebrities/:id/edit', (req,res,next)=>{
  let celebritieId = req.params.id;

  Celebrity.findOne({'_id': celebritieId})
   .then(celebrity=>{
       res.render('celebrities/edit-celebrity', celebrity);
   })
   .catch(next)
})

router.post('/celebrities/:id',(req,res,next)=>{

 let celebritieId = req.params.id;

 var objCelebrity = {
   name: req.body.name,
   occupation: req.body.occupation,
   catchPhrase: req.body.catchPhrase
 }

 Celebrity.findByIdAndUpdate(celebritieId, {$set: objCelebrity}, {new:true} )
   .then(()=>{
     res.redirect('/celebrities');
   })
   .catch(next)
})

module.exports = router;
