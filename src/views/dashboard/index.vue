<template>
  <div class="dashboard-container">
    <Card />
    <Sale />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card/index.vue'
import Sale from './Sale/index.vue'
import Footer from './Footer/index.vue'

export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    Footer
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
