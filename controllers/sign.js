/*!
 * sinter - sign index controller.
 * Copyright(c) 2013 brucefeng <brucechenofnju@gmail.com>
 * MIT Licensed
 */
var https = require('https');
var mongoose = require('mongoose');
var config = require('../config').config;
var model = require('../models');
var User = model.User
exports.login = function (req,res,next) {
	if(typeof req.body.assertion === 'undefined' || req.body.assertion === null ||req.body.assertion ===''){
		return res.redirect('index');
	}
	
	var options = {
		hostname:'verifier.login.persona.org',
		path:'/verify',
		method:'POST'
	};

	var vreq = https.request(options,function(vres){
		var body = '';
		vres.on('error',function (error) {
			console.log(error);
		});
		vres.on('data',function (chunk) {
			body += chunk;
		});
		vres.on('end',function(){
			try{
				var response = JSON.parse(body),
              	valid = response && response.status === "okay";
              	if(valid){
              		req.session['email'] = response.email;
              		User.findOne({'email':response.email},function (err,user) {
              			if(err){
              				next(err);
              			}
              			if(!user){
              				res.locals.userName= null;
              			}else{
              				res.locals.userName = user.name;
              			}
              		});
              	}else{
              		req.session['email'] = null;
              	}
              	//res.json(response);
              	res.json({name:res.locals.userName,email:response.email,status:response.status});
            }catch(e){
            	console.log(e);
            }

		});
	});
	vreq.on('error',function(error){
		console.log(error);
	});
	vreq.setHeader("Content-Type", "application/json");
    var data = JSON.stringify({
      assertion: req.body.assertion,
      audience: 'http://127.0.0.1:8080'
    });
    vreq.setHeader("Content-Length", data.length);
    vreq.end(data);
}
exports.logout = function(req,res){
	console.log('log out');
	if(req.session['email'] !== null && req.session['email'] !== undefined){
		req.session['email'] = null;
	}
	res.json({status:'okay'})
	res.redirect('index');
}
