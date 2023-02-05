"use strict";

var drinkStorage = new AJAXStorage("lsDrink"),

    drinkInfoP = document.getElementById("drinkInfoP");

function addDrink() {
    let keyP = prompt("Введите название напитка"),
        valueC = {};

    valueC.alcohol = confirm("Алкогольный напиток или нет?\nok - алкогольный\nотмена - без алкогольный");
    valueC.recipe = prompt("Рецепт напитка");
    drinkStorage.addValue(keyP, valueC);
}

function showDrinkInfo() {
    var drinkInf = prompt("Введите название напитка"),
        drinkInfoP = document.getElementById("drinkInfoP"),
        answer = drinkStorage.getValue(drinkInf);

    if (drinkStorage.getValue(drinkInf) !== undefined) {
        drinkInfoP.style.height = "auto";
        drinkInfoP.innerHTML = "Название напиток: " + drinkInf +
            "<br>" + "алкогольный: " + (answer.alcohol === true ? "да" : "нет") +
            "<br>" + "Рецепт: " + (answer.recipe ? answer.recipe : "рецепт не указан");
    } else {
        drinkInfoP.innerHTML = "В хранилище нету данных об этом напитке";
    }
}

function removeDrink() {
    var drinkInfoDel = prompt("Введите название напитка"),
        drinkInfoP = document.getElementById("drinkInfoP");

    if (drinkStorage.deleteValue(drinkInfoDel) === true) {
        drinkInfoP.innerHTML = "Напиток удалён из хранилища ";
        drinkStorage.store();
    } else {
        drinkInfoP.innerHTML = "В хранилище нету данных об этом напитке";
    }
}

function showDrinksMenu() {
    var drinkInfoP = document.getElementById("drinkInfoP");
    drinkInfoP.innerHTML = drinkStorage.getKeys();
}

drinkInfoP.classList.add("drinkInfoP");