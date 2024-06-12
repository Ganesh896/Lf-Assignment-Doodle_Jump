import { DIMENSIONS } from "../constants/constants";
import { ctx } from "../html-elements";

export interface IDoodler {
    img: string;
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;
    dy: number;

    draw: (img: string) => void;

    updatePosition: (moveRight: boolean, moveLeft: boolean) => void;
}

export default class Doodler implements IDoodler {
    img: string;
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;
    dy: number;
    gravity: number;

    constructor(img: string, xpose: number, ypose: number, width: number, height: number, dy: number) {
        this.img = img;
        this.width = width;
        this.height = height;
        this.xpose = xpose;
        this.ypose = ypose;
        this.dx = 5;
        this.dy = -12;
        this.gravity = 0.5;
    }

    draw(): void {
        const img = new Image();
        img.src = this.img;
        ctx.drawImage(img, this.xpose, this.ypose, this.width, this.height);
    }

    updatePosition(moveRight: boolean, moveLeft: boolean): void {
        this.dy += this.gravity;
        this.ypose += this.dy;

        if (moveRight) {
            this.xpose += this.dx;
        } else if (moveLeft) {
            this.xpose -= this.dx;
        }

        if (this.xpose < 0) {
            this.xpose = DIMENSIONS.CANVAS__WIDHT;
        }

        if (this.xpose > DIMENSIONS.CANVAS__WIDHT) {
            this.xpose = 0;
        }
        this.draw();
    }
}
