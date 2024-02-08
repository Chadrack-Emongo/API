const express = require('express');
const app = express();
const port = 8001;
const users = require("./Routers/posteRoute")

app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur notre API du tweet' });
});

const exampleController = require('./controlers/routeController');

app.get('/route', routeController.getRoute);

app.use("/users", users)

app.listen(port, () => {
    console.log("serveur en marche")
})
