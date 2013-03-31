var mongoose = require('mongoose');
var config = require('../../config').config;

exports.connect = function() { 
    mongoose.connect(config.db, function (err) {
    if (err) {
            mongoose.connection.close();
            console.error('connect to %s error: ', config.db, err.message);
            process.exit(1);
        }
    });
   
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
