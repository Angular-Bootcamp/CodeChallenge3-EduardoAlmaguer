App.factory("AppData", function ($resource) {
    return {
        getAll : function() {
            return $resource('/../Pokemon/GetAll/').query();
        },
    }
});