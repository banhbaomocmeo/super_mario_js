

export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas')
    buffer.width = 320
	buffer.height = 240
	const context = buffer.getContext('2d')
	
	level.tiles.forEach((tile, x, y) => {
			sprites.drawTile(tile.name, context, x, y);

	})

    return function backgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y)
    }
}

export function createSpriteLayer(entities) {
	return function spriteLayer(context, camera) {
		entities.forEach(entity => {
			entity.draw(context)
		})
	}
}

export function createCollisionLayer(level) {
	const resolevedTiles = []
	
	const tileResolver = level.tileCollider.tiles 
	const tileSize = tileResolver.tileSize

	const getByIndexOriginal = tileResolver.getByIndex 
	
	tileResolver.getByIndex = function getByIndexFake(x, y) {
		resolevedTiles.push({x, y})
		return getByIndexOriginal.call(tileResolver, x, y)
	}

	return function drawCollision(context, camera) {
		context.strokeStyle = 'blue'
		resolevedTiles.forEach(({x, y}) => {
			context.beginPath()
			context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
			context.stroke()
		})
		context.strokeStyle = 'red'
		level.entities.forEach(entity => {
			context.beginPath()
			context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.x)
			context.stroke()
		})

		resolevedTiles.length = 0
	}
}