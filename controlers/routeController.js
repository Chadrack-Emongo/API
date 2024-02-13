const tweet = require("../data.js")
const getRoute = (req, res) => {
  res.json({ message: 'controlers des routes' });
};

// l'authentification via jwt

const authentificationJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authentification requise' });
  }

  jwt.verify(token, 'votre_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    req.user = user;
    next();
  });
};

// l'ajout d'un tweet

const ajout = (req, res) => {
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
  authentificationJWT,
  deleteTweet,
  updateTweet,
  getRoute
}