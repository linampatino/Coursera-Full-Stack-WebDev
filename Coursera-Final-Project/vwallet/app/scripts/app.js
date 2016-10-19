'use strict';

angular.module('vwalletApp', ['ui.router', 'ngResource', 'ngDialog'])

.config( function($stateProvider, $urlRouterProvider){

    $stateProvider

    // route for the home page
    .state('app', {
        url: '/',
        views: {
            'sidebar': {
                templateUrl: 'views/sidebar.html',
            },

            'navBar': {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            },

            'content': {
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            }
        }
    })

    //route for the account page
    .state('app.account', {
        url: 'account',
        views: {
            'navBar@': {
                templateUrl: 'views/navBarSettings.html'
            },
            'content@': {
                templateUrl: 'views/account.html',
                controller: 'AccountController'
            }
        }
	
    })

    //route for the login page
    .state('app.login', {
        url: 'account',
        views: {
            'navBar@': {
                templateUrl: 'views/navBar.html'
            },
            'content@': {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            }
        }

    })

    $urlRouterProvider.otherwise('/');

});

