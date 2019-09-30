const path 			= require('path');
const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
// const secureEnv 	= require('secure-env');
// global.env 			= secureEnv({secret:'msp'});

global.userToken;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes/indexRoutes'));
app.use('/login', require('./routes/loginRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/module', require('./routes/moduleRoutes'));
app.use('/middleware', require('./routes/moduleRoutes'));

const port = process.env.PORT || 8888;

app.listen(port, function() {
	console.log('Running on port', port);
});

module.exports = app;
