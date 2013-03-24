var User = require('../../models').User;

exports.createUsers = function (callback) {
    var names = ['testuser1','testuser2','testuser3'];
    var count = 0;
    names.forEach(function(name){
        User.findOne({'name':name},function(err,user){
            if(!user){
                user = new User({
                    'name':name,
                    'email':name + '@locahost.sinter.com'                   
                });

                User.save(function(){
                    count ++ ;
                    if(count === names.length){
                        callback();
                    }
                });
            }else{
                count++;
                if(count === names.length){
                    callback();
                }
            }
        });
    });
}