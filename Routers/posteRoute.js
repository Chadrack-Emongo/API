const express = require('express');
const controllerPost = require('../controlers/routeController');
const router = express.Router();


// L'ajout d'un utilisateur

router.get("/", (req, res) => {
  const tweets = [];
  res.json(tweets);
});

//tweet
router.post("/", controllerPost.ajout);

module.exports = router;