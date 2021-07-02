<template>
  <div>
    <canvas ref="webgl" class="webgl"></canvas>
  </div>
</template>

<script>
import Vue from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

const SCENE = new THREE.Scene()
const AMBIENT_LIGHT = new THREE.AmbientLight(0xffffff, 0.5)
const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0x00fffc, 0.3)
const POINT_LIGHT = new THREE.PointLight(0xffffff, 0.5)
const MATERIAL = new THREE.MeshStandardMaterial()
MATERIAL.roughness = 0.5
const CLOCK = new THREE.Clock()

let CAMERA = null
let CONTROLS =  null
let RENDERER = null
let SPHERE = null
let TORUS = null
let PLANE = null
let CUBE = null

//https://silqwer.github.io/posts/vue-three-js
export default Vue.extend({
  data() {
    return {
      width: 0,
      height: 0,
      isRender: false,
    }
  },
  computed: {
    canvas() {
      return document.querySelector('.webgl')
    },
  },
  mounted() {
    const dat = require('dat.gui')
    const gui = new dat.GUI()

    AMBIENT_LIGHT.color = new THREE.Color('#0064e5')
    AMBIENT_LIGHT.intensity = 0.6
    SCENE.add(AMBIENT_LIGHT)

    DIRECTIONAL_LIGHT.position.set(1, 5, 10)
    SCENE.add(DIRECTIONAL_LIGHT)

    POINT_LIGHT.position.x = 2
    POINT_LIGHT.position.y = 3
    POINT_LIGHT.position.z = 4
    SCENE.add(POINT_LIGHT)

    SPHERE = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      MATERIAL
    )
    SPHERE.position.x = -1.5

    CUBE = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.75, 0.75),
      MATERIAL
    )

    TORUS = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 32, 64),
      MATERIAL
    )
    TORUS.position.x  = 1.5

    PLANE = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      MATERIAL
    )
    PLANE.rotation.x = - Math.PI * 0.5
    PLANE.position.y = -0.65

    SCENE.add(SPHERE, CUBE, TORUS, PLANE)

    this.width = window.innerWidth
    this.height = window.innerHeight

    window.addEventListener('resize', this.onResize)
    CAMERA = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 100)
    CAMERA.position.x = 1
    CAMERA.position.y = 1
    CAMERA.position.z = 2

    SCENE.add(CAMERA)

    CONTROLS = new OrbitControls(CAMERA, this.canvas)

    RENDERER = new THREE.WebGLRenderer({
      canvas: this.canvas
    })
    RENDERER.setSize(this.width, this.height)
    RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.tick()
  },
  methods: {
    onResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight

      CAMERA.aspect = this.width / this.height
      CAMERA.updateProjectionMatrix()

      RENDERER.setSize(this.width, this.height)
      RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    },
    tick() {
      const elapsedTime = CLOCK.getElapsedTime()

      // Update objects
      SPHERE.rotation.y = 0.1 * elapsedTime
      CUBE.rotation.y = 0.1 * elapsedTime
      TORUS.rotation.y = 0.1 * elapsedTime

      SPHERE.rotation.x = 0.15 * elapsedTime
      CUBE.rotation.x = 0.15 * elapsedTime
      TORUS.rotation.x = 0.15 * elapsedTime

      // Update controls
      CONTROLS.update()

      // Render
      RENDERER.render(SCENE, CAMERA)

      // Call tick again on the next frame
      window.requestAnimationFrame(this.tick)
    }
  }
})
</script>

<style>
</style>