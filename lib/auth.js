module.exports = {

	auth: function(req, res, next){
		if ( req.session.user ) {
			if(req.session.user) req.user = req.session.user
			if(req.user && req.user.token) {
				res.header('x-auth-token', req.user.token );
				delete req.user.token;
			}
			return next();
		}
		res.redirect('/login');
	}
};