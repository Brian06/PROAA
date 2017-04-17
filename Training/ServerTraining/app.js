var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    autoIncrement   = require('mongoose-auto-increment');

// Connection to DB
var connection = mongoose.connect('mongodb://localhost/training', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

autoIncrement.initialize(connection);


var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


// Import Models and controllers
var userModel     = require('./models/users')(app, mongoose);
var topicModel     = require('./models/topics')(app, mongoose);
var resourceModel = require('./models/resources')(app, mongoose);
var topicCtrl = require('./controllers/topics');
var userCtrl = require('./controllers/users');
var resourceCtrl = require('./controllers/resources');


// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var training = express.Router();

training.route('/topics')
  .get(topicCtrl.findAllTopics)
  .post(topicCtrl.addTopic);

training.route('/topics/:id')
  .get(topicCtrl.findById)
  //.put(topicCtrl.updateTopic)
  //.delete(topicCtrl.deleteTopic);

//training.route('/updatetopics/:id').get(topicCtrl.updateTopic);
training.route('/top10').get(topicCtrl.top10);
training.route('/mytopics/:id').get(topicCtrl.getTopicsbyUser);
training.route('/saveusers').post(userCtrl.saveUser);
training.route('/searchusers').post(userCtrl.searchUser);
training.route('/users').get(userCtrl.getAllUser);
training.route('/check').get(userCtrl.checkUser);
training.route('/logout').get(userCtrl.logOut);
training.route('/saveresource').post(resourceCtrl.addResource);
training.route('/myresources/:id').get(resourceCtrl.getResourcesbyUser);
training.route('/resources').get(resourceCtrl.findAllResources);



app.use('/api', training);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});