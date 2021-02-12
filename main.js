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
var monWorker;
var IntervId;

var rond1 = new Rond(-1, -1, 10, "red");

var rondAr = [];
var intervIdAr = [];
var workerAr = [];
for (var i = 0; i < 10; ++i){
    rondAr.push(new Rond(-1, -1, 20 * Math.random(), "#" + ((1<<24)*Math.random() | 0).toString(16)));
}

if (window.Worker) {
    monWorker = new Worker('worker.js');


    monWorker.onmessage = function (e) {
        console.log('Message received from worker');
        rond1.x = e.data[0];
        rond1.y = e.data[1];
        rond1.draw();

    }

    IntervId = setInterval(drawCircle(IntervId), 500 + 1000 * Math.random());


    draw10more();

} else {
    console.log("[ERREUR] pas possible d'utiliser des worker");
}

function drawCircle(IntervId) {
    clearInterval(IntervId);
    monWorker.postMessage([canvas.width, canvas.height]);
    console.log('Message envoyé au worker');
}

function draw10more() {
    for (let i = 0; i < 10; ++i){
        workerAr.push(new Worker('worker.js'));
        workerAr[i].onmessage = function (e) {
            console.log('Message received from worker ' + i);
            rondAr[i].x = e.data[0];
            rondAr[i].y = e.data[1];
            rondAr[i].draw();
        }
    
        intervIdAr[i] = setInterval(drawCircle(intervIdAr[i]), 1500 + 1000 * Math.random());
    }

}