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
      isR: false,
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
    console.log('layout created')
  },
  mounted() {

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // Cursor
    const cursor = {
      x: 0,
      y: 0
    }

    window.addEventListener('mousemove', (event) => {
      cursor.x = event.clientX / sizes.width - 0.5
      cursor.y = - (event.clientY / sizes.height - 0.5)
    })

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      if (this.renderer) {
        this.renderer.setSize(sizes.width, sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }

    })

    // Object
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
      new THREE.MeshBasicMaterial({ color: '#ddd' })
    )
    scene.add(mesh)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
    // const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0.1, 100)
    const aspectRatio = sizes.width / sizes.height
    // const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
    camera.position.z = 3
    camera.lookAt(mesh.position)
    scene.add(camera)

    this.renderer.setSize(sizes.width, sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // Animate
    const clock = new THREE.Clock()

    const controls = new OrbitControls(camera, this.cvWebgl)
    controls.enableDamping = true
    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      // camera.position.x = cursor.x * 5
      // camera.position.y = cursor.y * 5
      // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
      // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
      // camera.position.y = cursor.y * 3
      // camera.lookAt(mesh.position)
      controls.update()
      // Render
      this.renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }
})
</script>

<style>
</style>