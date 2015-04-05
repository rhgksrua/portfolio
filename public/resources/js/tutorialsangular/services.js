'use stric';

var tutorialsServices = angular.module('tutorialsServices', ['ngResource']);

tutorialsServices.factory('Tutorials', ['$resource', function($resource) {
    return $resource('/tutorials/api/v1/tutorials/all', {}, {
        query: {method: 'GET', params: {}, isArray: true}
    });
}]);