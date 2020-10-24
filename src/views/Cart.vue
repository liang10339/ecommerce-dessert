<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row justify-content-center" v-if="carts.length != 0">
        <div class="ec-container col-md-6 bg-white py-5">
          <div class="d-flex justify-content-between mb-5">
            <h2 class="mt-2 text-brown font-weight-bold">購物車</h2>
          </div>
          <div v-for="item in carts" :key="item.product.id + 1">
            <div class="d-flex mt-4 bg-light">
              <div style="width: 130px; background-size: cover; background-position: center;"
                   class="rounded-0"
                   :style="{ backgroundImage: `url(${ item.product.imageUrl[0] })` }">
              </div>
              <div class="w-100 p-3 position-relative">
                <a href="#" class="position-absolute" style="top: 16px; right: 16px;"
                   @click.prevent="removeCartItem(item.product.id)">
                  <span aria-hidden="true">&times;</span>
                </a>
                <p class="mb-0 font-weight-bold">
                  {{ item.product.title }}
                </p>
                <p class="mb-1 text-muted" style="font-size: 14px;">
                  {{ item.product.description }}
                </p>
                <div class="d-flex justify-content-between align-items-center w-100 mt-3">
                  <div class="input-group w-50 align-items-center">
                    <div class="input-group-append pr-1">
                      <button class="btn btn-outline-brown btn-sm border-0"
                              @click.prevent="quantityUpdate(item.product.id, item.quantity - 1)"
                              :disabled="item.quantity === 1">
                        <span class="glyphicon">&#x2212;</span>
                      </button>
                    </div>
                    <input id="quantity" type="number" class="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                           :value="item.quantity"
                           @change="quantityUpdate(item.product.id, $event.target.value)"
                           disabled />
                    <div class="input-group-prepend">
                      <button class="btn btn-default btn-sm"
                              @click.prevent="quantityUpdate(item.product.id, item.quantity + 1)"
                              :disabled="item.quantity === 5">
                        <span class="glyphicon">&#x2b;</span>
                      </button>
                    </div>
                  </div>
                  <p class="mb-0 ml-auto info-text">
                    {{ item.product.price }} 元
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-left: 124px;">
            <div class="d-flex justify-content-between mt-5">
              <p class="mb-0 h4 font-weight-bold">總計</p>
              <p class="mb-0 h4 font-weight-bold">
                {{ cartTotal }}
              </p>
            </div>

          </div>
          <div class="d-flex mt-4 justify-content-between
                align-items-md-center align-items-end w-100">
            <router-link to="/products" class="text-dark mt-5 h5">
              繼續購物
            </router-link>
            <router-link to="/order" class="text-dark mt-5 h5">
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
import fire from '../firebase'

export default {
  data () {
    return {
      carts: [],
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
      const vm = this
      const list = []
      const carts = []
      vm.isLoading = true
      fire.database().ref('cart').once('value', function (snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function (d) {
            list.push(Object.keys(d.val()))
            carts.push(d.val())
          })
          vm.carts = carts
          for (const item in list) {
            fire.database().ref('data').child(item).once('value', function (snapshot) {
              vm.carts[item].product = snapshot.val()
            })
          }
          vm.updateTotal()
        } else {
          Toast.fire({
            title: '無法取得資料，稍後再試',
            icon: 'error'
          })
        }
        vm.isLoading = false
      })
      const { categoryName } = vm.$route.params
      if (categoryName) {
        vm.filterCategory = categoryName
      }
    },
    updateTotal () {
      const vm = this
      let total = 0
      let itemPrice = 0
      let itemQuantity = 0
      for (const item in vm.carts) {
        fire.database().ref('data').child(item).once('value', function (snapshot) {
          itemPrice = snapshot.val().price
          itemQuantity = vm.carts[item].quantity
          total += itemPrice * itemQuantity
          vm.cartTotal = total
        })
      }
    },
    quantityUpdate (id, quantity) {
      this.isLoading = true
      if (quantity <= 0) return
      if (fire.database().ref('cart').child(id).update({ quantity: quantity })) {
        this.getCart()
        Toast.fire({
          text: '商品已更正數量',
          icon: 'success'
        })
        this.isLoading = false
      } else {
        Toast.fire({
          title: '商品無法更新數量，稍後再試',
          icon: 'error'
        })
        this.isLoading = false
      }
    },
    removeCartItem (id) {
      this.isLoading = true
      fire.database().ref('cart').child(id).remove()
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
