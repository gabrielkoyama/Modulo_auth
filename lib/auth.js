const jwt = require('jsonwebtoken')
const sql = require('./sql')

module.exports = {

	auth: function(req, res, next){
		if ( global.userToken ) {
			try {
				jwt.verify(global.userToken,  global.env.PASS_JWT, async (err, decode) => {
					if(err){
						// dps mudar p render e passar mensagem de erro
						console.log('not enough privileges')
						res.redirect('/');
					}
					else {
						let user = await sql.findUserModuleByUserId(decode.id);
						if(user.length > 0){
							if(!req.originalUrl.toLowerCase().includes("middleware")){
								var p = await user.find(el => {
									return el.moduleLink.toLowerCase().includes(req.originalUrl.split('/')[1].toLowerCase())
								})
								if(!p){
									console.log('not enough privileges')
									res.redirect('/');
								}
								else{
									return next();
								}
							}else return next();
						}else{
							console.log('not enough privileges')
							res.redirect('/');
						}
					}
				});
			}catch(err){
				res.redirect('/');
			}
		}else res.redirect('/dashboard/login');
		
	},
	basicAuth: function(req,res, next){
		if ( global.userToken ) {
			try {
				jwt.verify(global.userToken,  global.env.PASS_JWT)
			}catch(er){
				res.redirect('/dashboard');		
			}
			return next();
		}
		res.redirect('/dashboard/login');
	}
};