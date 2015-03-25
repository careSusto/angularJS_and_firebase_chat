function createId(a){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < a; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
var chat = angular.module("cosmic_chat",["firebase"])
.controller("mainController",function($scope, $firebaseArray){

	$scope.login = function(){
		$scope.my_name = $scope.username;
		$scope.loged = true;
	}
	if(localStorage.demoCosmicChat != undefined && localStorage.demoCosmicChat.user_id != undefined){
		$scope.my_name = localStorage.demoCosmicChat.username;
		$scope.my_id = localStorage.demoCosmicChat.user_id;
		$scope.loged = true;
	}else{
		$scope.loged = false;
		$scope.my_id = createId(5);
	}

	$scope.message_text = "";

	var messages = new Firebase("https://democosmicchat.firebaseio.com/messages");
	var users = new Firebase("https://democosmicchat.firebaseio.com/users");
	
	$scope.messages = $firebaseArray(messages);
	$scope.users = $firebaseArray(users);

	messages.on("child_added", function(){
		scrollTo(0,document.getElementsByTagName("body")[0].scrollHeight + 100);
	});

	$scope.sendMessage = function(){
		date = new Date();
		$scope.messages.$add({
			author_id: $scope.my_id,
			author: $scope.my_name,
			date: date.getYear() + '/' + date.getMonth() + '/' + date.getDay(),
			content: $scope.message_text,
		});
		$scope.message_text = "";
	}
	document.addEventListener("keydown",function(e){
		if(e.keyCode == 13 && document.getElementById("textEnter").value.trim() != "")
			$scope.sendMessage();
	});
});

scrollTo(0,document.getElementsByTagName("body")[0].scrollHeight)