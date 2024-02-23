const { Prisma } = require("@prisma/client");
const tweet = require("../data.js")
const dotenv = require('dotenv');

const getRoute = (req, res) => {
  res.json({ message: 'controlers des routes' });
};

// inscription
async function userRegister(req, res) {
  const user = await Prisma.user.create({
    data: {
      email: "",
      nam: "",
      password: ""
    },
  })
}

// connexion
async function userLogin(req, res) {
  const user = await Prisma.user.findUnique({
    where: {
      email: req.body.email,
    }
  })

  if (user) {
    if (req.body.password == user.password) {
      user.token = TOKEN_SECRET;
      return res.json(user);
    }
    return res.send('password incorrect').status(401);
  }
  else {
    return res.send('Utilisateur non trouver').status(404);
  }
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
  getRoute,
  userLogin,
  userRegister
}