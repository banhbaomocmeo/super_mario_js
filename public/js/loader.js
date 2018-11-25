import Level from './Level.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js'
import SpriteSheet from './SpriteSheet.js'
import { createAnimation } from './animation.js';


export function loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image)
		})
		image.src =url
	})
}

function loadJSON(url) {
	return fetch(url)
	.then(r => r.json())
}

export function loadSpriteSheet(name){
	return loadJSON(`/sprites/${name}.json`)
	.then(sheetSpec => Promise.all([
		sheetSpec,
		loadImage(sheetSpec.imageURL),
	]))
	.then(([sheetSpec, image]) => {
		
		const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)
		
		if(sheetSpec.tiles) {
			sheetSpec.tiles.forEach(tileSpec => {
				sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
			})
		}
		
		if(sheetSpec.frames) {
			sheetSpec.frames.forEach(frameSpec => {
				sprites.define(frameSpec.name, ...frameSpec.rect)
			})
		}

		if(sheetSpec.animations) {
			sheetSpec.animations.forEach(animSpec => {
				const animation = createAnimation(animSpec.frames, animSpec.frameLen)
				sprites.defineAnimation(animSpec.name, animation)
			})
		}
		
		return sprites
	})
}

function createTiles(level, backgrounds) {
	backgrounds.forEach(background => {
		background.ranges.forEach(([xStart, xLen, yStart, yLen]) => {
			const xEnd = xStart + xLen
			const yEnd = yStart + yLen
			for (let x = xStart; x < xEnd; ++x) {
				for (let y = yStart; y < yEnd; ++y) {
					level.tiles.set(x, y, {
						name: background.tile,
						type: background.type,
					})
				}
			}
		});
	})
	
}



export function loadLevel(name) {
	return loadJSON(`/levels/${name}.json`)
	.then(levelSpec => Promise.all([
		levelSpec,
		loadSpriteSheet(levelSpec.spriteSheet),
	]))
	.then(([levelSpec, bgSprites]) => {
		const level = new Level()
		createTiles(level, levelSpec.backgrounds)
		const backgroundLayer = createBackgroundLayer(level, bgSprites)
		const spriteLayer = createSpriteLayer(level.entities)
		level.comp.layers.push(backgroundLayer, spriteLayer)

		return level
	})
}