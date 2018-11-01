import {Vec2D} from './math.js'

export default class Entity {
	constructor() {
		this.pos = new Vec2D(0, 0)
		this.vel = new Vec2D(0, 0)
	}
}