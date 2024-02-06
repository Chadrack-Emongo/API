const express = require('express');
const app = express();
const port = 8000;
const users = require("./Routers/users")


app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur notre API du tweet' });
});

app.use("/users", users)

app.listen(port, () => {
    console.log("serveur en marche")
})
