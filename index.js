const express = require('express');
const app = express();
const port = 8001;
const posteRoute = require("./Routers/posteRoute");
const routeleController = require('./controlers/routeController');
const data= require("./data")

app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur notre API du tweet' });
});


app.get('/route', routeleController.getRoute);
app.get("/data", data);
app.use("/posteRoute", posteRoute);

app.listen(port, () => {
    console.log("serveur en marche")
});
