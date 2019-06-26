const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		userModel.countDocuments({nickname:req.body.nickname}, function(err, count){
			if(err){
				next(err);
			}else if(count == 0){
                userModel.countDocuments({email:req.body.email}, function(err, count){
					if(err){
						next(err);
					}else if(count == 0){
						userModel.create({ nickname: req.body.nickname, email: req.body.email, password: req.body.password }, function (err, result) {
							if(err){
								next(err);
							}else{
								res.json({status: "success", message: "Account created successfully", data: null});
							}
						});
					}else{
						res.json({status: "error", message: "This email is already linked to an account", data: null});
					}
				});
            }else{
				res.json({status: "error", message: "This nickname is already taken", data: null});
			}
			
		});
	},

	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
			if (err) {
				next(err);
			}else{
				if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
					const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '48h' }); 
					res.json({status:"success", message: "Authentification success", data:{user: userInfo, token:token}});	
				}else{
					res.json({status:"error", message: "Invalid email or password", data:null});
				}
			}
		});
	},

}