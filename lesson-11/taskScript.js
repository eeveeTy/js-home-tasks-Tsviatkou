"use strict";

var space = document.querySelector('#space'),
    DragImage = null, DragShiftX, DragShiftY

space.addEventListener("mouseover", mouseOver, false); //навели
space.addEventListener("mouseout", mouseOut, false);  //вывели
space.addEventListener("mousedown", DragStart, false); //нажали


function mouseOver(EO) { // событие на введение в облость
    EO = EO || window.event;
}

function mouseOut(EO) { // событие на выведение из облости
    EO = EO || window.event;
}

function DragStart(EO) { // событие на клик
    EO = EO || window.event;
    DragImage = EO.target;
    DragImage.ondragstart = function () {
        return false;
    };

    var imgSpace = space.getElementsByTagName('img'); //находим все изображения
    for (var i = 0; i < imgSpace.length; i++) { // проходим их
        imgSpace[i].style.zIndex = 0;
    }

    //стандартыне стили
    DragImage.style.zIndex = 1;
    DragImage.style.position = "absolute";
    DragImage.style.cursor = "pointer";

    //положение курсора
    var mouseX = EO.pageX;
    var mouseY = EO.pageY;

    //место нахождения изображения
    var imageX = DragImage.offsetLeft;
    var imageY = DragImage.offsetTop;

    //вычисляем разницу
    DragShiftX = mouseX - imageX;
    DragShiftY = mouseY - imageY;

    window.onmousemove = dragMove; // на перемещение курсора устонавливаем функцию
    window.onmouseup = dragStop;
}

function dragStop() { // событие на отпус элемента, устанавливаем нулевые значения
    window.onmousemove = null;
    window.onmouseup = null;
}

function dragMove(EO) { // функция на передвижение элемента
    EO = EO || window.event;
    var mouseX = EO.pageX;
    var mouseY = EO.pageY;
    var imageX = mouseX - DragShiftX;
    var imageY = mouseY - DragShiftY;
    DragImage.style.left = imageX + "px";
    DragImage.style.top = imageY + "px";
}

//как всегда не без проблем, рамка тоже двигается)))