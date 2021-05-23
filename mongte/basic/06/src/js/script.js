import '../css/style.css'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Base
 */
const geometry = new THREE.BoxGeometry(1, 1, 2)
const material = new THREE.MeshBasicMaterial({ color: '#ddd' })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height)
camera.position.z = 5
camera.position.x = 1
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */

console.log(mesh.position)
let tween = gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
console.log(tween)


tween.eventCallback('onUpdate', () => {
  renderer.render(scene, camera)
})


tween.eventCallback('onComplete', () => {
  console.log('onComplete')
})

// const tick = () => {
//   // Render
//   renderer.render(scene, camera)

//   console.log('1111')

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick)
// }

// tick()