import Trait from "./Trait.js";
import { Vec2D } from "../math.js";

export default class PlayerController extends Trait {
    constructor() {
        super('playerController')
        this.player = null
        this.checkpoint = new Vec2D(0, 0)
    }

    setPlayer(entity) {
        this.player = entity
    }

    update(entity, deltaTime, level) {
        if(!level.entities.has(this.player)) {
            this.player.killable.revive()
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y)
            level.entities.add(this.player)
        }
    }
}