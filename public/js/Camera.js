import {Vec2D} from './math.js'

export default class Camera{
    constructor() {
        this.pos = new Vec2D(0, 0)
        this.size = new Vec2D(256, 224)
    }
}