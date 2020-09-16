<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container ec-container mt-3" v-if="products.imageUrl[0]">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/products">全部商品</router-link>
              </li>
              <li class="breadcrumb-item active text-brown" aria-current="page">{{ products.title }}</li>
            </ol>
          </nav>
          <div class="row mb-5">
            <div class="col-lg-6">
              <div
                style="
                    height: 350px;
                    background-size: cover;
                    background-position: center;
                  "
                class="rounded-0"
                :style="{ backgroundImage: `url(${ products.imageUrl[0] })` }"
              >

              </div>
            </div>
            <div class="col-lg-6">
              <h2 class="font-weight-bold text-brown">{{ products.title }}</h2>
              <p>{{ products.description }}</p>
              <p class="mt-5">
                【 商品說明 】
                <br />
              </p>
              <p v-html="products.description"></p>
              <div class="d-flex flex-column align-items-end mb-3">
                <p
                  class="mb-0 h5 font-weight-bold text-right"
                >{{ products.price }} 元</p>
              </div>
              <div class="d-flex">
                <div class="w-50 mr-3">
                  <select name="unit" class="form-control mr-3 rounded-0" v-model="products.num">
                    <option :value="num" v-for="num in 5" :key="num">{{ num }} </option>
                  </select>
                </div>
                <button
                  type="button"
                  class="btn btn-brown w-50 rounded-0"
                  @click.prevent="addToCart(products,)"
                  :disabled="isProcessing"
                >
                  <i class="fas fa-spinner fa-spin" v-if="products.id === status.loadingItem"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '@/utils/Toast'
import fire from '../firebase'

export default {
  data () {
    return {
      status: {
        loadingItem: ''
      },
      products: [],
      isLoading: false,
      isProcessing: false
    }
  },

  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      const vm = this
      const { id } = this.$route.params
      this.isLoading = true
      fire
        .database()
        .ref(`data/${id}`)
        .once('value', function (snapshot) {
          if (snapshot.exists()) {
            vm.products = snapshot.val()
            vm.isLoading = false
          } else {
            Toast.fire({
              title: '無法取得資料，稍後再試',
              icon: 'error'
            })
            this.isLoading = false
          }
        })
    },
    addToCart () {}
  }
}
</script>
