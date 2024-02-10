const express = require('express');
const app = express();
const port = 8001;
const posteRoute = require("./Routers/posteRoute");
const routeleController = require('./controlers/routeController');

app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur notre API du tweet' });
});


app.get('/route', routeleController.getRoute);
//app.get("/route/:id", data);
app.use("/posteRoute", posteRoute);

// modifier un tweet
app.put('/updateTweet/:id', routeleController.updateTweet);

// Endpoint pour supprimer un tweet par son ID
app.delete('/deleteTweet/:id', routeleController.deleteTweet);


app.listen(port, () => {
    console.log("serveur en marche")
});
