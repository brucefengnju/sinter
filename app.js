var path = require('path');
var express = require('express');
var config = require('./config').config;
var app = express();
var routes = require('./routes');
var userproxy = require('./proxy/userproxy');
/**
 * configuration in all env
 **/
app.configure(function(){
    var viewsRoot = path.join(__dirname, 'views');
    app.set('view engine', 'html');
    app.set('views', viewsRoot);
    app.engine('html', require('ejs').renderFile);
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret:'mozillapersona'
    }));

    app.use(function(req,res,next){
        if(req.session.email){
            userproxy.getUserByEmail(req.session.email,function(err,user){
                if(err){
                    next(err);
                }
                res.locals.user=user;
                next();
            });

        }else{
            res.locals.user = null;
            next();
        }
        
    });
    
});
//set routes
routes(app);
// start app
app.listen(config.port);
console.log("sinter listening on port %d in %s mode",config.port,app.settings.env);
if (process.env.NODE_ENV == 'test') {
  console.log("sinter listening on port %d in %s mode",config.port,app.settings.env);

};
module.exports = app;
