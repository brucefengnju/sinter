/*!
 * sinter - sign index controller.
 * Copyright(c) 2013 brucefeng <brucechenofnju@gmail.com>
 * MIT Licensed
 */
var https = require('https');

exports.login = function (req,res,next) {
	var assertion = '';
	if(typeof req.query.assertion === 'undefined' || req.query.assertion === null ||req.query.assertion ===''){
		return res.redirect('index');
	}
	var options = {
		hostname:'https://verifier.login.persona.org',
		path:'/verify',
		method:'POST'
	};
	var proxyReq = https.request(options,function(proxyRes){
		proxyRes.setEncoding('utf8');
		var resdata = '';
		if(proxyRes.statusCode === 200){
			
			proxyRes.on('data',function(chunk){
				resdata += chunk;
			});
			proxyRes.on('end',function(){

				res.redirect("index");
			});	
		}

	});
	proxyReq.on('error',function(e){
		console.log('error with request: ' + e.message);

	});
	var data = {
		'assertion':assertion,
		'audience':'localhost:8080',
	};
	proxyReq.write( JSON.stringify(data));
	proxyReq.end();
}