'use strict';


var MyLocalStorage = {

    getArray: function (key) {
        var str = localStorage.getItem(key) !== null ? localStorage.getItem(key) : "[]";
        var JSon = JSON.parse(str);

        var arr = [];

        for (var x in JSon) {
            arr.push(JSon[x]);
        }
        return arr;
    },

    setArray: function (key, arr) {
        localStorage.setItem(key, JSON.stringify(arr));
    },

    getObject: function (key) {
        var json = localStorage.getItem(key);
        return JSON.parse(json);
    },

    setObject: function (key, object) {
        var string = JSON.stringify(object);
        localStorage.setItem(key, string);
    }
}

function IsStored(key, number) {
    var arr = MyLocalStorage.getArray(key);

    var found = jQuery.inArray(number, arr);
    if (found >= 0)
        return true;
    else return false;
}