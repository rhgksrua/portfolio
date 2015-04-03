var customInterpolate = angular.module('tutorialsApp', []);
    customInterpolate.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });
    customInterpolate.controller('TutorialsController', function() {
});