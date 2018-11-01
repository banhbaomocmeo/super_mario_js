
export default class SpriteSheet {
	constructor(image, width, height) {
		/*
		width, height: default unit size of all tiles.
		*/
		this.image = image;
		this.width = width;
		this.height = height;
		this.tiles = new Map();
	}

	define(name, x, y, width, height) {
		const buffer = document.createElement('canvas');
		buffer.width = width;
		buffer.height = height;
		buffer
			.getContext('2d')
			.drawImage(
				this.image,
				x, y,    // toa do cat
				width, height,            // width, height cat
				0, 0,                               // toa do ve
				width, height             // width, height ve
			)
		this.tiles.set(name, buffer)
	}

	defineTile(name, x, y) {
		this.define(name, x*this.width, y*this.height, this.width, this.height)
	}

	draw(name, context, x, y) {
		const buffer = this.tiles.get(name)
		context.drawImage(buffer, x, y)
	}

    drawTile(name, context, x, y) {
        this.draw(name, context, x*this.width, y*this.height)
    }
}
