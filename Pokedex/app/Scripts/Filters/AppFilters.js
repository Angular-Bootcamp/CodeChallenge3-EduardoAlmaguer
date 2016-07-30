'use strict';
App.filter('inArray', function ($filter) {
    return function(list, arrayFilter, element,isEnable){
        if (arrayFilter) {
            if (isEnable) {
                return $filter("filter")(list, function (listItem) {
                    return arrayFilter.indexOf(listItem[element]) !== -1;
                });
            }
            else
            {
                return list;
            }
        }
    };
});