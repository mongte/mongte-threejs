<template>
  <div>
    <canvas ref="webgl" class="webgl"></canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

const scene = new THREE.Scene()

//https://silqwer.github.io/posts/vue-three-js
export default Vue.extend({
  data() {
    return {
      sizes: null,
      cursor: null
    }
  },
  computed: {
    cvWebgl() {
      return this.$refs.webgl
    },
    renderer() {
      return new THREE.WebGLRenderer({
        canvas: this.cvWebgl
      })
    }
  },
  created() {
    this.cursor = {
      x: 0,
      y: 0
    }
  },
  mounted() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 2, 2)
    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

    this.geometry()

    const mesh = new THREE.Mesh(
      this.geometry(),
      material
    )

    scene.add(mesh)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 1, 1000)
    camera.position.z = 2
    camera.position.x = 1
    camera.position.y = 1
    camera.lookAt(mesh.position)
    scene.add(camera)

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    // this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // Animate

    this.renderer.render(scene, camera)
  },
  methods: {
    positionsArray() {
      // return new Float32Array([
      //   0, 0, 0, // First vertex
      //   0, 1, 0, // Second vertex
      //   1, 0, 0  // Third vertex
      // ])

      const count = 50 * 3 * 3
      const positionsArray = new Float32Array(count)
      for(let i = 0; i < count; i++) {
        positionsArray[i] = (Math.random() - 0.5) * 4
      }

      return positionsArray
    },
    geometry() {
      const positionsAttribute = new THREE.BufferAttribute(this.positionsArray(), 3)

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', positionsAttribute)

      return geometry
    }
  }
})
</script>

<style>
</style>