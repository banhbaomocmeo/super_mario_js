import {Vec2D} from './math.js'

export default class Entity {
	constructor() {
		this.pos = new Vec2D(0, 0)
		this.vel = new Vec2D(0, 0)
		this.size = new Vec2D(0, 0)
		this.traits = []
	}

	addTrait(trait) {
		this.traits.push(trait)
		this[trait.NAME] = trait
	}

	update(deltaTime) {
		this.traits.forEach(trait => {
			trait.update(this, deltaTime)
		})
	}
}