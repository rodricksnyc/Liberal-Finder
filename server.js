const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

app.use(function(req, res, next) {
  var err = new Error('ERROR BITCH');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
