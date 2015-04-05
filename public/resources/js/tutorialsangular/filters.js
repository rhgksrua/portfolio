'use strict'

angular.module('demoFilters', []).filter('demo', function() {
    return function(input) {
        return input ? 'yes' : 'no';
    };
});

angular.module('diffFilters', []).filter('diff', function() {
    var that = this;
    this.difficulty = {
        "0": "Easy",
        "1": "Intermediate",
        "2": "Advanced"
    };
    return function(input) {
        return that.difficulty[input];
    };
});