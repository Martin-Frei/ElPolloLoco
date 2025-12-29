// models/background-objects.class.js

export class BackgroundObjects {
    width = 720;
    height = 480;
    img;
    x;
    y;

    constructor(imagePath, x) {
        this.img = new Image();
        this.img.src = imagePath;
        this.x = x;
        this.y = 480 - this.height;
    }
}