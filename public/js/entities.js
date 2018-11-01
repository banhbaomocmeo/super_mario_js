import Entity from './Entity.js'
import {loadMarioSprites} from './sprites.js'
import Velocity from './trait/Velocity.js'
import Jump from './trait/Jump.js'

export function createMario() {
	return loadMarioSprites()
	.then(sprite => {
		const mario = new Entity()
		mario.addTrait(new Velocity())
		mario.addTrait(new Jump())
		
		mario.draw = function drawMario(context) {
			sprite.draw('idle', context, this.pos.x, this.pos.y)
		}
		return mario
	})
    
}