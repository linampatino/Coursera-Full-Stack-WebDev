'use strict';

angular.module('confusionApp',['ui.router','ngResource'])

.config( function($stateProvider, $urlRouterProvider){

	$stateProvider
	
	// route for the home page
	.state('app', {
		url:'/',
		views: {
			'header':{
				templateUrl : 'views/header.html',
			},
			'content':{
				templateUrl : 'views/home.html',
				controller : 'IndexController'
			},
			'footer':{
				templateUrl : 'views/footer.html'
			}
		}
	})
	
	//route for the aboutus page
	.state('app.aboutus',{
		url:'aboutus',
		views: {
			'content@':{
				templateUrl: 'views/aboutus.html',
				controller: 'AboutController'
			}
		}
	
	})
	
	// route for the contactus page
	.state('app.contactus',{
		url : 'contactus',
		views: {
			'content@':{
				templateUrl: 'views/contactus.html',
				controller: 'ContactController'
			}
		}
	
	})
	
	// route fro the menu page
	.state('app.menu',{
		url: 'menu',
		views: {
			'content@': {
				templateUrl : 'views/menu.html',
				controller: 'MenuController'
			}
		}
	})
	
	// route for the dishdetail page
	.state('app.dishdetails', {
		url: 'menu/:id',
		views: {
			'content@':{
				templateUrl: 'views/dishdetail.html',
				controller: 'DishDetailController'
			}
		}
	});
	
	$urlRouterProvider.otherwise('/');
	
});


/*
.config(function($routeProvider){
	$routeProvider
	
	//route for the contact page
	.when('/contactus',{
		templateUrl: 'contactus.html',
		controller : 'ContactController'
	})
	
	//route for the menu page
	.when('/menu',{ 
		templateUrl: 'menu.html',
		controller : 'MenuController'
	})
	
	//route for dish detail page 
	.when('/menu/:id',{
		templateUrl: 'dishdetail.html',
		controller : 'DishDetailController'
	})
	
	.otherwise('/contactus');
})*/