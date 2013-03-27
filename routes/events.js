var mongo = require('mongoskin');

var conn = mongo.db('mongodb://zenzele:zenzele@widmore.mongohq.com:10010/Barnes')

exports.list = function(req, res){
    conn.collection("events").find({}).toArray(function(err,result) {
       if (err) throw err;
       console.log(result);
       res.render("eventsList",{ title:"Events",events:result});
    });
};

exports.edit = function(req, res){
    console.log(req.params.id);
    conn.collection("events").findOne({_id : conn.ObjectID.createFromHexString(req.params.id) },function(err,result) {
       if (err) throw err;
       console.log(result);
       res.render("eventsEdit",{ title:"Events",meetingGroup:result});
    });
};

exports.create = function(req, res){
  conn.collection("events").insert({name: req.body.name }, function(err,result) {
       if (err) throw err;
       console.log(result);
       res.redirect('/events')
    });
};

exports.update = function(req, res){
    conn.collection("events").findOne({_id : conn.ObjectID.createFromHexString(req.params.id) },function(err,result) {
       if (err) throw err;
       
       // Update the object based upon our edit form
       result.name = req.body.name;
       result.webUrl = req.body.webUrl;
       
       // Save it back to the database
       conn.collection("events").save(result,function(err,result) {
            res.redirect("/events");   
       })
       
       
    });
};

exports.del = function(req, res){
  conn.collection("meetingGroups").remove({_id : conn.ObjectID.createFromHexString(req.params.id) },function(err) {
       if (err) throw err;
       
       res.redirect("/meetingGroups");
       
    });
};