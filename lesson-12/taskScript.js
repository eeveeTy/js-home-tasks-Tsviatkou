"use strict";

var wrap = document.getElementById('wrapper'),

    //Центр блока
    wrapCenterX = wrap.offsetLeft + wrap.offsetWidth / 2,
    wrapCenterY = wrap.offsetTop + wrap.offsetHeight / 2,

    //Числовые переменные
    radius = 120, // радиус (растояние)
    distanceOfDigits = 30, // 360/12 = 30
    angleValue = 0, // угол
    hourDigits = 12, //цифры циферблата
    radiusDigitalWatch = -40, // отступ до эл.часов

    time = new Date(), //текущее время

    wrapDigitalWatch = document.createElement("div"),
    arrowHours = document.createElement("div"), // создаем DIV(для стрелки часов)
    arrowMinutes = document.createElement("div"), // создаем DIV(для стрелки минут)
    arrowSeconds = document.createElement("div"), // создаем DIV(для стрелки секунд)

    hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes()), //определяем по времени где должна быть стрелка часов
    minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds()), //определяем по времени где должна быть стрелка минут
    secondsDeg = 6 * time.getSeconds() - 6; //определяем по времени где должна быть стрелка секунд

console.log(wrapCenterX);
console.log(wrapCenterY);

// создаём циферблат
for (var i = 1; i <= hourDigits; i++) {
    var wrapChildElem = document.createElement("div"),// создали контейнер
        angle,
        wrapChildElemCenterX,
        wrapChildElemCenterY;

    angleValue += distanceOfDigits;
    angle = angleValue / 180 * Math.PI;

    wrapChildElem = wrap.appendChild(wrapChildElem);//привязали конейнер
    wrapChildElem.classList.add('childElem');//привязываеи CSS
    wrapChildElem.innerHTML = i;//устанавливаем цифру

    wrapChildElemCenterX = wrapCenterX + radius * Math.sin(angle);
    wrapChildElemCenterY = wrapCenterY - radius * Math.cos(angle);

    wrapChildElem.style.left = Math.round(wrapChildElemCenterX - wrapChildElem.offsetWidth / 2) + "px";
    wrapChildElem.style.top = Math.round(wrapChildElemCenterY - wrapChildElem.offsetHeight / 2) + "px";
}

// создаём Div, подключаем к ним стили
wrapDigitalWatch = wrap.appendChild(wrapDigitalWatch);
arrowHours = wrap.appendChild(arrowHours);
arrowMinutes = wrap.appendChild(arrowMinutes);
arrowSeconds = wrap.appendChild(arrowSeconds);
wrapDigitalWatch.classList.add("wrapDigitalWatch");
arrowHours.classList.add("arrowHours");
arrowMinutes.classList.add("arrowMinutes");
arrowSeconds.classList.add("arrowSeconds");

//положение стрелок
wrapDigitalWatch.style.left = wrapCenterX - wrapDigitalWatch.offsetWidth / 2 + "px";
wrapDigitalWatch.style.top = wrapCenterY - radiusDigitalWatch + "px";
arrowHours.style.top = wrapCenterY - arrowHours.offsetHeight + 10 + "px";
arrowHours.style.left = wrapCenterX - arrowHours.offsetWidth / 2 + "px";
arrowMinutes.style.top = wrapCenterY - arrowMinutes.offsetHeight + 10 + "px";
arrowMinutes.style.left = wrapCenterX - arrowMinutes.offsetWidth / 2 + "px";
arrowSeconds.style.top = wrapCenterY - arrowSeconds.offsetHeight + 10 + "px";
arrowSeconds.style.left = wrapCenterX - arrowSeconds.offsetWidth / 2 + "px";
arrowHours.style.transformOrigin = "center 50px";
arrowMinutes.style.transformOrigin = "center 110px";
arrowSeconds.style.transformOrigin = "center 135px";

// положение эл.часов
function arrows() {
    var time = new Date()
    wrapDigitalWatch.innerHTML = time.toLocaleTimeString();
    secondsDeg += 6;
    arrowSeconds.style.transform = "rotate(" + secondsDeg + "deg)";
    minutesDeg += 6 * (1 / 60);
    arrowMinutes.style.transform = "rotate(" + minutesDeg + "deg)";
    hoursDeg += 6 * (1 / 360);
    arrowHours.style.transform = "rotate(" + hoursDeg + "deg)";
}

window.onload = arrows();
window.setInterval(arrows, 1000);