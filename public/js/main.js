import {createLevelLoader} from './loader/level.js'
import Timer from './Timer.js'
import {createCollisionLayer, createCameraLayer} from './layers.js'
import {setupKeyboard} from './input.js'
import Camera from './Camera.js';
import { setupMouseControl } from './debugger.js';
import { loadEntities } from './entities.js';
import Entity from './Entity.js';
import PlayerController from './trait/PlayerController.js';
// import {model} from './test.js'

function createPlayerEnviroment(playerEntity) {
	const playerEnv = new Entity()
	const playerControl = new PlayerController()
	playerControl.setPlayer(playerEntity)
	playerControl.checkpoint.set(64, 64)
	playerEnv.addTrait(playerControl)
	return playerEnv
}

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

	const playerEnv = createPlayerEnviroment(mario)
	level.entities.add(playerEnv)

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
		camera.pos.x = Math.max(0, mario.pos.x - 100)

		level.comp.draw(context, camera)

	}
	timer.start()
}

const canvas = document.getElementById('screen')
main(canvas)