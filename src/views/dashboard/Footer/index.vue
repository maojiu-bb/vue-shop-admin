<template>
  <div class="footer">
    <HotSearch />
    <Pie />
  </div>
</template>

<script>
import HotSearch from './HotSearch/index.vue'
import Pie from './Pie/index.vue'

export default {
  components: {
    HotSearch,
    Pie
  }
}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
