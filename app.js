const path 			= require('path');
const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
global.userToken;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes/indexRoutes'));
app.use('/dashboard/login', require('./routes/loginRoutes'));
app.use('/dashboard/user', require('./routes/userRoutes'));
app.use('/dashboard/module', require('./routes/moduleRoutes'));
app.use('/dashboard/middleware', require('./routes/middlewareRoutes'));

// module1
app.use('/module1/', require('./routes/module1Routes'));

// module2
app.use('/module2/', require('./routes/module2Routes'));

const port = process.env.PORT || 80;


app.listen(port, function() {
	console.log('Running on port', port);
});

module.exports = app;
