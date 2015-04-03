var customInterpolate = angular.module('tutorialsApp', []);

customInterpolate.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

customInterpolate.controller('tutorialsController', ['$scope', 'Tutorials', function($scope, Tutorials) {

    $scope.tutorials = Tutorials.query();
}]);