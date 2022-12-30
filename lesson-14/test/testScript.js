"use strict";
let warp = {
    wrapper: null,
    buttStart: null,
    scoreBoard: null,

    score1: 0,
    score2: 0,

    racquetH: null,
    racquetAreaH: null,
    ballH: null,
    areaH: null,
    settimeout: null,

    messageGoalText: "Goal!",

    racquet: {
        size: {
            width: 10,
            height: 120,
        }
    },

    blab() {
        this.creatBoard(); //рисуем доску
        this.createButtStart(); // рисуем кнопку старта
        this.createScoreBoard(); // рисуем счёт
        this.creatRacquet(); // отрисовали ракетки + выстовили их на место
    },

    creatBoard() {
        this.wrapper = document.getElementById('wrapper');
        this.wrapper.classList.add('wrapper');
    },

    createButtStart() {
        this.buttStart = document.createElement('input');
        this.buttStart.classList.add('buttonStart');
        this.buttStart = document.body.insertBefore(this.buttStart, document.body.children[0]);
        this.buttStart.type = 'button';
        this.buttStart.value = 'Start';
    },

    createScoreBoard() {
        this.scoreBoard = document.createElement('div');
        this.scoreBoard.classList.add('scoreBoard');
        this.scoreBoard = document.body.insertBefore(this.scoreBoard, document.body.children[1]);
        this.gameSocer();
    },

    creatRacquet() { // создаём ракетки
        this.racquetLeft = document.createElement('div');
        this.racquetRight = document.createElement('div');
        this.racquetLeft.classList.add('racquet1');
        this.racquetRight.classList.add('racquet2');
        this.racquetLeft = this.wrapper.appendChild(this.racquetLeft);
        this.racquetRight = this.wrapper.appendChild(this.racquetRight);

        this.racquetLeft.style.width = this.racquetRight.style.width = this.racquet.size.width + 'px';
        this.racquetLeft.style.height = this.racquetRight.style.height = this.racquet.size.height + 'px';
        this.racquetPosition();
    },

    racquetPosition() { // считаем позицию
        let racquetLeftPositionX = this.wrapper.getBoundingClientRect().left;
        let racquetLeftPositionY = this.wrapper.getBoundingClientRect().top + this.wrapper.getBoundingClientRect().height / 2 - this.racquetLeft.getBoundingClientRect().height / 2;

        let racquetRightPositionX = this.wrapper.getBoundingClientRect().left + this.wrapper.getBoundingClientRect().width - this.racquetRight.getBoundingClientRect().width;
        let racquetRightPositionY = this.wrapper.getBoundingClientRect().top + this.wrapper.getBoundingClientRect().height / 2 - this.racquetLeft.getBoundingClientRect().height / 2;

        this.racquetPositionStyle(racquetLeftPositionX, racquetLeftPositionY, racquetRightPositionX, racquetRightPositionY);
    },

    racquetPositionStyle(X, Y, N, M) { // устанавливаем ракетки по местам
        let addPositionLeft = this.racquetLeft,
            addPositionRight = this.racquetRight;

        addPositionLeft.style.left = X + "px";
        addPositionLeft.style.top = Y + "px";

        addPositionRight.style.left = N + "px";
        addPositionRight.style.top = M + "px";
    },


    gameSocer() { //ведение счёта
        this.scoreBoard.innerHTML = this.score1 + ":" + this.score2;
    },

};

window.addEventListener('load', () => {
    warp.blab();
});