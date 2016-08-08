App.factory("AppData", function ($resource) {
    return {
        getAll: function () {
            var data = MyLocalStorage.getObject("AllPokemon");
            if (data !== null) {
                return data;
            }
            else {
                var query = $resource('/../Pokemon/GetAll/').query();
                query.
                $promise.then(
                function (event) {
                    MyLocalStorage.setObject("AllPokemon", event);
                    
                },
                function (response) { console.log(response) });
                return query;
            }
        },
    }
});

App.factory("toogleUtil", function ($resource) {
    return {
        toogleMenu: function (option) {
            if (option === 'DESCRIPTION') {
                jQuery(".toggle-container").hide();
                jQuery(".glyphicon-chevron-left").show();
                jQuery("#navbar").collapse("hide");
                jQuery(".toggle-container button.navbar-toggle").show();
                jQuery(".toggle-container span.navbar-toggle").hide();
            }
            else {
                jQuery(".toggle-container").show();
                jQuery(".glyphicon-chevron-left").hide();
            }
        }
    }
});

App.factory("BattleBoxUtil", function ($resource) {
    return {

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

    }
});

App.factory("CaughtUtil", function ($resource) {
    return {
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
    }
});





