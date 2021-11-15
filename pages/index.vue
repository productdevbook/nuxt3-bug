<template>
  <div>
    <AtomHButton>Register for Beta Access</AtomHButton>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

interface feature {
  id: number
  title: string
  summary: string
}
export default defineComponent({
  setup() {
    const featuresData = ref<feature[]>([
      {
        id: 1,
        title: 'Book',
        summary: 'Add to library book and book read status save huntersofbook.',
      },
      { id: 2, title: 'Shelf', summary: 'Create special shelves for your books.' },
    ])

    return { featuresData }
  },
  head: {},
})
</script>
