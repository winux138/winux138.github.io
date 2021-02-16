let width;
let height;
let x;
let y;

onmessage = function (e) {
    // init du worker
    width = e.data[0];
    height = e.data[1];

    interval = setInterval(monWorker, 500 + Math.random() * 1000);
}

function monWorker() {
    clearInterval(interval);
    x = Math.random() * width;
    y = Math.random() * height;
    postMessage([x, y]);
    interval = setInterval(monWorker, 500 + Math.random() * 1000);
}