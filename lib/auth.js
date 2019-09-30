const jwt = require('jsonwebtoken')

module.exports = {

	auth: function(req, res, next){
		if ( global.userToken ) {
			
			// verificando token
			try {
				jwt.verify(global.userToken,  process.env.PASS_JWT)
			}catch(er){
				res.redirect('/');		
			}
			return next();
		}
		res.redirect('/login');
	}
};