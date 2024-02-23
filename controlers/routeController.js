const { Prisma } = require("@prisma/client");
const tweet = require("../data.js")
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require("express");
const app = express();
const router = require("../Routers/posteRoute.js");

const getRoute = (req, res) => {
  res.json({ message: 'controlers des routes' });
};

// Route d'inscription
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = {
      username: "chadrack",
      email: "emongo@gmail.com",
      password:"2812",
    }

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    // Générer un JWT
    const token = jwt.sign(user, TOKEN_SECRET);
    jwt.verify( token, process.env.TOKEN_SECRET)
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
}