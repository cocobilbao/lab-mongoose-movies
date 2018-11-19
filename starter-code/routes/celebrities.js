const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/Celebrity')


router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
  .then(celebrities => {
    res.render('celebrities/index',{celebrities})
  })
  .catch(err => console.log(err))
});


module.export = router;