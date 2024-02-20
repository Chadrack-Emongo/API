const { PrismaClient } = require('@prisma/client') 
const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const port = 8001;
const posteRoute = require("./Routers/posteRoute");
const routeleController = require('./controlers/routeController');
const prisma = new PrismaClient();

app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur notre API du tweet' });
});

app.get('/route', routeleController.authentificationJWT, routeleController.getRoute);
app.use("/posteRoute", posteRoute);

// modifier un tweet
app.put('/updateTweet/:id',routeleController.authentificationJWT, routeleController.updateTweet);

// supprimer un tweet par son ID
app.delete('/deleteTweet/:id',routeleController.authentificationJWT, routeleController.deleteTweet);

// Démarrage du serveur
app.listen(port, () => {
    console.log("serveur en marche")
});
