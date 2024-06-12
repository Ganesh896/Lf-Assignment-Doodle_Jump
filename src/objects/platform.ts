// import { DIMENSIONS } from "../constants/constants";
import { ctx } from "../html-elements";

export interface IPlatform {
    img: string;
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;

    draw: (img: string) => void;

    // updatePosition: () => void;
}

export default class Platform implements IPlatform {
    img: string;
    xpose: number;
    ypose: number;
    width: number;
    height: number;
    dx: number;
    dy: number;

    constructor(img: string, xpose: number, ypose: number, width: number, height: number) {
        this.img = img;
        this.width = width;
        this.height = height;
        this.xpose = xpose;
        this.ypose = ypose;
        this.dx = 0;
        this.dy = 0;
    }

    draw(): void {
        const img = new Image();
        img.src = this.img;
        // img.onload = () => {
        //     ctx.drawImage(img, this.xpose, this.ypose, this.width, this.height);
        //     };
        ctx.drawImage(img, this.xpose, this.ypose, this.width, this.height);
    }

    // updatePosition(): void {
    //     this.ypose += this.dy;
    //     this.xpose += this.dx;

    //     if (this.xpose < 0) {
    //         this.xpose = DIMENSIONS.CANVAS__WIDHT;
    //     }

    //     if (this.xpose > DIMENSIONS.CANVAS__WIDHT) {
    //         this.xpose = 0;
    //     }
    //     this.draw();
    // }
}
