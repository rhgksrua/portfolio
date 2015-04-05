'use strict'

var tutorialsApp = angular.module('tutorialsApp', [
    'tutorialsServices',
    'customInterpolateController',
    'demoFilters',
    'diffFilters'
    
]);

tutorialsApp.controller('tutorialsController', ['$scope', 'Tutorials', function($scope, Tutorials) {
    $scope.name = "bob";
    $scope.data = Tutorials.get({id: 123}, function(data) {
            

    });
}]);