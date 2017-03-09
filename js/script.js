var token;
var products = [];
var productsModel = {};
var cartModel = {};

function getCookie(name) {
	var value = ";" + document.cookie;
	var parts = value.split(";" + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

function deleteCookie(name) {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function updateNavgationView(){
	if (token) {
		$("#loginNav").hide();
		$("#logoutNav").show();
	} if (!token) {
		$("#loginNav").show();
		$("#logoutNav").hide();
	} else {
		$("#loginNav").show();
		$("#logoutNav").show();
	}
}



$(document).ready(function(){

	token = getCookie('x-access-token');

	updateNavgationView();


	$('#logoutNav').click(function(event){
		event.preventDefault();
		deleteCookie('x-access-token');
		token = null;
		window.location.href = "./index.html";
		alert('logout success!');
	});

	$("#loginBtn").click(function(event){
		event.preventDefault();
		var username = $("#username").val();
		var password = $("#password").val();
		if (username && password){
			$.post("http://open-commerce.herokuapp.com/api/login",
			{
				username: username,
				password: password
			},
			function(res){
				if (res.success){
					var cookie = 'x-access-token=' + res.token;
					document.cookie = cookie;
					window.location.href = "./index.html";
					alert('login seccess!')
				} else {
					alert(res.message);
				}
			});
		} else {
			alert('please provide a username and password for login');
		}
	});

	$("#signupBtn").click(function(event){
		event.preventDefault();
		var username = $("#username").val();
		var password = $("#password").val();
		if (username && password) {
			$.post("http://open-commerce.herokuapp.com/api/signup",
			{
				username: username,
				password: password
			},
			function(res) {
				if(res.success){
				alert('signup success!');
			} else {
				alert(res.message);
			}
		});
	} else {
		alert('please provide a username and password for signup');
	}
	});
});