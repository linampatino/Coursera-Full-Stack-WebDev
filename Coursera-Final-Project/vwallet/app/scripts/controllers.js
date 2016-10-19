'use strict';

angular.module('vwalletApp')

.controller('AccountController', ['$scope', 'accountFactory', function($scope, accountFactory) {

    $scope.saveAccount = function () {
        $scope.message;
        $scope.showMessage = false;
    };

}])

.controller('RegisterController', ['$scope', 'registerFactory', function($scope, registerFactory) {
  
    console.log('RegisterController');
    $scope.saveUser = function () {
        $scope.message;
        $scope.showMessage = false;
        console.log('RegisterController false');
    };

}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'authenticateFactory', function ($scope, ngDialog, $localStorage, authenticateFactory) {
    console.log('LoginController');


    $scope.user = $localStorage.getObject('userinfo', '{}');

    $scope.login = function () {
        if ($scope.rememberMe)
            $localStorage.storeObject('userinfo', $scope.user);

        authenticateFactory.login($scope.user);
    };

}]);

