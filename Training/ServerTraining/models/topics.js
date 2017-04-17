var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
        


	var topicSchema = new mongoose.Schema({
		name: 		{ type: String },
        resources:  [{ type: Number, ref: 'Resource' }]
		
	});

topicSchema.plugin(autoIncrement.plugin, 'Topic');
module.exports = mongoose.model('Topic', topicSchema);

