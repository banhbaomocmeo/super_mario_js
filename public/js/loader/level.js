import Level from '../Level.js'
import {Matrix} from '../math.js'
import {createBackgroundLayer, createSpriteLayer} from '../layers.js'
import {loadJSON, loadSpriteSheet} from '../loader.js'

function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix
    for (const {tile, x, y} of expandTiles(tiles, patterns)){
        grid.set(
            x, y, {
                type: tile.type,
            }
        )
    }
    return grid
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix
    for (const {tile, x, y} of expandTiles(tiles, patterns)){
        grid.set(
            x, y, {
                name: tile.name,
            }
        )
    }
    return grid
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield {x, y}
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    } else {
        console.error(range);
        throw new TypeError('Illegal range definition.');
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range)
    }
}

function* expandTiles(tiles, patterns) {

    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const {x, y} of expandRanges(tile.ranges)){
    
                const derivedX = x + offsetX
                const derivedY = y + offsetY

                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles
                    yield* walkTiles(tiles, derivedX, derivedY)
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY
                    }        
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0)
}

function setupCollison(levelSpec, level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles)
    }, [])
    const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns)
    level.setCollisionGrid(collisionGrid)
}

function setupBG(levelSpec, level, bgSprites) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns)
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, bgSprites)
        level.comp.layers.push(backgroundLayer)
    })
    
}

function setupEntities(levelSpec, level, entityFactory) {
            
        levelSpec.entities.forEach(({name, pos}) => {
            const createEntity = entityFactory[name]
            pos.forEach(([x, y]) => {
                const entity = createEntity()
                entity.pos.set(x, y)
                level.entities.add(entity)
            })
        })
		const spriteLayer = createSpriteLayer(level.entities)
		level.comp.layers.push(spriteLayer)

}

export function createLevelLoader(entityFactory) {
    return function loadLevel(name) {
        return loadJSON(`/levels/${name}.json`)
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(levelSpec.spriteSheet),
        ]))
        .then(([levelSpec, bgSprites]) => {
            const level = new Level()

            setupCollison(levelSpec, level)
            setupBG(levelSpec, level, bgSprites)
            setupEntities(levelSpec, level, entityFactory)

            return level
        })
    }
}