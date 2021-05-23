<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: ({ store, redirect }: any) => {
    console.log('root index ->')
    // redirect('/language/translation/text')
  }
})
</script>