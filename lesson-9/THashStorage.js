'use strict';

//(function () {
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
//})();
//Я пытался сделать её не доступной, но из-за этого строка
//var DrinkStorage = new THashStorage(); - она не находит переменную, по понятным причинам
//Я не поинмаю как можно сделать по другому
