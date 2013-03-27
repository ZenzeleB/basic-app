
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , meetingGroup = require('./routes/meetingGroup')
  , events = require('./routes/events')
  , mongo = require('mongoskin')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.cookieParser('secret'));
  app.use(express.session({secret:'secret'}));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/logout', routes.logout);
app.post('/', routes.recieveForm);

app.get('/register', user.register);
app.post('/register', user.registerPost);

app.get('/home', user.home);
app.get('/users', user.list);

app.get("/meetingGroups", meetingGroup.list);
app.get("/meetingGroups/:id", meetingGroup.edit);
app.post("/meetingGroups/:id", meetingGroup.update);
app.post("/meetingGroups", meetingGroup.create);
app.get("/meetingGroups/:id/delete", meetingGroup.del);

app.get("/events", events.list);
app.get("/events/:id", events.edit);
app.post("/events/:id", events.update);
app.post("/events", events.create);
app.get("events/:id/delete", events.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
