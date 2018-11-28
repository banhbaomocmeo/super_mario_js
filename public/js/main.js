import {loadLevel} from './loader/level.js'
import {loadMario} from './entity/Mario.js'
import Timer from './Timer.js'
import {createCollisionLayer, createCameraLayer} from './layers.js'
import {setupKeyboard} from './input.js'
import Camera from './Camera.js';
import { setupMouseControl } from './debugger.js';
import { loadEntities } from './entities.js';
// import {model} from './test.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

// window.model = model
Promise.all([loadLevel('1-1'), loadEntities()])
.then(([level, factory]) => {
	const FPS = 60
	const camera = new Camera()
	window.camera = camera

	const mario = factory.mario()
	mario.pos.set(64, 180)
	level.entities.add(mario)

	const goomba = factory.goomba()
	goomba.pos.x = 220
	level.entities.add(goomba)

	const koopa = factory.koopa()
	koopa.pos.x = 100
	level.entities.add(koopa)
	level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));

	//Keyboard
	const input = setupKeyboard(mario)
	input.listenTo(window)	

	setupMouseControl(canvas, mario, camera)

	// FPS
	const timer = new Timer(1/FPS)
	timer.update = function update(deltaTime) {
		level.update(deltaTime)
		// camera follow mario
		if (mario.pos.x > 100) {
			camera.pos.x = mario.pos.x - 100
		}

		level.comp.draw(context, camera)

	}
	timer.start()
})
