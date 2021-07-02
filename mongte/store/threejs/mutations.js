import {
  Scene,
  TrackballControls,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
} from "three";

export default {
  RESIZE(state, { width, height }) {
    state.width = width;
    state.height = height;
    state.camera.aspect = width / height;
    state.camera.updateProjectionMatrix();
    state.renderer.setSize(width, height);
    state.controls.handleResize();
    state.renderer.render(state.scene, state.camera);
  },

  SET_VIEWPORT_SIZE(state, { width, height }) {
    state.width = width;
    state.height = height;
  },
  INITIALIZE_RENDERER(state, el) {
    state.renderer = new WebGLRenderer({ antialias: true });
    state.renderer.setPixelRatio(window.devicePixelRatio);
    state.renderer.setSize(state.width, state.height);
    el.appendChild(state.renderer.domElement);
  },
  INITIALIZE_CAMERA(state) {
    state.camera = new PerspectiveCamera(
      // 1. Field of View (degrees)
      60,
      // 2. Aspect ratio
      state.width / state.height,
      // 3. Near clipping plane
      1,
      // 4. Far clipping plane
      1000
    )

    state.camera.position.z = 500
  },
  INITIALIZE_CONTROLS(state) {
    state.controls = new TrackballControls(
      state.camera,
      state.renderer.domElement
    )

    state.controls.rotateSpeed = 1.0
    state.controls.zoomSpeed = 1.2
    state.controls.panSpeed = 0.8
    state.controls.noZoom = false
    state.controls.noPan = false
    state.controls.staticMoving = true
    state.controls.dynamicDampingFactor = 0.3
    state.controls.keys = [65, 83, 68]
  },
  INITIALIZE_SCENE(state) {
    state.scene = new Scene()
    state.scene.background = new Color(0xcccccc)
  },
}
