var Article = require('../models').Article;

exports.saveArticle = function(title,content,author,draft,callback){
    var article = new Article({'title':title,'content':content,'author':author,'draft':draft});
    article.article_id = article._id;
    article.save(callback);
}

exports.getArticlesByTitle = function(title,callback){
    if(!title || title.length ===0){
        return callback(null,[]);
    }
    Article.find({'title':title},callback);
}

exports.getArticlesByAuthor = function(author,callback){
    if(!author){
        return callback(null,[]);
    }
    Article.find({'author':author},callback);
}

exports.updateArticle = function(article,callback){
    if(article === null){
        return callback(null,[]);
    }

    Article.update({'article_id':article.article_id},{$set:{'title':article.title,'content':article.content,
                                                    'draft':article.draft,publishTime:new Date()}},callback);
}
