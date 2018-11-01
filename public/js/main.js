import Compositor from './Compositor.js'
import {loadLevel} from './loader.js'
import {loadBGSprites} from './sprites.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'


const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')



Promise.all([loadBGSprites(), loadLevel('1-1'), createMario()])
.then(([bgSprites, level, mario]) => {
	const FPS = 60
	const gravity = 30
	const comp = new Compositor()
	const backgroundLayer = createBackgroundLayer(level.backgrounds, bgSprites)
	const spriteLayer = createSpriteLayer(mario)
	comp.layers.push(backgroundLayer, spriteLayer)
	mario.pos.set(64, 180)
	mario.vel.set(200, -600)
	// FPS
	const timer = new Timer(1/FPS)
	timer.update = function update(deltaTime) {
		comp.draw(context)
		mario.update(deltaTime)
		mario.vel.y += gravity
	}
	timer.start()
})
