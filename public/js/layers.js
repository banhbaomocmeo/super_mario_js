function drawBackGround(background, context, sprites) {
	background.ranges.forEach(([x1, x2, y1, y2]) => {
		for (let x = x1; x < x2; ++x) {
			for (let y = y1; y < y2; ++y) {
				sprites.drawTile(background.tile, context, x, y);
			}
		}
	});
}

export function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas')
    buffer.width = 320
    buffer.height = 240
    backgrounds.forEach(background => {
        drawBackGround(background, buffer.getContext('2d'), sprites)
    })

    return function backgroundLayer(context) {
        context.drawImage(buffer, 0, 0)
    }
}

export function createSpriteLayer(entity) {
	return function spriteLayer(context) {
		entity.draw(context)
	}
}