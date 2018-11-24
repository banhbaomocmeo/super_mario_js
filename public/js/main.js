import {loadLevel} from './loader.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'
import {createCollisionLayer} from './layers.js'
import {setupKeyboard} from './input.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')



Promise.all([loadLevel('1-1'), createMario()])
.then(([level, mario]) => {
	const FPS = 60
	
	mario.pos.set(64, 180)
	level.entities.add(mario)
	level.comp.layers.push(createCollisionLayer(level));

	//Keyboard
	const input = setupKeyboard(mario)
	input.listenTo(window)	

	// FPS
	const timer = new Timer(1/FPS)
	timer.update = function update(deltaTime) {
		level.comp.draw(context)
		level.update(deltaTime)
	}
	timer.start()
})
