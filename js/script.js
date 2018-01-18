const canvas = document.getElementById('canvas')

const sceneManager = new SceneManager(canvas)

bindEventListeners()
render()

function bindEventListeners() {
	window.addEventListener('resize', sceneManager.handleWindowResize, false)
	sceneManager.handleWindowResize()
}

function render() {
	requestAnimationFrame(render)
	sceneManager.update()
}