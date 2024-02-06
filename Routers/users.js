const express = require('express');
const router = express.Router();


// L'ajout d'un utilisateur

router.get("/", (req, res) => {
  const tweets = [];
  res.json(tweets);
});

//tweet
router.post("/", (req, res) => {
  const tweets = [
    { Id: 1, Text: '' },
    { Id: 2, Text: '' },
    { Id: 3, Text: '' },
  ];

  tweet.save((err, tweet) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(tweet);
    }
  });
});

//tweet
router.put("/:id", (req, res) => {
  const tweet = Tweet.Id == req.params.id;

  if (!tweet) {
    res.status(404).send("Tweet not found");
  } else {
    tweet.text = req.body.text;
    tweet.author = req.body.author;
    tweet.save((err, tweet) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(tweet);
      }
    });
  }
});


//tweet
router.delete("/:id", (req, res) => {
  // const tweet = Tweet.findById(req.params.id);

  if (!tweet) {
    res.status(404).send("Tweet not found");
  } else {
    tweet.remove((err, tweet) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(204);
      }
    });
  }
});

module.exports = router;