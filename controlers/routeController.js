const { Prisma } = require("@prisma/client");
const tweet = require("../data.js")
const dotenv = require('dotenv');
const getRoute = (req, res) => {
  res.json({ message: 'controlers des routes' });
};

// l'ajout d'un tweet

const ajout = (req, res) => {
  // prisma.user.findMany().then(users => res.send(users))
  let id = tweet.length + 1
  const data = req.body
  data.id = id
  tweet.push(data)
  res.json(tweet);
}

// la mis à jour d'un tweet
const updateTweet = (req, res) => {
  const id = parseInt(req.params.id);
  const newText = req.body;
  newText.id = id;

  //Validez les données
  if (!newText) {
    return res.status(400).json({ error: 'Le nouveau texte du tweet est requis' });
  }

  // Recherchez le tweet dans le tableau
  const tweetIndex = tweet.findIndex(tweet => tweet.id === id);

  //Vérifiez si le tweet existe
  if (!tweetIndex) {
    return res.status(404).json({ error: 'Tweet non trouvé' });
  }

  //Mettez à jour le texte du tweet
  tweet[tweetIndex] = newText;

  res.json(tweet);
};

// supprimer un tweet par son id
const deleteTweet = (req, res) => {
  const tweetId = parseInt(req.params.id);

  // Recherchez l'index du tweet dans le tableau
  const tweetIndex = tweet.findIndex(tweet => tweet.id === tweetId);

  // Vérifiez si le tweet existe
  if (tweetIndex === -1) {
    return res.status(404).json({ error: 'Tweet non trouvé' });
  }

  // Supprimez le tweet du tableau
  tweet.splice(tweetIndex, 1);

  res.json(tweet);
};

module.exports = {
  ajout,
  deleteTweet,
  updateTweet,
  getRoute
}