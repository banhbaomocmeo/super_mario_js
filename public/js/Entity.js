import {Vec2D} from './math.js'
import BoundingBox from './BoundingBox.js';

export const Sides = {
	TOP: Symbol('top'),
	BOTTOM: Symbol('bottom'),
	LEFT: Symbol('left'),
	RIGHT: Symbol('right')
}

export default class Entity {
	constructor() {

		this.pos = new Vec2D(0, 0)
		this.vel = new Vec2D(0, 0)
		this.size = new Vec2D(0, 0)
		this.offset = new Vec2D(0, 0)
		this.bounds = new BoundingBox(this.pos, this.size, this.offset)
		this.lifetime = 0
		this.traits = []
	}

	addTrait(trait) {
		this.traits.push(trait)
		this[trait.NAME] = trait
	}

	collides(candidate) {
		this.traits.forEach(trait => {
			trait.collides(this, candidate)
		})
	}

	obstruct(side, match) {
		this.traits.forEach(trait => {
			trait.obstruct(this, side, match)
		})
	}

	update(deltaTime, level) {
		this.traits.forEach(trait => {
			trait.update(this, deltaTime, level)
		})
		this.lifetime += deltaTime
	}

	draw() {

	}

	finalize() {
		this.traits.forEach(trait => {
			trait.finalize()
		})
	}
}