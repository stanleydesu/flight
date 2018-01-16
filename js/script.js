let scene, camera, renderer
let hemisphereLight, shadowLight
let sea
let sky

init()
render()

function init() {
	createScene()
	createLights()
	createSea()
	createSky()
}

function render() {
	requestAnimationFrame(render)

	renderer.render(scene, camera)
}

function createScene() {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 10000)
	camera.position.set(0, 200, 100)
	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
	renderer.setSize(innerWidth, innerHeight)
	renderer.shadowMap.enabled = true
	document.getElementById('world').appendChild(renderer.domElement)
}

function createLights() {
	hemisphereLight = new THREE.HemisphereLight(0x00cc88, 0x00aaff, 0.9)
	shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
	shadowLight.position.set(150, 350, 350)
	shadowLight.castShadow = true
	shadowLight.shadow.camera.left = -400
	shadowLight.shadow.camera.right = 400
	shadowLight.shadow.camera.top = 400
	shadowLight.shadow.camera.bottom = -400
	shadowLight.shadow.camera.near = 1
	shadowLight.shadow.camera.far = 1000
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
	scene.add(hemisphereLight)
	scene.add(shadowLight)
}

function Sea() {
	let geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10)
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))
	let mat = new THREE.MeshPhongMaterial({
		color: 0x00ccff,
		transparent: true,
		opacity: 0.6,
		flatShading: true
	})
	this.mesh = new THREE.Mesh(geom, mat)
	this.mesh.receiveShadow = true
}

function createSea() {
	sea = new Sea()
	sea.mesh.position.y = -600
	scene.add(sea.mesh)
}

function Cloud() {
	this.mesh = new THREE.Object3D()
	let geom = new THREE.BoxGeometry(20, 20, 20)
	let mat = new THREE.MeshPhongMaterial({
		color: 0xdddddd
	})
	let nBlocks = Math.floor(Math.random() * 3) + 3
	for (let i = 0; i < nBlocks; ++i) {
		let m = new THREE.Mesh(geom, mat)
		m.position.x = i * 20
		m.position.y = Math.round(Math.random() * 10)
		m.position.z = Math.round(Math.random() * 10)
		m.rotation.z = Math.random() * Math.PI * 2
		m.rotation.y = Math.random() * Math.PI * 2
		let s = 0.1 + Math.random() * 0.9
		m.scale.set(s, s, s)
		m.castShadow = true
		m.receiveShadow = true
		this.mesh.add(m)
	}
}

function Sky() {
	this.mesh = new THREE.Object3D()
	let nClouds = 20
	let stepAngle = (Math.PI * 2) / nClouds
	for (let i = 0; i < nClouds; ++i) {
		let c = new Cloud()
		let a = stepAngle * i
		let h = 750 + Math.random() * 200
		c.mesh.position.x = Math.cos(a) * h
		c.mesh.position.y = Math.sin(a) * h
		c.mesh.position.z = -400 - Math.random() * 400
		c.mesh.rotation.z = a + Math.PI / 2
		let s = Math.round(Math.random() * 3)
		c.mesh.scale.set(s, s, s)
		this.mesh.add(c.mesh)
	}
}

function createSky() {
	sky = new Sky()
	sky.mesh.position.y = -600
	scene.add(sky.mesh)
}