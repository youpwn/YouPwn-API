const challModel = require('../models/challs');

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		challModel.findById(req.params.challId, function(err, challInfo){
			if (err) {
				next(err);
			}else{
				res.json({status:"success", message: "Chall found", data:{challs: challInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let challsList = [];
		challModel.find({}, function(err, challs){
			if (err){
				next(err);
			}else{
				for(let chall of challs){
					challsList.push({id: chall._id, title: chall.title, thumbnail: chall.thumbnail});
				}
				res.json({status:"success", message: "Challs list found", data:{challs: challsList}});
			}
		});
	},

	updateById: function(req, res, next) {
		challModel.findByIdAndUpdate(req.params.challId,{title:req.body.title}, function(err, challInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Chall updated successfully", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		challModel.findByIdAndRemove(req.params.challId, function(err, challInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Chall deleted successfully", data:null});
			}
		});
	},

	create: function(req, res, next) {
		challModel.create({ title: req.body.title, thumbnail: req.body.thumbnail, iframe: req.body.iframe, description: req.body.description, flag: req.body.flag }, function (err, result) {
			if(err)
				next(err);
			else
				res.json({status: "success", message: "Chall added successfully!!!", data: null});
			
		});
	},

}					