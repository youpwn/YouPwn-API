const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ChallSchema = new Schema({
	title: {
		type: String,
		trim: true,		
		required: true,
	},
	thumbnail: {
		type: String,
		trim: true,
		required: true
	},
	iframe: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
    flag: {
		type: String,
		trim: true,
		required: true
	}
},{ timestamps: true });

ChallSchema.pre('save', function(next){
    this.flag = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Chall', ChallSchema)