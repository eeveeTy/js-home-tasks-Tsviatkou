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

    var DrinkStorage = new THashStorage();

    addCoctail.onclick = function () { // добовляем коктель
        var name = window.prompt('Введите название коктеля:');
        var alcohol = window.prompt('Напиток алкогольный?');
        var recipe = window.prompt('Введите рецепт:');

        DrinkStorage.addValue(name, [name, alcohol, recipe]);
        console.log('Коктель добавлен:', DrinkStorage.getValue(name));
    }

    deleteCoctail.onclick = function () { // удаляем коктель
        var name = window.prompt('Введите название напитка, который хотите удалить:');
        console.log('Коктель ' + name + ' удалён.');
        console.log(DrinkStorage.deleteValue(name));
    }

    recipeCoctail.onclick = function () { // выводим рецепт выбраного коктеля
        var name = window.prompt('Введи название напитка, рецепт которого хотите узнать:');
        console.log('Рецепт напитка ' + name + ':', DrinkStorage.getValue(name));
    }
    // Тут затуп, я не понимаю как вывести "Рецепт" нужного выбраного кокнетля
    // Не понимаю как обратится к месту где он лежит

    allCoctail.onclick = function () { // выводим список всех коктелей
        console.log(DrinkStorage.getKeys());
    }

    console.log('aaaaaaaa');
})();