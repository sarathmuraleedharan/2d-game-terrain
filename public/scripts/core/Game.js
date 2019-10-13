import Perlin1D from "./Perlin1D.js";
import Point from "./Point.js";
import Bike from "./Bike.js";


const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;


export default class Game {
    constructor(context, width, height) {
        this.t = 0;
        this.width = width;
        this.height = height;
        this.interval = 0.001;
        this.context = context;
        this.p = new Perlin1D();
        this.p.setScale(2);
        this.savedPoint = new Point();
        this.terrainStartTime = 0;
        this.mountainStartTime = 10000;
        this.move = 0;
        this.moveDiff = 0.02;

        this.bike = new Bike();

        document.addEventListener('keydown', (e) => {
            if (e.keyCode == RIGHT) {
                this.move += this.moveDiff / 5;
                this.move = Math.min(this.moveDiff, this.move);
            } else if (e.keyCode == LEFT) {
                this.move -= this.moveDiff / 5;
                this.move = Math.max(0, this.move);
            } else if (e.keyCode == DOWN) {

            } else if (e.keyCode == UP) {

            }
        });
    }
    update() {

    }
    draw(deltaTime) {
        this.drawBackground();

        let mountainPoints = this.getPints(this.mountainStartTime, -90, .006);
        this.drawPath(mountainPoints, 'rgba(100,100,100,.5)');

        let points = this.getPints(this.terrainStartTime, 0);
        this.drawPath(points, '#000000');

        this.terrainStartTime += this.move;
        this.mountainStartTime += this.move / 4;
        this.bike.update(points);
        this.bike.draw(this.context);
    }

    drawBackground() {
        this.context.fillStyle = '#dbf7ff';
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.fill();
    }
    drawPath(points, color) {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(points[0].x, points[0].y);
        points.forEach((point) => {
            this.context.lineTo(point.x, point.y);
        });
        this.context.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        this.context.lineTo(this.width, this.height);
        this.context.lineTo(0, this.height);
        this.context.fill();
    }

    getPints(startTime, yOffset, inc) {
        let points = [];
        let t = startTime;
        let th = 100;
        let minTh = 25;
        for (let i = 0; i < this.width; i++) {
            let point = new Point();
            point.x = i;
            point.y = this.height - th - Math.sin(t) * th / 2;
            let per = this.p.getVal(t);
            point.y -= th - per * - th / 2 - minTh - yOffset;
            points.push(point);
            if (inc) {
                t += inc;
            } else {
                t += .01;
            }
        }
        this.t += this.interval;
        return points;
    }


}