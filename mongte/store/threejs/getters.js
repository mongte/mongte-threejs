export default {
  CAMERA_POSITION: state => {
    return state.camera ? state.camera.position : null;
  }
}