<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row justify-content-center"
           v-if="carts.length > 0">
        <div class="ec-container col-md-6 bg-white py-5">
          <div class="d-flex justify-content-between mb-5">
            <h2 class="mt-2 text-brown font-weight-bold">購物車</h2>
            <a href="#"
               class="h2"
               @click.prevent="removeAllCartItem()">
              <i class="fas fa-times"></i>
            </a>
          </div>
          <div v-for="item in carts"
               :key="item.product.id + 1">
            <div class="d-flex mt-4 bg-light">
              <div style="
                    width: 130px;
                    background-size: cover;
                    background-position: center;
                  "
                   class="rounded-0"
                   :style="{ backgroundImage: `url(${ item.product.imageUrl[0] })` }">
              </div>
              <div class="w-100 p-3 position-relative">
                <a href="#"
                   @click.prevent="removeCartItem(item.product.id)"
                   class="position-absolute"
                   style="top: 16px; right: 16px;">
                  <i class="fas fa-times"></i>
                </a>
                <p class="mb-0 font-weight-bold">
                  {{ item.product.title }}
                </p>
                <p class="mb-1 text-muted"
                   style="font-size: 14px;">
                  {{ item.product.content }}
                </p>
                <div class="d-flex justify-content-between align-items-center w-100 mt-3">
                  <div class="input-group w-50 align-items-center">
                    <div class="input-group-append pr-1">
                      <button class="btn btn-outline-brown btn-sm border-0"
                              @click.prevent="quantityUpdate(item.product.id, item.quantity - 1)"
                              :disabled="item.quantity === 1">
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                    <input id="quantity"
                           type="number"
                           class="form-control border-0
                             text-center my-auto shadow-none bg-light px-0"
                           :value="item.quantity"
                           @change="quantityUpdate(item.product.id, $event.target.value)"
                           disabled />
                    <div class="input-group-prepend">
                      <button class="btn btn-outline-brown btn-sm border-0"
                              @click.prevent="quantityUpdate(item.product.id, item.quantity + 1)"
                              :disabled="item.quantity === 5">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <p class="mb-0 ml-auto info-text">
                    {{ item.product.price | money }}/{{ item.product.unit }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-left: 124px;">
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 font-weight-bold">總計</p>
              <p class="mb-0 h4 font-weight-bold">
                {{ cartTotal | money }}
              </p>
            </div>

          </div>
          <div class="d-flex mt-4 justify-content-between
                align-items-md-center align-items-end w-100">
            <router-link to="/products"
                         class="text-dark mt-5 h5">
              <i class="fas fa-chevron-left mr-1"></i>
              繼續購物
            </router-link>
            <router-link to="/order"
                         class="btn btn-brown mt-5 rounded-0">
              確認訂單
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex justify-content-center my-7">
          <h2 class="mb-5 mt-5 warning-text">購物車無商品，快去逛逛</h2>
        </div>
        <div class="d-flex justify-content-end">
          <router-link to="/products" class="text-dark ">
            <h4>繼續購物</h4>
          </router-link>
        </div>
      </div>
      <div class="mt-7">
        <Category />
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '@/utils/Toast'
import Category from '@/components/Category.vue'
// import fire from '../firebase'

export default {
  data () {
    return {
      carts: {},
      cartTotal: 0,
      isLoading: false
    }
  },
  components: {
    Category
  },
  created () {
    this.getCart()
  },
  methods: {
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http
        .get(url)
        .then((res) => {
          this.carts = res.data.data
          this.updateTotal()
          this.isLoading = false
        })
        .catch(() => {
          Toast.fire({
            title: '無法取得資料，稍後再試',
            icon: 'error'
          })
          this.isLoading = false
        })
    },
    updateTotal () {
      let total = 0
      this.carts.forEach((item) => {
        total += item.product.price * item.quantity
      })
      this.cartTotal = total
    },
    quantityUpdate (id, quantity) {
      this.isLoading = true
      if (quantity <= 0) return
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: id,
        quantity
      }
      this.$http
        .patch(url, cart)
        .then(() => {
          this.getCart()
          Toast.fire({
            text: '商品已更正數量',
            icon: 'success'
          })
          this.isLoading = false
        })
        .catch(() => {
          Toast.fire({
            title: '商品無法更新數量，稍後再試',
            icon: 'error'
          })
          this.isLoading = false
        })
    },
    removeAllCartItem () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.$http
        .delete(url)
        .then(() => {
          this.$bus.$emit('update-total')
          this.getCart()
          Toast.fire({
            text: '商品已全部刪除',
            icon: 'success'
          })
          this.isLoading = false
          this.$router.push('/products')
        })
        .catch(() => {
          Toast.fire({
            text: '商品刪除失敗',
            icon: 'error'
          })
          this.isLoading = false
        })
    },
    removeCartItem (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.$http
        .delete(url)
        .then(() => {
          this.$bus.$emit('update-total')
          this.getCart()
          Toast.fire({
            text: '商品已刪除',
            icon: 'success'
          })
          this.isLoading = false
        })
        .catch(() => {
          Toast.fire({
            text: '商品刪除失敗',
            icon: 'error'
          })
          this.isLoading = false
        })
    }
  }
}
</script>
