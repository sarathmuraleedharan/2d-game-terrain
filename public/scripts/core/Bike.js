import Vector from "./Vector.js";

export default class Bike {
    constructor() {

        this.width = 60;
        this.height = 40;

        this.location = new Vector(150, 100);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0.5);
        this.gravity = .95;

        this.angle = 0;
        this.bikeImage = null;
        this.img = new Image();
        this.img.onload = () => {
            this.bikeImage = this.img;
        }
        this.img.src = "/img/bike_sm.png";

    }
    update(points) {
        this.points = points;
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);

        let x = Math.floor(this.location.x);
        let terrainP = points[x];
        if (this.location.y >= terrainP.y) {
            this.velocity.mul(-1);
            this.location.y = terrainP.y;
        } else {
            this.velocity.mul(this.gravity);
        }
        let wheelOffset = 10;
        let p1 = points[x - this.width / 2 + wheelOffset];
        let p2 = points[x + this.width / 2 - wheelOffset];

        this.angle = ((p2.y - p1.y) / (p2.x - p1.x));
    }
    draw(context) {
        context.save();
        context.fillStyle = 'rgba(50,50,50,.9)';
        context.translate(this.location.x, this.location.y);
        context.rotate(this.angle);
        context.translate(-this.location.x, -this.location.y);
        context.beginPath();
        if (this.bikeImage) {
            let x = this.location.x - this.width / 2;
            let y = this.location.y - this.height;
            let w = this.width;
            let h = this.height;
            context.drawImage(this.bikeImage, x, y, w, h);
            // context.rect(x, y, w, h);
            //context.stroke();
        }
        context.restore();
    }

}