/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var config = require('../config');

var UserSchema = new Schema({
	email:{type:String,unique:true,index:true},
	name:{type:String}
});
mongoose.model('User', UserSchema);
