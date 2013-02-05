var sinter = {};
sinter.login = function(assertion){
	$.ajax({
		type:'POST',
		url:'login',
		data:{'assertion':assertion},
		success:function(res,status,xhr){

		},
		error:function(xhr,status,err){

		}

	});
};

sinter.logout = function(){
	$.ajax({
		type:'POST',
		url:'logout',
		success:function(res,status,xhr){

		},
		error:function(xhr,status,err){

		}

	});
};
navigator.id.watch({
	onlogin:sinter.login,
	onlogout:sinter.logout
});
sinter.validate = function(){
	$article_title = $('#article_title');
	$article_content = $('#article_content');
	if($article_title && $article_content){
		var canpublish = true;
		if($.trim($article_title.val()) === ''){
			canpublish = false;
			$article_title.css('border-color','red');
		}else{
			console.log($article_title.val());
		}
		if($.trim($article_content.val()) === ''){
			canpublish = false;
		}else{
			console.log($article_content.val());
		}
		return canpublish;
	}
};
sinter.preview = function(){
		// do preview
};
sinter.publish = function(){
		// do publish

};
sinter.edit = function(){
	console.log('edit')
};
sinter.draft = function(){
	console.log('draft');
};
window.sinter = sinter;

$(function(){
	var $user_login = $('#user_login');
	var $user_logout = $('#user_logout');
	if($user_login){
		$user_login.click(function(){
			navigator.id.request();
		});
	}
	if($user_logout){
		$user_logout.click(function(){
			navigator.id.logout();
		});
	}
	var $preview = $('#preview');
	var $publish = $('#publish');
	var $save_draft = $('#save_draft');
	if($preview){
		$preview.click(function(){
			sinter.validate();
			sinter.preview();
		});
	}
	if($publish){
		$publish.click(function(){
			sinter.validate();
			sinter.publish();
		});
	}
	if($save_draft){
		$save_draft.click(function(){
			sinter.validate();
			sinter.draft();
		});
	}
});
