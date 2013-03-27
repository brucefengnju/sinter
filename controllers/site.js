/*!
 * sinter - site index controller.
 * Copyright(c) 2013 brucefeng <brucechenofnju@gmail.com>
 * MIT Licensed
 */

var config = require('../config').config;
var userProxy = require('../proxy/userproxy');
var articleProxy = require('../proxy/articleproxy');

exports.index = function (req, res, next) {
    res.render('index');
};
exports.publishArticle = function(req,res,next){
    if(!req.body.title || !req.body.content){
        return res.json({'success':false});
    }
    if(!req.session['email']){
        return res.json({'success':false});
    }
    var email = req.session['email'];
    var title = req.body.title;
    var content = req.body.content;

    userProxy.getUserByEmail(email,function(err,user){
        if(err){
            return res.json(500,{'error':err});
        }
        if(user){
            articleProxy.saveArticle(title,content,user,false,function(err){
                if(err){
                    return res.json(500,{'error':err});         
                }
                return res.json({'title':title,'author':user});
            }); 
        }
        
    });
}

exports.showArticle = function(req,res,next){
    if(!req.body.title || req.body.author){
        return null;
    }
    var author = req.body.author;
    var title = req.body.title;
    articleProxy.getArticle(author,title,function(err,article){
        if(err){
            return res.json(500,{'error':err});
        }
        res.render('article.html',{article:article});
    })


}