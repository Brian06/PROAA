var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

	var userSchema = new mongoose.Schema({
		email:      { type: String, unique: true},
        password:   { type: String },
        name: 		{ type: String },
        topics:     [{ type: Number, ref: 'Topic' }],
        resources:  [{ type: Number, ref: 'Resource' }]
	});

userSchema.plugin(autoIncrement.plugin, 'User');
module.exports = mongoose.model('User', userSchema);


