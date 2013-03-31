var mongoose = require('mongoose');
var config = require('../config').config;

// models
require('./user');
require('./article');
mongoose.connect(config.db, function (err) {
if (err) {
        mongoose.connection.close();
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});
exports.User = mongoose.model('User');
exports.Article = mongoose.model('Article');