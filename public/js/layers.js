

export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas')
    buffer.width = 320
	buffer.height = 240
	const context = buffer.getContext('2d')
	
	level.tiles.forEach((tile, x, y) => {
			sprites.drawTile(tile.name, context, x, y);

	})

    return function backgroundLayer(context) {
        context.drawImage(buffer, 0, 0)
    }
}

export function createSpriteLayer(entities) {
	return function spriteLayer(context) {
		entities.forEach(entity => {
			entity.draw(context)
		})
	}
}