
export default class SpriteSheet {
	constructor(image, width, height) {
		/*
		width, height: default unit size of all tiles.
		*/
		this.image = image;
		this.width = width;
		this.height = height;
		this.tiles = new Map();
		this.animations = new Map()
	}

	defineAnimation(name, animation){
		this.animations.set(name, animation)
	}

	define(name, x, y, width, height) {
		const buffers = [false, true].map(flip => {
			const buffer = document.createElement('canvas');
			buffer.width = width;
			buffer.height = height;

			const context = buffer.getContext('2d')
			if(flip) {
				context.scale(-1, 1)
				context.translate(-width, 0)
			}
			context.drawImage(
					this.image,
					x, y,    // toa do cat
					width, height,            // width, height cat
					0, 0,                               // toa do ve
					width, height             // width, height ve
				)
			return buffer
		})
		
		this.tiles.set(name, buffers)
	}

	defineTile(name, x, y) {
		this.define(name, x*this.width, y*this.height, this.width, this.height)
	}

	draw(name, context, x, y, flip=false) {
		const buffer = this.tiles.get(name)[flip?1:0]
		context.drawImage(buffer, x, y)
	}

	drawAnimation(name, context, x, y, distance){
		const animation = this.animations.get(name)
		this.drawTile(animation(distance), context, x, y)
	}

    drawTile(name, context, x, y) {
        this.draw(name, context, x*this.width, y*this.height)
	}
	
	
}
