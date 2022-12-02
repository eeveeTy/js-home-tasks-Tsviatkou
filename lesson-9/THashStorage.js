'use strict';

(function () {

    var addCoctail = document.getElementById('add-coctail');
    var deleteCoctail = document.getElementById('delete-coctail');
    var recipeCoctail = document.getElementById('recipe-coctail');
    var allCoctail = document.getElementById('all-coctails');

    function THashStorage() {
        this.store = {};
    }

    THashStorage.prototype.addValue = function (key, value) {
        this.store[key] = value;
    }

    THashStorage.prototype.getValue = function (key) {
        return this.store[key];
    }

    THashStorage.prototype.deleteValue = function (key) {
        if (!(key in this.store)) {
            return false;
        }
        return delete this.store[key];
    }

    THashStorage.prototype.getKeys = function () {
        return Object.keys(this.store);
    }
})();