var mongoose = require('mongoose');

var Topic  = mongoose.model('Topic');
var User = mongoose.model('User');
var Resource = mongoose.model('Resource');

//GET - Return all Resources in the DB
exports.findAllResources = function(req, res) {
	Resource.find(function(err, topics) {
    if(err) res.send(500, err.message);

    console.log('GET /resource')
		res.status(200).jsonp(topics);
	});
};

//GET - Return a resource with specified ID
exports.findById = function(req, res) {
    console.log(req.params.id);
	Resource.findById(req.params.id, function(err, topics) {
    if(err) return res.send(500, err.message);

    console.log('GET /reosurce/' + req.params.id);
		res.status(200).jsonp(topics);
	});
};

//Resource by User
exports.getResourcesbyUser = function (req, res){
    console.log(req.params.id);
    User
        //.findById(req.params.id)
        .findById(localStorage.getItem('id'))
        .populate('resources')
        .exec(function (err, user) {
            console.log(user);
        if(user==undefined){
            res.status(200).send([])
        }else {
            res.status(200).jsonp(user.resources);
        }
    });
}

//insert a resource in db
exports.addResource = function(req, res) {
    console.log('POST');
	console.log(req.body);
    
    var resource = new Resource({
		description: 		req.body.description,
		url: 		        req.body.url
	});
    
    resource.save(function (err) {
        if (!err) {
            User
                .findOne({_id : localStorage.getItem('id')},function (err,user) {
                    user.resources.push(resource);
                    user.save();
                })
            
            Topic
                .findOne({_id : req.body.idTopic},function (err,topic){
                    topic.resources.push(resource);
                    topic.save();
            })
            
             return res.status(200).jsonp({Status:'Good'});
            
        } else {
            console.log('ERROR: ' + err);
            return res.status(500).jsonp({Status:'Error'});
        }
    });
};

