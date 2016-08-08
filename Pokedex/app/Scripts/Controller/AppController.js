'use strict';

App.controller("PokemonController",
    function AppController($scope, AppData, $resource, $location, $rootScope) {

        $scope.SortOrder = 'number';

        $scope.version = '1.44';

        $scope.init = function () {
            var version = $scope.version;
            var storedversion = localStorage.getItem("version");
            if (storedversion !== version) {
                localStorage.clear();
                localStorage.setItem("version", version);
            }
        }();

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
                MyLocalStorage.setArray("Caught", arr);
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
            },

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

        $scope.Pokemon = {
            
            getAll: function () {
                var data = MyLocalStorage.getObject("AllPokemon");
                if (data !== null) {
                    return data;
                }
                else {
                    AppData.getAll().
                    $promise.then(
                    function (event) {
                        MyLocalStorage.setObject("AllPokemon", event);
                        $scope.Pokemon.getAll = event;
                    },
                    function (response) { console.log(response) });
                }
                return data;
            }(),

            Current: function ()
            {
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

        function IsStored(key, number) {
            var arr = MyLocalStorage.getArray(key);

            var found = jQuery.inArray(number, arr);
            if (found >= 0)
                return true;
            else return false;
        }

        $scope.changeOption = function (option) {
            $rootScope.OldOption = $rootScope.Option;
            $rootScope.Option = option;
            if (option === 'DESCRIPTION') {
                jQuery(".toggle-container").toggle();
                jQuery(".glyphicon-chevron-left").toggle();
                jQuery("#navbar").collapse("hide");
                jQuery("button.toggle").show();
                jQuery("span.toggle").hide();
            }
            else {
                if ($(".glyphicon-chevron-left").is(":visible")) {
                    jQuery(".toggle-container").toggle();
                    jQuery(".glyphicon-chevron-left").toggle();
                }

            }
        };
        

    });

App.controller("MainController",
    function AppController($scope, $rootScope) {

        $rootScope.Option = '';

        $scope.Option = function ()
        {
            return $rootScope.Option;
        };

        $rootScope.OldOption;

        $scope.changeOption = function (option) {
            $rootScope.OldOption = $rootScope.Option;
            $rootScope.Option = option;
            if (option === 'DESCRIPTION') {
                jQuery(".toggle-container").toggle();
                jQuery(".glyphicon-chevron-left").toggle();
                jQuery("#navbar").collapse("hide");
                jQuery("button.toggle").show();
                jQuery("span.toggle").hide();
            }
            else
            {
                if ($(".glyphicon-chevron-left").is(":visible"))
                {
                    jQuery(".toggle-container").toggle();
                    jQuery(".glyphicon-chevron-left").toggle();
                }
                
            }
            
        };

        $scope.goBack=function()
        {
            $scope.changeOption($scope.OldOption);
            window.history.back();
        };
    });