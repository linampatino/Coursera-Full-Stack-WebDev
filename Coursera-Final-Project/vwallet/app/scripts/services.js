'use strict';

angular.module('vwalletApp')
    .constant("baseURL", "https://localhost:3443/")

    .factory('accountFactory', function () {
        var account = {
            key: '01',
            userId: '41960449',
            name: 'Cash',
            isShared: 'false',
            currentBalance: '100',
            accountType: 'Cash',
            userShare: ''
        };

        var accountFac = {};

        accountFac.getAccounts = function () {

        };

        accountFac.getAccount = function () {

        }

        return accountFac;

    })

.factory('registerFactory', ['$resource', 'baseURL', function ($resource, baseURL ) {
    var registerFac = {};
    return registerFac;
}])

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])

.factory('authenticateFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function ($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog) {

    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;

    authFac.login = function (user) {

        console.log('authServ');
        console.log(user);
        $resource(baseURL + "users/login")
        .save(user,
           function (response) {
               console.log('authServ success');
               //storeUserCredentials({ username: user.username, token: response.token });
               //$rootScope.$broadcast('login:Successful');
           },
           function (response) {
               isAuthenticated = false;

               var message = 'Error en el login';

               ngDialog.openConfirm({ template: message, plain: 'true' });
           }

        );

    };


    return authFac;
}])



