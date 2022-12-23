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


//добовляем канвас на страницу и находим его
var canvasAdd = document.createElement("canvas");
canvasAdd = wrap.appendChild(canvasAdd);
var canvasSmallCircle = document.querySelector('canvas');
canvasSmallCircle.style.width = "300px";
canvasSmallCircle.style.height = "300px";

var context = canvasSmallCircle.getContext('2d');
context.beginPath();
context.fillStyle = '#afaf28';
context.arc(150, 75 , 150, 0, Math.PI/0.5);
context.fill();
context.closePath();
//Я не знаю почему получается вытянутый элипс!
//У него как-то сбилось оси Y, он показвает на заданную высоту, но отрисовывает в двое больше.
//Даже выше установлено Y=75 и это почему-то считается центром поля.
//При попытки подстроить радиус под Y, он естественно не подстраивается под X.
//Вообщем значения правильные, а почему не пашит я хз
//Кароче, тьма проблем тут, жду пересдачу этого дз, ибо я вооюще не понимаю канвас

// создаём циферблат
for (var i = 1; i <= hourDigits; i++) {
    var wrapChildElem = document.createElement("div"),// создали контейнер
        valueNumber = document.createElement('p'),
        angle,
        wrapChildElemCenterX,
        wrapChildElemCenterY;

    angleValue += distanceOfDigits;
    angle = angleValue / 180 * Math.PI;

    wrapChildElem = wrap.appendChild(wrapChildElem);//привязали конейнер
    valueNumber = wrapChildElem.appendChild(valueNumber);
    wrapChildElem.style.position =  "absolute";
    valueNumber.textContent = i;
    valueNumber.style.margin = "0";
    valueNumber.style.width = "40px";

    wrapChildElemCenterX = wrapCenterX + radius * Math.sin(angle);
    wrapChildElemCenterY = wrapCenterY - radius * Math.cos(angle);

    context.beginPath();
    context.fillStyle = 'darkseagreen';
    context.arc(wrapChildElemCenterX-20, wrapChildElemCenterY-20 , 20, 0, Math.PI/0.5);
    context.fill();
    context.closePath();

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