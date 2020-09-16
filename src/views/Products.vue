<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container ec-container my-5">
      <div class="row" v-if="products.length > 0">
        <div class="col-lg-2 col-md-3 mb-2">
          <ul class="list-group rounded-0">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              @click.prevent="filterCategory = ''"
              :class="{ active: filterCategory === '' }"
            >全部商品</a>
            <a
              class="list-group-item list-group-item-action"
              href="#"
              @click.prevent="filterCategory = item"
              :class="{ active: item === filterCategory }"
              v-for="item in categories"
              :key="item"
            >{{ item }}</a>
          </ul>
        </div>
        <div class="col-lg-10 col-md-9">
          <div class="row">
            <div
              class="col-lg-4 col-sm-6 mb-3 mb-4"
              v-for="item in filterCategories"
              :key="item.id"
            >
              <div class="card h-100 rounded-0">
                <router-link :to="`/detail/${ item.id }`">
                  <div
                    style="
                    height: 180px;
                    background-size: cover;
                    background-position: center;
                  "
                    class="rounded-0"
                    :style="{ backgroundImage: `url(${ item.imageUrl[0] })` }"
                  ></div>
                </router-link>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                  <router-link :to="`/detail/${ item.id }`">
                    <h5 class="card-title font-weight-bold text-brown">{{ item.title }}</h5>
                  </router-link>
                  <p class="card-text">{{ item.description }}</p>
                  <div class="text-right pr-2 h6">{{ item.price }} 元</div>
                </div>
                <div class="card-footer d-flex border-top-0 bg-white">
                  <button
                    type="button"
                    class="btn btn-outline-brown btn-block rounded-0"
                    @click.prevent="addToCart(item.id)"
                    :disabled="isProcessing"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    <i v-else class="fa fa-cart-plus" aria-hidden="true"></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "@/utils/Toast";
import fire from "../firebase";

export default {
  data() {
    return {
      status: {
        loadingItem: "",
      },
      products: [],
      carts: [],
      categories: ["甜點", "蛋糕", "餅乾"],
      filterCategory: "",
      isLoading: false,
      isProcessing: false,
    };
  },

  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      let vm = this;
      let products = [];
      fire
        .database()
        .ref("data")
        .once("value", function (snapshot) {
          if (snapshot.exists()) {
            //this.products = Object.keys(snapshot.val());
            snapshot.forEach(function (d) {
              products.push(d.val());
            });
            vm.products = products;
          } else {
            Toast.fire({
              title: "無法取得資料，稍後再試",
              icon: "error",
            });
            this.isLoading = false;
          }
        });
      const { categoryName } = this.$route.params;
      if (categoryName) {
        this.filterCategory = categoryName;
      }
    },
    addToCart() {},
  },

  computed: {
    filterCategories() {
      if (this.filterCategory) {
        return this.products.filter((item) => {
          const data = item.category
            .toLowerCase()
            .includes(this.filterCategory.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
};
</script>

