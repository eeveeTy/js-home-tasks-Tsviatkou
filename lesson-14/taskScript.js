"use strict";
var wrap = document.getElementById('wrapper'),

    widthOfWrap = "1000px",
    heightOfWrap = "700px",

    buttonStart = document.createElement("input"),
    scoreBoard = document.createElement("div"),
    racquet1 = document.createElement("div"),
    racquet2 = document.createElement("div"),
    ball = document.createElement("div"),
    messageGoal = document.createElement("div"),

    score1 = 0,
    score2 = 0,
    racquetH,
    racquetAreaH,
    ballH,
    areaH,
    settimeout,
    messageGoalText = "Goal!";

//устанавливаем рамзеры поля
wrap.style.width = widthOfWrap;
wrap.style.height = heightOfWrap;

//Кнопка старт
buttonStart.type = "button";
buttonStart.value = "START!";
buttonStart.classList.add('buttonStart');
buttonStart = document.body.insertBefore(buttonStart, document.body.children[0]);
buttonStart.onclick = start;

//сообщение о голе
messageGoal.classList.add("messageGoal");
messageGoal = wrap.appendChild(messageGoal);

//таймер
requestAnimationFrame(tick);

//счёт
scoreBoard.classList.add('scoreBoard');
scoreBoardHTML();
scoreBoard = document.body.insertBefore(scoreBoard, document.body.children[1]);

//ракетки
racquet1.classList.add('racquet1');
racquet2.classList.add('racquet2');
racquet1 = wrap.appendChild(racquet1);
racquet2 = wrap.appendChild(racquet2);

racquetH = {
    //левая
    racquet1PosX: wrap.getBoundingClientRect().left,
    racquet1PosY: wrap.getBoundingClientRect().top + wrap.getBoundingClientRect().height/2 - racquet1.getBoundingClientRect().height/2,
    racquet1Speed: 0,

    //правая
    racquet2PosX: wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width - racquet2.getBoundingClientRect().width,
    racquet2PosY: wrap.getBoundingClientRect().top + wrap.getBoundingClientRect().height/2 - racquet1.getBoundingClientRect().height/2,
    racquet2Speed: 0,
    width: 10, //ширина ракетки
    height: 120,//длина ракетки

    update: function() {
        var racquet1Obj = racquet1,
            racquet2Obj = racquet2;

        racquet1Obj.style.left = this.racquet1PosX + "px";
        racquet1Obj.style.top = this.racquet1PosY + "px";

        racquet2Obj.style.left = this.racquet2PosX + "px";
        racquet2Obj.style.top = this.racquet2PosY + "px";
    }
};

//

racquetAreaH = {
    width: 10,
    height: wrap.getBoundingClientRect().height
};

racquetH.update();

ball.classList.add('ball');
ball = wrap.appendChild(ball);

ballH = {
    posX: wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width/2 - ball.getBoundingClientRect().width/2,
    posY: wrap.getBoundingClientRect().top + wrap.getBoundingClientRect().height/2 - ball.getBoundingClientRect().height/2,
    speedX: 0,
    speedY: 0,
    width: 30,
    height: 30,

    update: function() {
        var ballObj = ball;
        ballObj.style.left = this.posX + "px";
        ballObj.style.top = this.posY + "px";
    }
};

areaH = {
    width: wrap.getBoundingClientRect().width,
    height: wrap.getBoundingClientRect().height
};

ballH.update();

//keydown/keyup
window.addEventListener("keydown", function(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 83) { //w
        racquetH.racquet1Speed = 5;
    }

    if (EO.keyCode === 87) { //s
        racquetH.racquet1Speed = -5;
    }

    if (EO.keyCode === 40) { //upArrow
        racquetH.racquet2Speed = 5;
    }

    if (EO.keyCode === 38) { //downArrow
        racquetH.racquet2Speed = -5;
    }
});

window.addEventListener("keyup", function(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 83) { //w
        racquetH.racquet1Speed = 0;
    }

    if (EO.keyCode === 87) { //s
        racquetH.racquet1Speed = 0;
    }

    if (EO.keyCode === 40) { // upArrow
        racquetH.racquet2Speed = 0;
    }

    if (EO.keyCode === 38) { //downArrow
        racquetH.racquet2Speed = 0;
    }
});


//функция счёта (его вывода на табло)
function scoreBoardHTML() {
    scoreBoard.innerHTML = score1 + ":" + score2;
}

//старт игры (запуск мячика)
function start() {
    ballH.speedX = 10;//4
    ballH.speedY = 5;//2
}

//Поля
function tick() {
    //ракетки
    racquetH.update();
    racquetH.racquet1PosY += racquetH.racquet1Speed;

    if (racquetH.racquet1PosY + racquetH.height > (wrap.getBoundingClientRect().top + racquetAreaH.height)) {
        racquetH.racquet1PosY = wrap.getBoundingClientRect().top + racquetAreaH.height - racquetH.height;
    }
    if (racquetH.racquet1PosY < wrap.getBoundingClientRect().top) {
        racquetH.racquet1PosY = wrap.getBoundingClientRect().top;
    }

    racquetH.racquet2PosY += racquetH.racquet2Speed;
    if (racquetH.racquet2PosY + racquetH.height > (wrap.getBoundingClientRect().top + racquetAreaH.height)) {
        racquetH.racquet2PosY = wrap.getBoundingClientRect().top + racquetAreaH.height - racquetH.height;
    }
    if (racquetH.racquet2PosY < wrap.getBoundingClientRect().top) {
        racquetH.racquet2PosY = wrap.getBoundingClientRect().top;
    }

    //мяч
    ballH.posX -= ballH.speedX;
    if ((ballH.posY + ballH.height < racquetH.racquet2PosY || ballH.posY > (racquetH.racquet2PosY + racquetH.height)) && ballH.posX+ballH.width >= (wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width)) {

        score1 += 1;
        scoreBoardHTML();
        ballH.speedX = 0;
        ballH.speedY = 0;
        messageGoal.innerHTML = messageGoalText;

        ballH.posX = wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width - ballH.width - 1;

        settimeout = window.setTimeout(function () {
            messageGoal.innerHTML = "";
            ballH.posX = wrap.getBoundingClientRect().left + racquetH.width;
            ballH.posY = racquetH.racquet1PosY + racquetH.height/2;
            start();
        }, 2000);

    } else if (!(ballH.posY + ballH.height < racquetH.racquet2PosY || ballH.posY > (racquetH.racquet2PosY + racquetH.height)) && ballH.posX+ballH.width > (racquetH.racquet2PosX)) {
        ballH.speedX =- ballH.speedX;
        ballH.posX = wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width - racquetH.width - ballH.width;
    }

    if ((ballH.posY + ballH.height < racquetH.racquet1PosY || ballH.posY > (racquetH.racquet1PosY + racquetH.height)) && ballH.posX <= (wrap.getBoundingClientRect().left)) {

        score2 += 1;
        scoreBoardHTML();
        ballH.speedX = 0;
        ballH.speedY = 0;
        messageGoal.innerHTML = messageGoalText;

        ballH.posX = wrap.getBoundingClientRect().left + 1;

        settimeout = window.setTimeout(function () {
            messageGoal.innerHTML = "";
            ballH.posX = wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width - racquetH.width;
            ballH.posY = racquetH.racquet2PosY + racquetH.height/2;
            start();
        }, 2000);

    } else if (!(ballH.posY + ballH.height < racquetH.racquet1PosY || ballH.posY > (racquetH.racquet1PosY + racquetH.height)) && ballH.posX < (racquetH.width + racquetH.racquet1PosX)) {
        ballH.speedX =- ballH.speedX;
        ballH.posX = wrap.getBoundingClientRect().left + racquetH.width;
    }

    ballH.posY -= ballH.speedY;
    if (ballH.posY + ballH.height > (wrap.getBoundingClientRect().top + areaH.height)) {
        ballH.speedY =- ballH.speedY;
        ballH.posY = wrap.getBoundingClientRect().top + areaH.height - ballH.height;
    }

    if (ballH.posY < wrap.getBoundingClientRect().top) {
        ballH.speedY =- ballH.speedY;
        ballH.posY = wrap.getBoundingClientRect().top;
    }

    ballH.update();

    requestAnimationFrame(tick);
}