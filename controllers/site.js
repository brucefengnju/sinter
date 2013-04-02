/*!
 * sinter - site index controller.
 * Copyright(c) 2013 brucefeng <brucechenofnju@gmail.com>
 * MIT Licensed
 */

var config = require('../config').config;
var userProxy = require('../proxy/userproxy');
var articleProxy = require('../proxy/articleproxy');

exports.index = function (req, res, next) {
    if(req.session.email){
        userProxy.getUserByEmail(req.session.email,function(err,user){
            if(err){
                return res.json(500,{'error':err});
            }
            res.render('index.html',{'user':user});
        });

    }else{
        return res.render('index.html',{'user':null});
    }
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
       return res.render('article.html',{'article':article});
    });

}

exports.articleList = function(req,res,next){
    if(!req.params.authorId){
        return res.json(500,{'success':false});
    }
    articleProxy.getArticlesByAuthor(req.params.authorId,function(err,articles){
        if(err){
            return res.json(500,{'error':err});
        }
        return res.render('articleList.html',{'articles':articles});
    });
}