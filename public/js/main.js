function  loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image)
		})
		image.src =url
		console.log(image)
	})
}

const  canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

context.fillRect(0, 0, 50, 50)

loadImage('./img/tiles.png')
.then(image => {

	const sprites = new SpriteSheet(image, 16, 16)
	sprites.define('')

	context.drawImage(
		image, 
		0, 0,	
		16, 16,
		0, 0,
		16, 16
	)



})

