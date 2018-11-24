import Entity from './Entity.js'
import {loadMarioSprites} from './sprites.js'
import Velocity from './trait/Velocity.js'
import Jump from './trait/Jump.js'
import Go from './trait/Go.js'

export function createMario() {
	return loadMarioSprites()
	.then(sprite => {
		const mario = new Entity()
		mario.size.set(14, 16)

		mario.addTrait(new Go())
		mario.addTrait(new Jump())
		// mario.addTrait(new Velocity())
		
		mario.draw = function drawMario(context) {
			sprite.draw('idle', context, this.pos.x, this.pos.y)
		}
		return mario
	})
    
}