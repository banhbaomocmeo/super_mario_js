import {loadLevel} from './loader.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'
import Keyboard from './KeyboardState.js'
import {createCollisionLayer} from './layers.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')



Promise.all([loadLevel('1-1'), createMario()])
.then(([level, mario]) => {
	const FPS = 60
	const gravity = 2000
	
	mario.pos.set(64, 180)
	mario.vel.set(200, -600)
	level.entities.add(mario)
	level.comp.layers.push(createCollisionLayer(level));

	//Keyboard
	const input = new Keyboard()
	input.addMapping(32, keyState => {
		if(keyState) {
			mario.jump.start()
		}else{
			mario.jump.cancel()
		}
	})

	input.listenTo(window)	
	var events = ['mousedown', 'mousemove']
	events.forEach(element => {
		console.log('wtf')

		canvas.addEventListener(element, event => {
			if(event.buttons === 1) {
				mario.vel.set(0, 0);
				mario.pos.set(event.offsetX, event.offsetY)
			}
		})
	});


	// FPS
	const timer = new Timer(1/FPS)
	timer.update = function update(deltaTime) {
		level.comp.draw(context)
		level.update(deltaTime)
		mario.vel.y += gravity * deltaTime
	}
	timer.start()
})
