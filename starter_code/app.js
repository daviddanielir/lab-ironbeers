
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));





app.get('/', (req, res, next) => {
  res.render('index');
});



// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.hbs");
// });

app.get("/beers", (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers.hbs", {beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});



app.get("/random-beers", (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render("random-beers.hbs", {beers});
  })
  .catch(error => {
    console.log(error)
  })
});

hbs.registerPartials(__dirname + '/views/partials') 



app.listen(3000, () => console.log("http://localhost:3000"));
