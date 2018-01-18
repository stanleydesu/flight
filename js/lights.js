/*
 * exports all lights in an array, containing:
 * 	hemisphereLight
 *  shadowLight
 */

// hemisphereLight
hemisphereLight = new THREE.HemisphereLight(0x00cc88, 0x00aaff, 0.9)

// shadowLight
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

const lightArray = [ hemisphereLight, shadowLight ]