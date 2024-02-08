const express = require('express');
const app = express();
const port = 8001;
const posteRoute = require("./Routers/posteRoute")
const routeleController = require('./controlers/routeController');

app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur notre API du tweet' });
});


app.get('/route', routeleController.getRoute);

app.use("/posteRoute", posteRoute)

app.listen(port, () => {
    console.log("serveur en marche")
})
