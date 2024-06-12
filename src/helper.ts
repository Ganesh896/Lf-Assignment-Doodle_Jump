import Doodler from "./objects/doodler";
import Platform from "./objects/platform";

export function detectCollision(doodler: Doodler, platform: Platform) {
    // Check if the Doodler is landing on top of the platform
    const isCollidingFromTop =
        doodler.xpose + doodler.width > platform.xpose &&
        doodler.xpose < platform.xpose + platform.width &&
        doodler.ypose + doodler.height >= platform.ypose &&
        doodler.ypose + doodler.height <= platform.ypose + platform.height;

    return isCollidingFromTop;
}
