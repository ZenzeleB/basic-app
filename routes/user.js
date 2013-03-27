var mongo = require('mongoskin')
var conn = mongo.db('mongodb://zenzele:zenzele@widmore.mongohq.com:10010/Barnes')

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.register = function(req, res){
    
  console.log("Rendering signup");

  
  res.render('register', { title: 'Express' });
};


exports.registerPost = function(request, res){
    console.log(request.body.email);
    
    var newUser = { email:request.body.email, password: request.body.password}
    conn.collection('users').insert(newUser)
    
    res.redirect('/');
};

exports.home = function(req, res){
  res.render('home', { title: 'Express' });
};