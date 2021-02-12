// definition classes

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

// definiton variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var rondAr = [];
var intervIdAr = [];
var workerAr = [];

for (var i = 0; i < 10; ++i) {
    rondAr.push(new Rond(-1, -1, 4 + 16 * Math.random(), "#" + ((1 << 24) * Math.random() | 0).toString(16)));
}


// code
if (window.Worker) {
    for (let i = 0; i < 10; ++i) {
        workerAr.push(new Worker('worker.js'));
        workerAr[i].onmessage = function (e) {
            console.log('Message received from worker ' + i);
            rondAr[i].x = e.data[0];
            rondAr[i].y = e.data[1];
            rondAr[i].draw();
        }

        intervIdAr[i] = setInterval(loopCircle, 1000, intervIdAr[i], workerAr[i]);
    }

} else {
    console.log("[ERREUR] pas possible d'utiliser des worker");
}

function loopCircle(intervId, worker) {
    clearInterval(intervId);
    if (Math.random() > 0.8) {
        worker.postMessage([canvas.width, canvas.height]);
        console.log('Message envoyé au worker');
    }
    intervId = setInterval(loopCircle, 1000, intervId, worker);
}