export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
    sub(v) {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
    }
    mul(s) {
        this.x = this.x * s;
        this.y = this.y * s;
    }
    div(s) {
        this.x = this.x / s;
        this.y = this.y / s;
    }
    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    setMag(s) {
        this.norm();
        this.mul(s);
    }
    norm() {
        let mag = this.mag();
        this.x = this.x / mag;
        this.y = this.y / mag;
    }
    limit(v) {
        if (this.x >= 0) {
            if (this.x >= v) this.x = v;
        } else {
            if (this.x <= -v) this.x = -v;
        }

        if (this.y >= 0) {
            if (this.y >= v) this.y = v;
        } else {
            if (this.y <= -v) this.y = -v;
        }
    }
}