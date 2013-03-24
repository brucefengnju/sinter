var mongoose = require('mongoose');
var config = require('../../config').config;

exports.connect = function(callback) { 
    mongoose.connect(config.db, callback); 
};
exports.close = function(callback) { 
    mongoose.connection.close(callback); 
};
exports.getConnection = function() { 
    return mongoose.connection; 
};
exports.initdb = function(callback) { 
    
    var conn = mongoose.connection;
    // drop database 
    conn.db.dropDatabase(function(err){ 
        if(err) { 
            return callback(err); 
        }
    }); 
};
