/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var config = require('../config');

var ArticleSchema = new Schema({
    article_id:{type:String,index:true},
    title:{type:String},
    content:{type:String},
    author:{ type: Schema.Types.ObjectId,ref:'users'},
    publishTime:{type:Date,default:Date.now},
    draft:{type:Boolean,default:false}
});
mongoose.model('Article', ArticleSchema);
