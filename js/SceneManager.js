function SceneManager(canvas) {
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }

  const lights = lightArray
  const objects = objectArray

  const scene = buildScene()
  const camera = buildCamera(screenDimensions)
  const renderer = buildRenderer(screenDimensions)

  function buildScene() {
    const scene = new THREE.Scene()
    lights.forEach(light => scene.add(light))
    objects.forEach(obj => scene.add(obj))

    return scene
  }

  function buildCamera({ width, height }) {
    const fieldOfView = 60
    const aspectRatio = width / height
    const nearPlane = 1
    const farPlane = 10000
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
    camera.position.set(0, 100, 200)

    return camera
  }


  function buildRenderer({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }) 
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1
    renderer.setPixelRatio(DPR)
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true

    return renderer
  }

  this.update = function() {
    objects.forEach(obj => obj.update())

    renderer.render(scene, camera)
  }

  this.handleWindowResize = function() {
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const { width, height } = canvas

    screenDimensions.width = width
    screenDimensions.height = height

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  }
}