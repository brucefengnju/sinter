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
	app.get('/index',site.index);
	app.post('/login',sign.login);
	app.post('/logout',sign.logout);
};