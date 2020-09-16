<template>
  <div class="container">
    <Banner />
    <hr>
    <Category />

  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import Category from '@/components/Category.vue'

export default {
  data () {
    return {}
  },
  components: {
    Banner,
    Category
  }
}
</script>
