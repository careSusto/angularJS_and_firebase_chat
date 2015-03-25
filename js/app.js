function createId(a){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < a; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
var chat = angular.module("cosmic_chat",["firebase"])
.controller("mainController",function($scope, $firebaseArray){

	$scope.newUser = {
		name: '',
		password: '',
		password2: '',
		passwordFail: false,
	};
	// Firebase messages

	var chat = new Firebase("https://<Your firebase>.firebaseio.com/chat");
	$scope.chat = $firebaseArray(chat);
	
	var messages = chat.child("messages");
	$scope.messages = $firebaseArray(messages);

	var users = chat.child("users");

	// Login 
	$scope.login = function(){
		users.on("value", function(a){
			a.forEach(function(data){
				var b = a.val()[data.key()]
				if(b.name == $scope.username && b.password == $scope.password){
					$scope.my_id = b.id;
					$scope.my_name = b.name;
					$scope.loged = true;
					scrollTo(0,document.getElementsByTagName("body")[0].scrollHeight);
				}
			});
		});

		$scope.password = "";
	}

	// Sing up window
	$scope.singup_window = function(){
		$('.singup_window')
		.modal({
			onApprove: function(){
				if($scope.newUser.name.trim() != '' && $scope.newUser.password.trim() != '' && $scope.newUser.password.trim().length >= 6){
					if($scope.newUser.password == $scope.newUser.password2){
						users.push({
							id: createId('10'),
							name: $scope.newUser.name,
							password: $scope.newUser.password,
						})
						$scope.newUser.passwordFail = false;
					}else{
						$scope.newUser.password = $scope.newUser.password2 = '';
						$scope.newUser.passwordFail = true;
					}
				}
			}
		})
		.modal('show');
	}

	// Send a Message
	$scope.sendMessage = function(){
		date = new Date();
		if($scope.message_text.trim().length > 0){
			$scope.messages.$add({
				author_id: $scope.my_id,
				author: $scope.my_name,
				date: date.getYear() + '/' + date.getMonth() + '/' + date.getDay(),
				content: $scope.message_text.trim(),
			});
			$scope.message_text = "";
		}
	}

	$scope.message_text = "";


	messages.on("child_added", function(){
		scrollTo(0,document.getElementsByTagName("body")[0].scrollHeight);
	})

	
	document.addEventListener("keydown",function(e){
		if(e.keyCode == 13 && document.getElementById("textEnter").value.trim() != "")
			$scope.sendMessage();
	});
});