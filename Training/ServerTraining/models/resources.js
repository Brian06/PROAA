var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
        


	var resourceSchema = new mongoose.Schema({
		description: 		{ type: String },
		url: 		        { type: String }
	});

resourceSchema.plugin(autoIncrement.plugin, 'Resource');
module.exports = mongoose.model('Resource', resourceSchema);

