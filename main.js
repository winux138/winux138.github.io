class Rond {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var monWorker;
var IntervId;

var rond1 = new Rond(-1, -1, 10, "red");

if (window.Worker) {
    monWorker = new Worker('worker.js');


    monWorker.onmessage = function (e) {
        console.log('Message received from worker');
        rond1.x = e.data[0];
        rond1.y = e.data[1];
        rond1.draw();
    }

    IntervId = setInterval(drawCircle, 500 + 1000 * Math.random());


} else {
    console.log("[ERREUR] pas possible d'utiliser des worker");
}

function drawCircle(rond) {
    clearInterval(IntervId);
    monWorker.postMessage([canvas.width, canvas.height]);
    console.log('Message envoyé au worker');
}
