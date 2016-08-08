'use strict';

App.directive('pokemonContainer', function (BattleBoxUtil, CaughtUtil, toogleUtil) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../../app/templates/Directive/pokemonContainer.html',
        scope:
        {
            showem: '=',
            pokemon: '='
        },
        controller: function ($scope)
        {
            $scope.BattleBoxImage = function (pokemon)
            {
                return BattleBoxUtil.getImage(pokemon.number);
            };

            $scope.BattleBoxAddOrRemove = function (pokemon) {
                return BattleBoxUtil.AddOrRemove(pokemon.number);
            };

            $scope.CaughtImage = function (pokemon) {
                return CaughtUtil.getImage(pokemon.number);
            };

            $scope.CaughAddOrRemove = function (pokemon) {
                return CaughtUtil.AddOrRemove(pokemon.number);
            };

            $scope.changeOption = function (option) {
                toogleUtil.toogleMenu(option);
            };
            
        }

    };
});

App.directive('menuButton', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.click(function () {
                element.parent().siblings().removeClass('navbar-active').end().addClass('navbar-active');
            });


        }
    };
});

App.directive('toggle', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.click(function () {
                element.toggle();
            });
        }
    };
});

App.directive('goBack', function (toogleUtil) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.click(function () {
                window.history.back();
                element.toggle();
                toogleUtil.toogleMenu('');
            });
        }
    };
});

App.directive('title', function () {
    return {
        restrict: 'A',
        controller: function ($scope, $location) {
            $scope.title = '';

            $scope.$watch(function () {
                return $location.search()
            },
            function (params) {
                $scope.title = params.title;
            });
        },
        link: function (scope, element, attr) {
            scope.$watch('title', function (newvalue) {
                element.text(scope.title);
            });



        }
    };
});


