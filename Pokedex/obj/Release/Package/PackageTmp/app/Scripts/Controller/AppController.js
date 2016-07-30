'use strict';

App.controller("PokemonController",
    function AppController($scope, AppData, $resource, $location) {

        $scope.SortOrder = 'number';

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
            }(),

            AddOrRemove: function (number) {
                var arr = MyLocalStorage.getArray("Caught");
                var found = jQuery.inArray(number, arr);
                if (found >= 0) {
                    if (IsStored("BattleBox", number)) { alert("You cannot remove this pokemon, it is your BattleBox"); return; }
                    arr.splice(found, 1);
                }
                else {
                    arr.push(number);
                }
                MyLocalStorage.setArray("Caught", arr)
            },

            getImage: function (number) {

                if (IsStored("Caught", number)) {
                    return "Images/empty-plate-red.png";
                }
                else {
                    return "Images/empty-plate.png";
                }
            }
        };

        $scope.BattleBox = {
            IsEnabled: function () {
                return $location.search().BattleBox === '1' ? true : false;
            }(),

            getAll: function () {
                return MyLocalStorage.getArray("BattleBox");
            }(),

            AddOrRemove: function (number) {
                var arr = MyLocalStorage.getArray("BattleBox");
                var found = jQuery.inArray(number, arr);
                if (found >= 0) {
                    arr.splice(found, 1);
                }
                else {
                    if (arr.length >= 6) { alert("You can not have more than 6 pokemon in the battle box"); return; }
                    if (!IsStored("Caught", number)) { alert("You cannot add this pokemon to your battle box, you need to caught it first"); return; }
                    arr.push(number);
                }
                MyLocalStorage.setArray("BattleBox", arr)
            },

            getImage: function (number) {

                if (IsStored("BattleBox", number)) {
                    return "Images/star-yellow.png";
                }
                else {
                    return "Images/star.png";
                }
            }

        };

        $scope.Pokemon = function () {

            var Pokemon = {};

            Pokemon.getAll = function () {
                var data = MyLocalStorage.getObject("AllPokemon");
                if (data !== null) {
                    return data;
                }
                else {
                    AppData.getAll().
                    $promise.then(
                    function (event) {
                        MyLocalStorage.setObject("AllPokemon", event);
                        getAll = event;
                    },
                    function (response) { console.log(response) });
                }
                return data;
            }();

            Pokemon.Current = Get(parseInt($location.search().Pokemon));

            Pokemon.EvolutionChain = function (arr) {
                var pokemons = [];
                for (var i = 0; i < arr.length; i++)
                    pokemons.push(Get(arr[i]));
                return pokemons;
            };;

            function Get(number) {
                var arr = MyLocalStorage.getArray("AllPokemon");

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i]["number"] === number)
                        return arr[i];
                }
                return null;
            }

            return Pokemon;
        }();



        function IsStored(key, number) {
            var arr = MyLocalStorage.getArray(key);

            var found = jQuery.inArray(number, arr);
            if (found >= 0)
                return true;
            else return false;
        }
    });

App.controller("MainController",
    function AppController($scope) {

        $scope.Option = '';

        $scope.changeOption = function (Option) {
            $scope.Option = Option;
        };
    });