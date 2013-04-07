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
var userProxy = require('../proxy/userproxy');


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
                    userProxy.getUserByEmail(response.email,function(err,user){
                        if(err){
                            next(err);
                        }
                        if(!user || user.name){
                            return res.render('login.html',{'user':user});
                        }else{
                            return res.json({'needName':true});
                        }
                        
                    });
                }else{
                    req.session['email'] = null;
                    return res.render('login.html',{'user':null});
                }
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
exports.saveName = function(req,res,next){
    if(!req.body.name || !req.body.email){
        return res.json({'success':false});
    }
    var name = req.body.name;
    var email = req.body.email;
    userProxy.saveOrUpdateUser(name,email,function(err){
        if(err){
            res.json(500,{'error':err});
        }
        return res.json({'success':true,'email':email,'name':name});
    });
}
exports.logout = function(req,res){
    if(req.session['email'] !== null && req.session['email'] !== undefined){
        req.session['email'] = null;
    }
    return res.render('index.html',{'user':null});
}
