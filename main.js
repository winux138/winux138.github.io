class Rond {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var rond1 = new Rond(-1, -1, 10, "red");
var intervId1;
var worker1;

var rondAr = [];
var intervIdAr = [];
var workerAr = [];
for (var i = 0; i < 10; ++i) {
    rondAr.push(new Rond(-1, -1, 4 + 16 * Math.random(), "#" + ((1 << 24) * Math.random() | 0).toString(16)));
}

if (window.Worker) {
    worker1 = new Worker('worker.js');


    worker1.onmessage = function (e) {
        console.log('Message received from worker');
        rond1.x = e.data[0];
        rond1.y = e.data[1];
        rond1.draw();

        draw10more();
    }

    intervId1 = setInterval(drawCircle(intervId1, worker1), 500 + 1000 * Math.random());



} else {
    console.log("[ERREUR] pas possible d'utiliser des worker");
}

function drawCircle(intervId, worker) {
    clearInterval(intervId);
    worker.postMessage([canvas.width, canvas.height]);
    console.log('Message envoyé au worker');
}

function draw10more() {
    for (let i = 0; i < 10; ++i) {
        workerAr.push(new Worker('worker.js'));
        workerAr[i].onmessage = function (e) {
            console.log('Message received from worker ' + i);
            rondAr[i].x = e.data[0];
            rondAr[i].y = e.data[1];
            rondAr[i].draw();
        }

        intervIdAr[i] = setInterval(drawCircle(intervIdAr[i], workerAr[i]), 500 + 1000 * Math.random());
    }

}