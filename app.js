const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const multer = require('multer');

const PORT = 3000;
let frenchMovies = [];
const upload = multer();

const jwt = require('jsonwebtoken')

app.use('/public', express.static('public')) // Indique les middleware que l'on souhaite
// app.use(bodyparser.urlencoded({extended: false}));

// function () est égale  à: () =>
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/movies', (req, res) =>{
    const title = "Films français des trente dernières années";

    frenchMovies = [
        {title: "Le fabuleux destin d'Amélie Poulain", year: 2001 },
        {title: "Buffet froid", year: 1979 },
        {title: "Le diner de cons", year: 1998 },
        {title: "De rouille et d'os", year: 2012 },
    ];
    res.render('movies', {movies: frenchMovies, title: title});
});

 var urlencodedParser = bodyparser.urlencoded({extended: false});

// app.post('/movies', urlencodedParser, (req, res) => {
//     const movietitle = req.body.movietitle;
//     const movieyear = req.body.movieyear;
//     const newMovies = {title: req.body.movietitle, year: req.body.movieyear}
//
//     // frenchMovies.push(newMovies);
//     frenchMovies = [...frenchMovies, newMovies];
//
//     console.log(frenchMovies);
//
//     res.sendStatus(201);
// })
app.post('/movies', upload.fields([]), (req, res) => {
    if(!req.body){
        return res.sendStatus(500);
    }else{
        const formData = req.body;
        console.log('formData: ', formData);

        const newMovies = {title: req.body.movietitle, year: req.body.movieyear}
        frenchMovies = [...frenchMovies, newMovies];

        res.sendStatus(201);
    }
})

app.get('/movies/add', ((req, res) => {
  res.send("Prochainement, un formulaire d'ajout") ;
}));

// app.get('/movie-details', ((req, res) => {
//   // res.send("Prochainement, un formulaire d'ajout") ;
//     res.render('movie-details')
// }));

app.get('/movie-search', ((req, res) => {
  // res.send("Prochainement, un formulaire d'ajout") ;
    res.render('movie-search');
}));

app.get('/movies/:id/:title', (req, res) =>{
    const id = req.params.id;
    const movie_title = req.params.title;
    // res.send(`Film numéro ${id}`)
    res.render('movie-details', { movie_id: id, movie_title: movie_title})
});

app.get('/login', (req, res) => {
    res.render('login', {title: 'Connexion'})
});

const fakeUser = {email: 'testuser@testmail.fr', password: 'qsd'};
const secret = "qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq";

app.post('/login', urlencodedParser, (req, res) => {
    console.log('login post', req.body)
    if(!req.body){
        res.sendStatus(500);
    } else{
        if(fakeUser.email ===req.body.email && fakeUser.password === req.body.password){
            const myToken = jwt.sign({iss: 'http://expressmovies.fr', user: 'Sam', role:'moderator'}, secret);
            res.json(myToken);
            // res.json({
            //     email:"testuser@testmail.fr",
            //     favoriteMovie: "Il était une fois dans l'ouest",
            //     favoriteMovieTheater: "Ciné TNB, 1 rue Saint-Hélier, 35040 Rennes",
            //     lastloginDate: new Date()
            // });
        }
        else{
            res.sendStatus(401);
        }
    }
})

app.get('/', (req, res) =>{
    // res.send("Hello <b>world</b>");
    res.render('index')
});


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});