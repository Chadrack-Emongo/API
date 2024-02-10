const tweet= require("../data.js")
const getRoute = (req, res) => {
    res.json({ message: 'controlers des routes' });
  };

  // l'ajout d'un tweet

const ajout= (req, res) => {
const data = req.body
tweet.push(data)
    res.json(tweet);
  }
  
  // la mis à jour d'un tweet
  const updateTweet = (req, res) => {
    const tweet = parseInt(req.params.id);
    const newText = req.body.text;

  //Validez les données
  if (!newText) {
    return res.status(400).json({ error: 'Le nouveau texte du tweet est requis' });
  }

  // Recherchez le tweet dans le tableau
  const tweetToUpdate = tweets.find(tweet => tweet.id === tweet);

  //Vérifiez si le tweet existe
  if (!tweetToUpdate) {
    return res.status(404).json({ error: 'Tweet non trouvé' });
  }

  //Mettez à jour le texte du tweet
  tweetToUpdate.text = newText;

  res.json({ success: true, tweet: tweetToUpdate });
};
  
module.exports= {ajout,updateTweet,getRoute}