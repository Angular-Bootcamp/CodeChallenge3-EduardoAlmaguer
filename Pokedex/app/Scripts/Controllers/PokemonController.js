'use strict';

App.controller("PokemonController",
    function AppController($scope, $resource, $location,AppData, toogleUtil) {

        $scope.SortOrder = 'number';

        $scope.version = '1.45';

        $scope.Reverse = false;

        $scope.SortBy = function () {
            $scope.Reverse = $scope.Reverse ? false : true;
            $scope.SortOrder = $scope.Reverse ? '-number' : 'number';
        };

        $scope.Caught = {
            IsEnabled: function () {
                return $location.search().Caught === '1' ? true : false;
            }(),

            getAll: function () {
                return MyLocalStorage.getArray("Caught");
            },

        };

        $scope.BattleBox = {
            IsEnabled: function () {
                return $location.search().BattleBox === '1' ? true : false;
            }(),

            getAll: function () {
                return MyLocalStorage.getArray("BattleBox");
            },

        };

        $scope.Pokemon = {

            getAll: AppData.getAll(),

            Current: function () {
                var val = $location.search().Pokemon;

                if (val === undefined) return;
                var number = parseInt($location.search().Pokemon);
                var pokemon2 = {};
                var arr = MyLocalStorage.getArray("AllPokemon");
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i]["number"] === number) {
                        pokemon2 = arr[i];
                        break;
                    }

                }
                pokemon2.EvolutionChain = function () {
                    var chain = pokemon2.evolutionchain;
                    if (chain === undefined || chain === null) return null;
                    var pokemons = [];
                    for (var i = 0; i < chain.length; i++) {
                        var pokemon = {};

                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j]["number"] === chain[i]) {
                                pokemon = arr[j];
                                break;
                            }

                        }
                        pokemons.push(pokemon);
                    }

                    return pokemons;
                }();
                return pokemon2;
            }(),
        };

        $scope.init = function () {

            var version = $scope.version;
            var storedversion = localStorage.getItem("version");
            if (storedversion !== version) {
                localStorage.clear();
                localStorage.setItem("version", version);
            }
        }();

    });
