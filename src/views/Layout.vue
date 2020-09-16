<template>
  <div class="layout">
    <Navbar />
    <router-view></router-view>
    <router-link to="/cart" class="cart pl-3 pr-1 pt-4 pb-3">
    <!-- <Cart /> -->
    </router-link>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
// import Cart from "@/components/Cart.vue";

export default {
  data () {
    return {}
  },
  components: {
    Navbar,
    Footer
    // Cart,
  }
}
</script>

<style>
.cart {
  position: fixed;
  right: 1%;
  bottom: 10%;
  border-radius: 50%;
  background-color: #6b5139af;
  cursor: pointer;
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -ms-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  z-index: 3;
}
</style>
