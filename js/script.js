"use strict"
let scene, camera, renderer
let hemisphereLight, shadowLight
let sea
let sky
let airplane

init()
render()

function init() {
	createScene()
	createLights()
	createSea()
	createSky()
	createAirplane()
}

function render() {
	requestAnimationFrame(render)

	airplane.propeller.rotation.x += 0.3
	sea.mesh.rotation.z += 0.005
	sky.mesh.rotation.z += 0.01

	renderer.render(scene, camera)
}

function createScene() {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 10000)
	camera.position.set(0, 100, 200)
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
	shadowLight.shadow.mapSize.width = 2048
	shadowLight.shadow.mapSize.height = 2048
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
		color: 0xffffff,
		transparent: true,
		opacity: 0.5,
		flatShading: true
	})
	let nBlocks = Math.floor(Math.random() * 3) + 3
	for (let i = 0; i < nBlocks; ++i) {
		let m = new THREE.Mesh(geom, mat)
		m.position.x = i * 15
		m.position.y = 5 + Math.random() * 5
		m.position.z = 5 + Math.random() * 5
		m.rotation.z = Math.random() * Math.PI * 2
		m.rotation.y = Math.random() * Math.PI * 2
		let s = Math.random() * 0.7 + 0.3
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
		c.mesh.position.z = - Math.random() * 600
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

function Airplane() {
  this.mesh = new THREE.Object3D()

  // cockpit
  let gCockpit = new THREE.BoxGeometry(60, 50, 50)
  let mCockpit = new THREE.MeshPhongMaterial({
  	color: 0x00cc88,
  	flatShading: true
  })
  let cockpit = new THREE.Mesh(gCockpit, mCockpit)
  cockpit.castShadow = true
  cockpit.receiveShadow = true
  this.mesh.add(cockpit)

  // engine
  let gEngine = new THREE.BoxGeometry(20, 50, 50)
  let mEngine = new THREE.MeshPhongMaterial({
  	color: 0xffffff,
  	flatShading: true
  })
  let engine = new THREE.Mesh(gEngine, mEngine)
  engine.position.x = 40
  engine.castShadow = true
  engine.receiveShadow = true
  this.mesh.add(engine)

  // tail
  let gTail = new THREE.BoxGeometry(20, 20, 10)
  let mTail = new THREE.MeshPhongMaterial({
  	color: 0xffffff,
  	flatShading: true
  })
  let tail = new THREE.Mesh(gTail, mTail)
  tail.position.set(-35, 25, 0)
  tail.castShadow = true
  tail.receiveShadow = true
  this.mesh.add(tail)

  // top and bottom wings
  let gWing = new THREE.BoxGeometry(40, 10, 120)
  let mWing = new THREE.MeshPhongMaterial({
  	color: 0x00aaff,
  	flatShading: true
  })
  let topWing = new THREE.Mesh(gWing, mWing)
  let botWing = new THREE.Mesh(gWing, mWing)
  topWing.castShadow = true
  topWing.receiveShadow = true
  topWing.position.set(10, 20, 0)
  botWing.castShadow = true
  botWing.receiveShadow = true
  botWing.position.set(10, -20, 0)
  this.mesh.add(topWing)
  this.mesh.add(botWing)

  // propeller
	let gPropeller = new THREE.BoxGeometry(20, 10, 10)
	let mPropeller = new THREE.MeshPhongMaterial({
		color: 0xff5555, 
		flatShading: true
	})
	this.propeller = new THREE.Mesh(gPropeller, mPropeller)
	this.propeller.castShadow = true
	this.propeller.receiveShadow = true

	// blades
	let gBlade = new THREE.BoxGeometry(1, 100, 20)
	let mBlade = new THREE.MeshPhongMaterial({
		color: 0x00cc88,
		flatShading: true
	})
	let blade = new THREE.Mesh(gBlade, mBlade)
	blade.position.set(8, 0, 0)
	blade.castShadow = true
	blade.receiveShadow = true

	this.propeller.add(blade)
	this.propeller.position.set(50, 0, 0)
	this.mesh.add(this.propeller)
}

function createAirplane() {
	airplane = new Airplane()
	airplane.mesh.scale.set(0.25, 0.25, 0.25)
	airplane.mesh.position.y = 100
	airplane.mesh.position.z = -100
	scene.add(airplane.mesh)
}