<!DOCTYPE html>
<html lang="en" ng-app="cosmic_chat">
<head>
	<meta charset="UTF-8">
	<title>Angular + firebase Chat</title>
	<link rel="stylesheet" href="css/SemanticUI/semantic.min.css">
	<script src="js/angular.min.js"></script>
	<script src="js/firebase.js"></script>
	<script src="js/angularfire.min.js"></script>
	
	<script src="js/jquery/jquery-2.1.3.min.js"></script>
	<script src="js/semantic.min.js"></script>
	
	<script src="js/app.js"></script>
	<style>
		.container{ overflow: hidden; margin-bottom: 30px; }
		.scrollable{overflow: auto !important; padding: 10px;}
		.card .header{ padding: 5px; }
		.card{ padding: 10px; }
		.messageBox{ padding: 0 0 15px 0 !important; background: #fff; border-top: 1px solid #ccc; position: fixed; left: 1.1%; bottom: 0px; width: 100%; }
		.messageBox i{ cursor: pointer !important; }
		.right{ float: right; }
	</style>
</head>
<body ng-controller="mainController">
	<div class="singup_window ui modal">
		<i class="close icon"></i>
		<div class="header">
			Create an account
		</div>
		<div class="content">
			<div class="ui form">
				<div class="field">
						<label>Username:</label>
					<input type="text" placeholder="Name" ng-model="newUser.name">
				</div>
				<div class="two fields">
					<div class="field">
						<label>Password:</label>
						<input type="password" placeholder="Password" ng-model="newUser.password">
					</div>
					<div class="field">
						<label>Repeat password:</label>
						<input type="password" placeholder="Password again" ng-model="newUser.password2">
					</div>
				</div>
			</div>
		</div>
		<div class="actions">
			<div class="ui black button">Cancel</div>
			<div class="ui positive right labeled icon button">
				Create
				<i class="checkmark icon"></i>
			</div>
		</div>
	</div>
	<div class="login_container" ng-show="!loged">
		<div class="ui centered grid">
			<div class="ten wide column"></div>
			<div class="ten wide column">
				<div class="ui form">
					<div class="field">
						<label>Username</label>
						<input type="text" placeholder="Username" ng-model="username">
					</div>
					<div class="field">
						<label>Password</label>
						<input type="password" placeholder="Password" ng-model="password">
					</div>
					<div class="two fields">
						<div class="field">
							<div class="ui fluid positive button" ng-click="login()">Login</div>
						</div>
						<div class="field">
							<div class="ui fluid primary button" ng-click="singup_window()">Create an account</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container" ng-show="loged">
		<div class="ui centered grid">
			<div class="fourteen wide column"></div>
			<div class="twelve wide column">
				<div class="scrollable" ng-repeat="message in messages">
					<div ng-class="message.author_id == my_id?'right ui cards':'ui cards'">
						<div class="card">
							<div class="header">{{message.author}}</div>
							<div class="card">
								<deiv class="meta">{{message.date}}</deiv>
								<div class="description">
									{{message.content}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="fourteen wide column"></div>
		</div>
		<div class="messageBox ui grid">
			<div class="sixteen wide centered column">
				<div class="ui form">
					<div class="ui icon input">
						<input id="textEnter" type="text" placeholder="Escribe tu mensaje..." ng-model="message_text">
						<i class="icon send" ng-click="sendMessage()"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>