var mongoose = require('mongoose');

var Topic  = mongoose.model('Topic');
var User = mongoose.model('User');

//GET - Return all Topic in the DB
exports.findAllTopics = function(req, res) {
	Topic.find(function(err, topics) {
    if(err) res.send(500, err.message);

    console.log('GET /topics')
		res.status(200).jsonp(topics);
	});
};


//GET - Return top ten
exports.top10 = function(req, res) {
	Topic.find().exec(function(err, topics) {
    if(err){
        res.send(500, err.message);
    }else{
        console.log('GET /topics')
        topics.sort(function(a, b) {
            return  b.resources.length - a.resources.length;
        });
        console.log(topics.length)
        if(topics.length>10){
            console.log("ente")
            topics = topics.slice(0, 10);
            console.log(topics.length)
        }
        
         res.status(200).jsonp(topics);
    }
	});
};



//GET - Return a Topic with specified ID
exports.findById = function(req, res) {
    console.log(req.params.id);
	Topic.findById(req.params.id, function(err, topics) {
    if(err) return res.send(500, err.message);

    console.log('GET /topic/' + req.params.id);
		res.status(200).jsonp(topics);
	});
};



//Topics by User
exports.getTopicsbyUser = function (req, res){
    console.log(req.params.id);
    User
        //.findById(req.params.id)   
        .findById(localStorage.getItem('id'))
        .populate('topics')
        .exec(function (err, user) {
            console.log(user);
        if(user==undefined){
            res.status(200).send([])
        }else {
            res.status(200).jsonp(user.topics);
        }
    });
}


//insert a topic in db
exports.addTopic = function(req, res) {
    console.log('POST');
	console.log(req.body);
    
    var topic = new Topic({
		name:    req.body.name
	});

    topic.save(function (err) {
        if (!err) {
            User
                .findOne({_id : localStorage.getItem('id')},function (err,user) {
                    user.topics.push(topic);
                    user.save();
                })
            return res.status(200).jsonp({Status:'Good'});
        } else {
            console.log('ERROR: ' + err);
            return res.status(500).jsonp({Status:'Error'});
        }
    });
};
