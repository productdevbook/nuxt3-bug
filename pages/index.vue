<template>
  <div>
    <div>asdasd</div>
    <AtomHInput v-model="form.email" />
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue'

  export default defineComponent({
    setup() {
      const form = ref({
        email: '',
        password: '',
      })
    

      return {

        form,
      }
    },
  })
</script>
