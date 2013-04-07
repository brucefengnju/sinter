var sinter = {};
sinter.login = function(assertion){
    $.ajax({
        type:'POST',
        url:'/login',
        data:{assertion:assertion},
        success:function(res,status,xhr){
            if(res.needName){
                var name = '';
                while(!name){
                    name=prompt('please input a name');
                }
                var email = res.email;
                sinter.saveName(name,email);
            }else{
                $("#UserInfoDiv").html(res);
            }
        }
    });
};
sinter.saveName = function(name,email){
    var url = 'saveName';
    var data ={'name':name,'email':email};
    var saveSuccess;
    $.ajax({
        url:url,
        data:data,
        type:'POST',
        success:function(res,status){
            $("#user_login").hide();
            $('#user_logout').show();
            $("#userName").text(res.name);
        }
    }).complete(function(){
        return saveSuccess; 
    });
}
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
sinter.preview = function(event){
    $("#PriviewTitle").text($("#content_title").val());
    $("#PreviewContent").text($("#content").val());
    
    $("#ArticleDiv").hide();

    $("#ArticlePreviewDiv").removeClass('hide');
    $("#ArticlePreviewDiv").addClass('content');
    event.preventDefault();
        
};
sinter.edit = function(){
    console.log('edit')
};
sinter.draft = function(){
    console.log('draft');
};
sinter.cancel = function(event){
    $("#ArticleDiv").show();
    $("#ArticlePreviewDiv").removeClass("content");
    $("#ArticlePreviewDiv").addClass("hide");
    event.preventDefault();
}
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
    navigator.id.watch({
        onlogin:sinter.login,
        onlogout:sinter.logout
    });
});
