<template>
  <div class="bg-secondary sticky-top">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark px-0">
        <router-link class="navbar-brand text-white" to="/">Dessert</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/products" class="nav-link text-white">商品列表</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/cart" class="nav-link text-white">
                <!-- <Cart /> -->
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
//import Cart from "./Cart.vue";

export default {
  data() {
    return {};
  },
  components: {
    //Cart,
  },
};
</script>

<style>
@media (max-width: 768px) {
  .nav-link.active {
    background-color: rgb(189, 156, 114);
  }
}

@media screen and (min-width: 769px) {
  .nav-link.active {
    border-bottom: solid#FFFFFF 3px;
  }
}
</style>
