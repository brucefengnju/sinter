
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
    Article.find({'title':title}).populate('author').exec(callback);
}
exports.getArticleById = function(id,callback){
    if(!id || !id.length){
        return callback(null,[]);
    }
    Article.findOne({'_id':id}).populate('author').exec(callback);
}
exports.getArticlesByAuthor = function(author,callback){
    if(!author){
        return callback(null,[]);
    }
    Article.find({'author':author}).populate('author').exec(callback);
}
exports.getArticle = function(author,title,callback){
    if(!author || !title){
        return callback(null,[]);
    }
    Article.findOne({'author':author,'title':title}).populate('author').exec(callback);
}
exports.updateArticle = function(article,callback){
    if(article === null){
        return callback(null,[]);
    }

    Article.update({'article_id':article.article_id},{$set:{'title':article.title,'content':article.content,
                                                    'draft':article.draft,publishTime:new Date()}},callback);
}
