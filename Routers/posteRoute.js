const express = require('express');
const router = express.Router();
const tweets = [
  { Id: 1, Text: '' },
  { Id: 2, Text: '' },
  { Id: 3, Text: '' },
];

// L'ajout d'un utilisateur

router.get("/", (req, res) => {
  const tweets = [];
  res.json(tweets);
});

//tweet
router.post("/", (req, res) => {

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
  const Id = req.params.id;
  let tweet = tweets.filter(tweets=>tweets.Id === Id)
  tweetUrl = req.body;
  res.json(tweetUrl);


  // if (!tweet) {
  //   res.status(404).send("Tweet not found");
  // } 
  // else {
    // tweetUrl = req.body;
    // tweet.author = req.body.author;
    // tweet.save((err, tweet) => {
    //   if (err) {
    //     res.status(500).send(err);
    //   } else {
        // res.json(tweetUrl);
    //   }
    // });
  }
);


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