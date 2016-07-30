'use strict';
var App = angular.module("App",['ngResource','ngRoute'])
.config(function ($routeProvider)
{
    $routeProvider.when('/Pokemon',
        {
            templateUrl: 'templates/Pokemon.html',
            controller: 'PokemonController'
        })
        .when('/Description',
        {
            templateUrl: 'templates/Description.html',
            controller: 'PokemonController'
        })
});
