<template>
  <div>
    <view-port />
  </div>
</template>

<script>
import Vue from 'vue'
import ViewPort from "@/components/view-port.vue";
import ControlPanel from "@/components/control-panel.vue";

export default Vue.extend({
  components: {
    ViewPort,
  }
})

</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0px;
}
canvas {
  position: relative;
}
#app {
  height: 100%;
}
</style>