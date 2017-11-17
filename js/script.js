var app = angular.module('myApp', ['ngRoute']);
// routing for future needs if we want to expend the application
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'

        })
        .otherwise({redirectTo: '/'});
}]);
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
// create the controller and inject Angular's $scope for future needs if we want diffrent views like movies instead of images.
app.directive('carousel', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            links: '='
        },
        templateUrl: 'pages/carousel.html',
        link: function (scope, element) {
        }
    }
});
