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
    console.log(req.body.title);
    console.log(req.body.content);
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
            console.log(user);
            articleProxy.saveArticle(title,content,user,false,function(err){
                if(err){
                    return res.json(500,{'error':err});         
                }
                articleProxy.getArticle(user,title,function(err,article){
                    if(err){
                        return res.json(500,{'error':err});                
                    }
                    return res.redirect('/showArticle/p/' + article.article_id);
                })
            });

        }
        
    });
}

exports.showArticle = function(req,res,next){
    if(!req.params.id){
        return res.json(500,{'success':false});
    }

    articleProxy.getArticleById(req.params.id,function(err,article){
        if(err || !article){
            return res.json(500,{'error':err});
        }
        console.log(article);
       return res.render('article.html',{'article':article});
    });

}