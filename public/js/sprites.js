import SpriteSheet from './SpriteSheet.js'
import {loadImage} from './loader.js'

export function loadMarioSprites() {
	return loadImage('/img/mario.gif')
	.then(image => {
		const mario = new SpriteSheet(image, 16, 16)
		mario.define('idle', 276, 44, 16, 16);
		return mario
	})

}
