<template>
  <div class="my-7">
    <h4 class="font-weight-bold">商品介紹</h4>
    <div class="row">
      <div class="col-lg-4 my-4">
        <div class="card border-0 mb-4">
          <a href="#" @click.prevent="toCategory('甜點')">
            <div
              style="
                    height: 300px;
                    background-size: cover;
                    background-position: center;
                    background-image:url('https://images.unsplash.com/photo-1505253892657-6fcc8796949c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80')
                  "
              class="rounded-0"
            ></div>
          </a>
          <div class="card-body p-0">
            <h4 class="mb-0 mt-4">甜點</h4>
            <div class="d-flex justify-content-between mt-3">
              <p class="card-text text-muted mb-0 w-75">精緻外表加上豐富口感，細細品嚐最幸福</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 my-4">
        <div class="card border-0 mb-4">
          <a href="#" @click.prevent="toCategory('蛋糕')">
            <div
              style="
                    height: 300px;
                    background-size: cover;
                    background-position: center;
                    background-image:url('https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1247&q=80')
                  "
              class="rounded-0"
            ></div>
          </a>
          <div class="card-body p-0">
            <h4 class="mb-0 mt-4">蛋糕</h4>
            <div class="d-flex justify-content-between mt-3">
              <p class="card-text text-muted mb-0 w-75">想品嘗戀愛的好，先來吃一口甜而不膩的蛋糕</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 my-4">
        <div class="card border-0 mb-4">
          <a href="#" @click.prevent="toCategory('餅乾')">
            <div
              style="
                    height: 300px;
                    background-size: cover;
                    background-position: center;
                    background-image:url('https://images.unsplash.com/photo-1557310717-d6bea9f36682?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80')
                  "
              class="rounded-0"
            ></div>
          </a>
          <div class="card-body p-0">
            <h4 class="mb-0 mt-4">餅乾</h4>
            <div class="d-flex justify-content-between mt-3">
              <p class="card-text text-muted mb-0 w-75">新鮮烘焙、手工製作，就是想把幸福的美味分享給你各位</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toCategory(Name) {
      this.$router.push({
        name: "products",
        params: { categoryName: Name },
      });
    },
  },
};
</script>
