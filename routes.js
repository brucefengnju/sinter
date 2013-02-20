/**
 * sinter - routes.js
**/

/**
 * Modules dependencies.
**/
var site = require('./controllers/site');
var sign = require('./controllers/sign')
module.exports = function (app) {
	app.get('/', site.index);
	app.post('/login',sign.login);
};