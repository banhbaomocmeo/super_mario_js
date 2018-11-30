import Trait from "./Trait.js";

export const States = {
	WALKING: Symbol('walking'),
    HIDING: Symbol('hiding'),
    PANIC: Symbol('panic')
}

export default class KoopaBehavior extends Trait {
    constructor() {
        super('behavior')
        this.state = States.WALKING
        this.hideTime = 0
        this.hideDuration = 5
        this.panicSpeed = 200
        this.walkSpeed = null
    }

    collides(us, them) {
        if(us.killable.dead) {
            return
        }

        if(them.stomper) {
            if(them.vel.y > us.vel.y) {
                this.handleStomp(us, them)
            } else {
                this.handleNudge(us, them)
            }

        }

    }

    handleNudge(us, them) {
        if(this.state === States.WALKING) {
            them.killable.kill()
        } else if (this.state === States.HIDING){
            this.panic(us, them)
        } else if(this.state === States.PANIC) {
            const travelDir = Math.sign(us.vel.x)
            const impactDir = Math.sign(us.pos.x - them.pos.x)
            if (travelDir !== 0 && travelDir != impactDir) {
                them.killable.kill()
            }
        }
    }

    handleStomp(us, them) {
        if (this.state === States.WALKING) {
            this.hide(us)
        } else if (this.state === States.HIDING) {
            us.killable.kill()
            us.vel.set(100, -200)
            us.solid.obstructs = false
        } else if(this.state === States.PANIC) {
            this.hide(us)

        }
    }

    hide(us) {
        us.vel.x = 0
        us.pendulumWalk.enabled = false
        if(this.walkSpeed === null) {
            this.walkSpeed = us.pendulumWalk.speed
        }
        this.state = States.HIDING
        this.hideTime = 0

    }

    unhide(us) {
        us.pendulumWalk.enabled = true
        us.pendulumWalk.speed = this.walkSpeed
        this.state = States.WALKING
    }

    panic(us, them) {
        us.pendulumWalk.enabled = true
        us.pendulumWalk.speed = this.panicSpeed * Math.sign(them.vel.x)
        this.state = States.PANIC
    }

    update(us, deltaTime) {
        if(this.state === States.HIDING) {
            this.hideTime += deltaTime
            if(this.hideTime > this.hideDuration) {
                this.unhide(us)
            }
        }
    }
}