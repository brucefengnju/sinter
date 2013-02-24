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
	author:{type:String,ref:'User'}
});
mongoose.model('Article', UserSchema);
