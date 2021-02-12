let width;
let height;
let x;
let y;

onmessage = function (e) {
    // init du worker
    width = e.data[0];
    height = e.data[1];

    interval = setInterval(monWorker, 1000);
}

function monWorker() {
    clearInterval(interval);
    if (Math.random() > 0.8) {
        x = Math.random() * width;
        y = Math.random() * height;
        worker.postMessage([x, y]);
    }
    interval = setInterval(monWorker, 1000);
}