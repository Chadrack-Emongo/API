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
  
module.exports= {ajout,getRoute}