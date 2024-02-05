var express = require('express');
var router = express.Router();
 
// L'ajout d'un utilisateur

router.get("/", (req, res) => {
    // const tweets = Tweet.find().sort({ createdAt: -1 });
    const tweets = [];
    res.json(tweets);
  });

module.exports = router;