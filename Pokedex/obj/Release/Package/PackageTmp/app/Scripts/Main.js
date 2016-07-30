'use strict';

jQuery(".menu-button").click(function (e) {
    var $this = $(this);
    $this.parent().siblings().removeClass('navbar-active').end().addClass('navbar-active');
});

jQuery(".toggle").click(function (e) {
    jQuery(".toggle").toggle();
});

var MyLocalStorage =
{
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

    setObject: function (key,object) {
        var string = JSON.stringify(object);
        localStorage.setItem(key, string);
    }
}
