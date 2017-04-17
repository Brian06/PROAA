var mongoose = require('mongoose');
var User  = mongoose.model('User');



//save user in database
exports.saveUser = function(req, res) {
    
    console.log(req.body);
    
    var user = new User({
        email:      req.body.email,
        password:   req.body.password,
        name:       req.body.name
    });

    user.save(function (err) {
        if (!err) {
            console.log('User Created');
            return res.status(200).jsonp({Status:'Good'});
        } else {
            if(err.code == 11000){
                error = "that email is already taken, try another."
            }
            console.log('ERROR: ' + err);
            return res.status(500).jsonp({Status:'Error'});
        }
    });
};


//search an user
exports.searchUser= function (req, res) {
    User.find({email: req.body.email}, function (err, users) {
        if (!err) {
            console.log('GET /login');

            if(users.length !== 0 && users[0].password === req.body.password ){
                localStorage.setItem('email', req.body.email);
                localStorage.setItem('id', users[0]._id);
                console.log("local")
                console.log(localStorage.getItem('email'));
                console.log(localStorage.getItem('id'));  
                return res.status(200).jsonp({Status:'Good',name:users[0]});                
            }
            return res.status(500).jsonp({Status:'Error'});
            
        } else {
            console.log('ERROR: ' + err);
            return res.status(500).jsonp({Status:'Error'});
        }
    });
}

exports.logOut = function(req,res){
    localStorage.setItem('email', '');
    localStorage.setItem('id', '');
    res.send({'email': localStorage.getItem('email'), 'id': localStorage.getItem('id')})
}

exports.checkUser = function(req,res){
    res.send({'email': localStorage.getItem('email'), 'id': localStorage.getItem('id')})
}

//get all users
exports.getAllUser = function(req, res) {
    User.find(function(err, users) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp({users: users});
    })
}