import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff00000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: 'blue' })
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.position.x = 1
mesh2.position.y = 2
mesh2.position.z = 2
scene.add(mesh2)

const sizes = {
  width: 800,
  height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = 0
camera.position.y = 0
camera.lookAt(new THREE.Vector3(0, -1, 0))
scene.add(camera)

mesh.position.set(0.7, -0.6, 1)
console.log(mesh.position.normalize())
console.log(mesh.position.distanceTo(camera.position))

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5

mesh.rotation.reorder('YXZ')
mesh.rotation.y = Math.PI * 0.25
mesh.rotation.x = Math.PI * 0.25

const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
group.position.x = 1
// scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'yellow' })
)
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'green' })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'blue' })
)
cube3.position.x = 1.5
group.add(cube3)

const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)