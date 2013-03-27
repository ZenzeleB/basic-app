var mongo = require('mongoskin')

var conn = mongo.db('mongodb://zenzele:zenzele@widmore.mongohq.com:10010/Barnes')


exports.index = function(req, res){
  res.render('index', { title: 'Express', email : "", message: "", user: req.session.user });
};

exports.logout = function(req, res) {
    req.session.user = null;
    res.redirect('/');
};


exports.recieveForm = function(request, res){
 
    conn.collection('users').findOne({email:request.body.Email,password:request.body.Password}, function(err,user) {
       
       if (err) throw err;
       
       if (user) {
           // Yay! we are logged in
           request.session.user = user
           res.redirect('/');
       } else {
           res.render('index.jade',{title:"AYF?",email:request.body.Email,message:"Invalid user or password"})
       }
       
    
    });        
};


