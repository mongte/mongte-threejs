import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const material = new THREE.MeshBasicMaterial({ map: colorTexture })

// const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true})

const boxGeometry = new THREE.BoxGeometry(3, 1, 1)

const mesh2 = new THREE.Mesh(boxGeometry, material)
scene.add(mesh2)

const mesh3 = new THREE.Mesh(boxGeometry, material)
mesh3.position.z = -1
scene.add(mesh3)

const mesh4 = new THREE.Mesh(boxGeometry, material)
mesh4.position.z = 1
scene.add(mesh4)

const mesh5 = new THREE.Mesh(boxGeometry, material)
mesh5.position.y = 2
mesh5.position.z = -1
scene.add(mesh5)

const mesh6 = new THREE.Mesh(boxGeometry, material)
mesh6.position.y = 2
scene.add(mesh6)

const mesh7 = new THREE.Mesh(boxGeometry, material)
mesh7.position.y = 2
mesh7.position.z = 1
scene.add(mesh7)


const mesh8 = new THREE.Mesh(boxGeometry, material)
mesh8.position.y = 4
mesh8.position.z = -1
scene.add(mesh8)

const mesh9 = new THREE.Mesh(boxGeometry, material)
mesh9.position.y = 4
scene.add(mesh9)

const mesh10 = new THREE.Mesh(boxGeometry, material)
mesh10.position.y = 4
mesh10.position.z = 1
scene.add(mesh10)


// const sphereGeometry = new THREE.SphereGeometry(1, 12, 12)
// const mesh3 = new THREE.Mesh(sphereGeometry, material)
// mesh3.position.z = 1
// scene.add(mesh3)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 4
// camera.lookAt(mesh.position)
scene.add(camera)

const canvas = document.querySelector('canvas.webgl')

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

// let time = Date.now()
const tick = () => {
  // mesh3.rotation.y += 0.01
  // mesh2.rotation.x += 0.01
  renderer.render(scene, camera)

  controls.update()

  window.requestAnimationFrame(tick)
  // const currentTime = Date.now()
  // time = currentTime
}
tick()

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight

  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
})

window.addEventListener