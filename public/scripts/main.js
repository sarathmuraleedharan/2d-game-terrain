import Perlin1D from "./core/Perlin1D.js";
import Game from "./core/Game.js";

class Canvas {
    constructor() {
        this.width = 700;
        this.height = 500;

        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.p = new Perlin1D();
        this.game = new Game(this.context, this.width, this.height);
        this.savedTime = 0;
        this.ms = 0;
    }

    update = (deltaTime) => {
        requestAnimationFrame(this.update);
        this.draw(deltaTime);
        //console.log(deltaTime); 

    }

    start() {
        this.update(0);
    }

    draw(deltaTime) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.game.draw(deltaTime);
    }

    drawRectagle() {
        this.context.strokeSytle = 'red';
        this.context.rect(100, 100, 100, 100);
        this.context.stroke();
    }

}

window.addEventListener('load', function () {
    const canvas = new Canvas();
    canvas.start();
})