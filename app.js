const express = require('express');
const app = express();

const PORT = 3000;

app.use('/public', express.static('public')) // Indique les middleware que l'on souhaite

// function () est égale  à: () =>
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/movies', (req, res) =>{
    res.send("Bientôt les films ici même!!");
});

app.get('/movies/add', ((req, res) => {
  res.send("Prochainement, un formulaire d'ajout") ;
}))

app.get('/movies/:id', (req, res) =>{
    const id = req.params.id;
    res.send(`Film numéro ${id}`)
})

app.get('/', (req, res) =>{
    // res.send("Hello <b>world</b>");
    res.render('index')
});


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});