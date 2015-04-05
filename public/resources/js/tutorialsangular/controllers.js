var customInterpolate = angular.module('customInterpolateController', []);

customInterpolate.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

