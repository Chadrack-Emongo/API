const { PrismaClient } = require('@prisma/client')
const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
dotenv = require('dotenv');
const port = 8001;
const posteRoute = require("./Routers/posteRoute");
const routeleController = require('./controlers/routeController');
const prisma = new PrismaClient();


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

const publickye = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA64haUFTb3jA5IAGk5di1
ELgNVZb+WP6+OWCe0FfjsaaoM6nxzQr+8yCyftzLIOLDdCdtwKOcGOPEA9vQptub
zGM73Swa8cL9MFRgEx0DyNI5wzQlUvokKgP4xO+vP+utvN8UkgmOak3FXo/tJj3W
YuYITh9z5mHbddvLB/nDnPjcJ0hKWN7stxVyFQd/ladkspF57EsSm7ENL4cKrAqp
+iQdcADZ6m/1D6CR2G2G+8ftPdL5bIK/7b61T1mubgKpjaLyCQ2aaSUL5c8jy/zK
DWK0dQLmzGzucZRPtYxN6lmmezjUQsFyPK4Fn7O74YYoDQ7dnzMLMlUaozS0Nw/e
jQIDAQAB
-----END PUBLIC KEY-----`

// l'authentification via jwt
const authentificationJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authentification requise' });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    req.user = user;
    next();
  });
};

// Middleware pour vérifier le rôle de l'utilisateur
const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role === requiredRole) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};

// Route protégée par l'authentification
app.post('/tweets', checkUserRole('admin'), (req, res) => {

  res.json({ message: 'Tweet created successfully' });
});

// vérifier le token
const autorisationJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// obtenir les variables de configuration
dotenv.config();

// accéder à la variable de configuration
process.env.TOKEN_SECRET;

app.use(express.json())
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur notre API du tweet' });
});


//
app.get('/route', authentificationJWT, autorisationJWT, routeleController.getRoute);

// jouter un tweet
app.use("/posteRoute", authentificationJWT, autorisationJWT, routeleController.ajout);

// modifier un tweet
app.put('/updateTweet/:id', authentificationJWT, autorisationJWT, routeleController.updateTweet);

// supprimer un tweet par son ID
app.delete('/deleteTweet/:id', authentificationJWT, autorisationJWT, routeleController.deleteTweet);

// Démarrage du serveur
app.listen(port, () => {
  console.log("serveur en marche")
});
