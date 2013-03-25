var User = require('../models').User;

exports.getUserByEmail = function(email,callback) {
    if(email.length===0){
        return callback(null,[]);
    }
    User.findOne({'email':email},callback);
}

exports.getUsersByName = function(name,callback){
    if(name.length === 0){
        return callback(null,[]);
    }
    User.findOne({'name':name},callback);
}

exports.saveOrUpdateUser = function(name,email,callback){
    if(name.length === 0 || email.length === 0){
        return callback(null,[]);
    }

    exports.getUserByEmail(email,function(err,user){
        if(user === null){
            user = new User({'name':name,'email':email});
            user.save(callback);
        }else{
            if(user.name !== name){
                User.update({'email':email},{$set:{'name':name}},callback);
            }
        }
    });
}