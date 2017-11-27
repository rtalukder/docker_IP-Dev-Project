// Raquib Talukder
// IP Development Project
// index.js

angular.module('myApp', [
  'ngRoute',
  'home',
  'signin',
  'userHome',
  'addItem',
  'myAppService'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

