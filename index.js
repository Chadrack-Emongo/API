const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur notre API' });
  });

app.listen(port, ()=>{
    console.log("serveur en marche")
})