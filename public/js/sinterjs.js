(function (window,undefined) {
	var user = new Object();
	user.login = function () {
		navigator.id.request();		
	};
	user.logout = function () {
		navigator.id.logout(); 
	};
	window.user = user;
})(window);
$(function () {
	$("#user_login").click(function () {
		user.login();
	});
	$("#user_logout").click(function (evt) {
		user.logout();
	})
});