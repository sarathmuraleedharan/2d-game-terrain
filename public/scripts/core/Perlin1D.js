export default class Perlin1D {
    
    constructor() {
        this.MAX_VERTICES = 256;
        this.MAX_VERTICES_MASK = this.MAX_VERTICES - 1;
        this.amplitude = 1;
        this.scale = 1;
        this.r = [];
        for (var i = 0; i < this.MAX_VERTICES; ++i) {
            this.r.push(Math.random());
        }
    }

    getVal(x) {
        let scaledX = x * this.scale;
        let xFloor = Math.floor(scaledX);
        let t = scaledX - xFloor;
        let tRemapSmoothstep = t * t * (3 - 2 * t);

        let xMin = xFloor % this.MAX_VERTICES_MASK;
        let xMax = (xMin + 1) % this.MAX_VERTICES_MASK;

        var y = this.lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep);

        return y * this.amplitude;
    }
    lerp(a, b, t) {
        return a * (1 - t) + b * t;
    }
    setAmplitude(newAmplitude) {
        this.amplitude = newAmplitude;
    }
    setScale(newScale) {
        this.scale = newScale;
    }
}