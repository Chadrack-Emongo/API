const tweet= require("../data.js")
const getRoute = (req, res) => {
    res.json({ message: 'controlers des routes' });
  };

//   app.get("/route/:id", data);
const ajout= (req, res) => {
const data = req.body
tweet.push(data)
    res.json(tweet);

  }
module.exports= {ajout,getRoute}