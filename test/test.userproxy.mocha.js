var should = require('should');
var dbhelper = require('./support/dbhelper');
var createUsers = require('./support/create_test_schema').createUsers;
var userproxy = require('../proxy/userproxy');
var User = require('../models').User;

describe('../proxy/userporxy',function(){
    before(function(done){
        var names = ['testuser1','testuser2','testuser3'];
        var count = 0;
        names.forEach(function(name){
            User.findOne({'name':name},function(err,user){
                if(!user){
                    user = new User({
                        'name':name,
                        'email':name + '@locahost.sinter.com'                   
                    });

                    user.save(function(){
                        count ++ ;
                        if(count === names.length){
                            done();
                        }
                    });
                }else{
                    count++;
                    if(count === names.length){
                        done();
                    }
                }
            });
        });
    });

    describe('getUserByName()',function(){
        it('should found 1 user',function(done){
            userproxy.getUserByName('testuser1',function(err,users){
                users.should.have.property('name','testuser1');
                users.should.have.property('email','testuser1@locahost.sinter.com');
            });
            done();
        });
    });

    describe('getUserByEmail()',function(){
        it('should found 1 user by email',function(done){
            userproxy.getUserByEmail('testuser1@locahost.sinter.com',function(err,users){
                users.should.have.property('name','testuser1');
                users.should.have.property('email','testuser1@locahost.sinter.com');
            });
            done();
        });
    });

    after(function(done){
        User.collection.drop();
        done();
    });


});