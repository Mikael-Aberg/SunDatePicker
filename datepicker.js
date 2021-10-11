let angle = 0;
let playback = 'stop';

let height = 800;
let width = 800;

let d;

let sun;
let earth;

let sunSize = 120;
let earthSize = 40;


function preload() {
    sun = loadImage('https://i.imgur.com/2qyWj4u.png');
    earth = loadImage('https://i.imgur.com/5L0z8CK.png');
}

function setup() {
    createCanvas(width, height);

    const bForward = createButton('Forward');
    const bBackward = createButton('Backward');
    const bPause = createButton('Stop');
    const bSelect = createButton('Select date');

    bForward.position(width / 4, 20);
    bBackward.position((width / 2) + (width / 4), 20);
    bPause.position(width / 2, 20);
    bSelect.position((width - 35) / 2, 120);

    bForward.mousePressed(goForward);
    bBackward.mousePressed(goBackward);
    bPause.mousePressed(pause);
    bSelect.mousePressed(selectDate);

    d = new Date(random(1940, 2010), 0, 0, 0, 0, 0, 0);

    angleMode(DEGREES);
}

function goForward() {
    playback = "forward";
}

function goBackward() {
    playback = "backward";
}

function pause() {
    playback = "pause";
}

function selectDate() {
    console.log(`You selected: ${getDate()}`);
}

function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function updateDate() {
    const x = (leapYear(d.getFullYear()) ? 366 : 365) / 360;
    let days = Math.round(x * angle);

    if (playback === 'forward') {
        days++;
    }

    d = new Date(d.getFullYear(), 0, 0);
    d.setDate(d.getDate() + days);
}

function pad(string, length) {
    let val = string;
    const padding = length - string.length;

    for (let i = 0; i < padding; i++) {
        val = `0${val}`;
    }

    return val;
}

function getDate() {
    return `${pad(String(d.getDate()), 2)}/${pad(String(d.getMonth() + 1), 2)}/${d.getFullYear()}`
}

function draw() {
    background(255);
    fill(255);
    noStroke();
    translate(width / 2, height / 2);
    let v1 = createVector(0, -height / 4);
    v1.rotate(angle);

    if (playback === 'forward') {
        angle += 1;
    } else if (playback === 'backward') {
        angle -= 1;
    }

    if (angle >= 360 && playback === 'forward') {
        d.setFullYear(d.getFullYear() + 1);
        angle = 0;
    }

    if (angle <= 0 && playback === 'backward') {
        d.setFullYear(d.getFullYear() - 1);
        angle = 360;
    }

    if (playback === 'forward' || playback === 'backward') {
        updateDate();
    }

    image(earth, v1.x - (earthSize / 2), v1.y - (earthSize / 2), earthSize, earthSize);
    image(sun, -(sunSize / 2), -(sunSize / 2), sunSize, sunSize);

    translate(-(width / 2), -(height / 2));
    textSize(24);
    fill(0);
    text(getDate(), (width - 80) / 2, 85);
}