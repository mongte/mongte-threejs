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

//https://silqwer.github.io/posts/vue-three-js
export default Vue.extend({
  data() {
    return {
      isR: false,
      renderer: null
    }
  },
  computed: {
    cvWebgl() {
      return this.$refs.webgl
    }
  },
  created() {
    console.log('layout created')
  },
  mounted() {

    const sizes = {
      width: 800,
      height: 600
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

    // Scene
    const scene = new THREE.Scene()

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

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: this.cvWebgl
    })

    renderer.setSize(sizes.width, sizes.height)

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
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }
})
</script>

<style>
</style>