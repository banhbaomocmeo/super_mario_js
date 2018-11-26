import Keyboard from './KeyboardState.js'

export function setupKeyboard(entity){
	const input = new Keyboard()
	//jump
	input.addMapping('KeyZ', keyState => {
		if(keyState) {
			entity.jump.start()
		}else{
			entity.jump.cancel()
		}
	})

	input.addMapping('ArrowRight', keyState => {
		entity.go.dir += keyState ? 1 : -1
	})
	input.addMapping('ArrowLeft', keyState => {
		entity.go.dir += -keyState ? -1 : 1
	})
	//boost speed
	input.addMapping('KeyX', keyState => {
		entity.turbo(keyState)
	})
    return input
}

