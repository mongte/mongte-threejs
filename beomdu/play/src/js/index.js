import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })

const geometry = new THREE.BufferGeometry()
const positionsArray = new Float32Array([
  2, 0, 0,
  0, 2, 0,
  0, 0, 2,
  2, 0, 0,
  2, 2, 0,
  2, 0, 2,
  0, 2, 0,
  2, 2, 0,
  2, 0, 2,
  0, 0, 2,
  2, 2, 0,
  2, 0, 2,
])
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const mesh2 = new THREE.Mesh(boxGeometry, material)
mesh2.position.y = 3
scene.add(mesh2)

const sphereGeometry = new THREE.SphereGeometry(1, 12, 12)
const mesh3 = new THREE.Mesh(sphereGeometry, material)
mesh3.position.z = 3
scene.add(mesh3)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 4
camera.lookAt(mesh.position)
scene.add(camera)

const canvas = document.querySelector('canvas.webgl')

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

// let time = Date.now()
const tick = () => {
  mesh3.rotation.y += 0.01
  mesh2.rotation.x += 0.01
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