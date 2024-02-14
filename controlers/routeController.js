const tweet = require("../data.js")
const getRoute = (req, res) => {
  res.json({ message: 'controlers des routes' });
};

// l'authentification via jwt

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCd/+j4Wg52O6ZQKxTllUTJAUg6CeLm4u1WqMzpFSlVDmPnisaU
R1aYsjB6x3pIXf7c07ssIHCkHsid+spEZ5YYCzBoYSA7lRN4VVPbY0sRyykEyO1J
pQg1X0JAtXjk/6rYkDPkP+bczPUU0yiDU4J3xpZ20WAfvx1lZeuBXaG6pQIDAQAB
AoGAUn3ve+NBE7f3EHo90dRKcovp0uugfR3T/t/pBHTY/KCjxpstLPPGIbk/GIuX
q7rvuwoM+nABf57W7ayn+GkA8r5loQmyXffMu+esajv9eq/tMJiNzsHuGcBsHHCC
UnzoWZGBB4atSOQqbJHMWRVVTwA0ZREy09E2Goke5TX3eY0CQQDpZJPuhQRUREd3
clmiDz6au1XJvYLNd6yFzzRLG1rC2h4JHTBzTUTpxtBpXcr9T7shRq76WcIRPqWB
9sM8m2LHAkEArU3QINnmUqIE0bLG70kT0A7fP3sjHYbTZIyqr3XXJ6DlEctRIDOT
nK295C1xBDQn6fmx0SUjTKtBVDj86J2LMwJBALNnjdM2Soqf5bOqob3SLBRy1lH6
K/bW/DXrfc4SG+VWFup4loq7JbLyEbg80dGAHV9J3y0wG953om/RiGgpJXcCQQCQ
CI/l/bOTEdz3e6Ii1ZWF4hZhaDHzJE8kzlQ9p6693NcFRvmRzcvs9+lObwXy/HX/
2+qRbFA+NEcDfKmVmvpJAkAG7aYxbo9RjZ6KRvU03M+SANjtwZgdfR9JENZ1GROR
cR1lQ+RURfkE4U+Jw49qwirxuuWo89Kr9SJRwJEMMdZd
-----END RSA PRIVATE KEY-----`

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