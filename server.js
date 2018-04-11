const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  //next tells express when middleware function is done
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  //console.log(`${now}: ${req.method} ${req.url}`);
  next();
}); //register middleware; takes function

//middleware that bypasses other handlers
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public')); //takes abs path to folder you want to serve up

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// app.get('/', (req, res) => {
//   //request stores info about header, body, method
//   //response has methods to repond to http request
//     //set http status codes, what to send back
//   //res.send('<h1>hello express!</h1>'); //when someone views website, this will be body data
//   res.send({
//     name: 'Ashley',
//     likes: ['food', 'drawing', 'traveling']
//   });
// });

//a second route
app.get ('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
  //res.send('About Page'); //returns some html
});

app.get ('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello and Welcome',
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'There has been an error'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
}); //common port for developing locally
//binds app to port on machine
