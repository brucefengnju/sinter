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
	app.post('/saveName',sign.saveName);

	app.get('/showArticle/p/:id',site.showArticle);
	app.get('/articleList/u/:authorId',site.articleList);
	app.post('/publishArticle',site.publishArticle);
};