var should = require('should');
var articleproxy = require('../proxy/articleproxy');
var Article = require('../models').Article;
var userproxy = require('../proxy/userproxy');
var User = require('../models').User;

describe('../proxy/articleproxy',function(){
    describe('saveArticle()',function(){
        it('should save article without error',function(done){
            userproxy.getUserByEmail('testuser@localhost.com',function(err,user){
                if(user === null){
                    user = new User({'email':'testuser@localhost.com','name':'testuser'});
                    user.save(function(err){
                        if(err){
                            done(err);
                        }
                        articleproxy.saveArticle('testtitle','testcontent',user,true,function(err){
                            if(err){
                                done(err);
                            }
                        });
                        done();                
                    });
                }else{
                    articleproxy.saveArticle('testtitle','testcontent',user,true,function(err){
                            if(err){
                                done(err);
                            }
                        });
                    done();
                }

            });
            

        });
    });
    describe('getArticlesByTitle()',function(){
        it('should get one article',function(done){
            articleproxy.getArticlesByTitle('testtitle',function(err,articles){
                if(err){
                    return done(err);
                }
                articles.should.not.be.null;
                articles.should.have.length(1);
                done();
            });
        });

    });

    describe('getArticlesByAuthor()',function(){
        it('should get one article',function(done){
            userproxy.getUserByEmail('testuser@localhost.com',function(err,user){
                if(err){
                    return done(err);
                }
                if(user !== null){
                    articleproxy.getArticlesByAuthor(user,function(err,articles){
                        if(err){
                            return done(err);
                        }
                        articles.should.not.be.null;
                        articles.should.have.length(1);
                        done();
                    });
                }
            });
        });
    });

    describe('updateArticle()',function(){
        it('should update success',function(done){
            articleproxy.getArticlesByTitle('testtitle',function(err,articles){
                if(err){
                    done(err);
                }
                articles.should.not.be.null;
                articles.should.have.length(1);
                var article = articles[0];
                article.title = "updatetitle";
                article.content = 'update content';
                articleproxy.updateArticle(article)
            })
        })
    });
});
    
