var express = require('express')
var compression = require('compression')
var bodyParser  = require("body-parser"),
var methodOverride = require("method-override");

var app = express()

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))


var router = express.Router();

router.get('/hello', function(req, res) {  
   res.send("Hello World!");
});

app.use(router);


// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})





