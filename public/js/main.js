import {createLevelLoader} from './loader/level.js'
import Timer from './Timer.js'
import {createCollisionLayer, createCameraLayer} from './layers.js'
import {setupKeyboard} from './input.js'
import Camera from './Camera.js';
import { setupMouseControl } from './debugger.js';
import { loadEntities } from './entities.js';
// import {model} from './test.js'


// main
async function main(canvas) {
	const context = canvas.getContext('2d')
	const entityFactory = await loadEntities()
	const loadLevel = await createLevelLoader(entityFactory)
	const level = await loadLevel('1-1')

// window.model = model

	const FPS = 60
	const camera = new Camera()
	window.camera = camera

	const mario = entityFactory.mario()
	mario.pos.set(64, 180)
	level.entities.add(mario)

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
}

const canvas = document.getElementById('screen')
main(canvas)