<template>
  <q-page>
    <q-pull-to-refresh
      @refresh="refresh"
      color="orange-2"
      bg-color="orange-9"
      icon="lightbulb"
    >
      <q-card flat bordered class="my-card bg-grey-1 q-ma-md">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">Products</div>
              <div class="text-subtitle2">
                {{ shop.products_count }} products by {{ shop.name }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section
          >In this section You easily add, remove products and it's categories
          from here.</q-card-section
        >

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat @click="$router.push({ name: 'categories' })"
            >Manage</q-btn
          >
        </q-card-actions>
      </q-card>
      <q-card flat bordered class="my-card bg-grey-1 q-ma-md">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">Orders</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section
          >This section provides facility to manage orders, payments and
          delivery.</q-card-section
        >

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat @click="$router.push({ name: 'orders' })">Manage</q-btn>
        </q-card-actions>
      </q-card>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import User from "src/models/users";
import Shop from "src/models/shops";
export default {
  name: "PageIndex",
  data() {
    return {
      shop: {},
    };
  },
  mounted() {
    this.getProductCount();
  },
  methods: {
    async getProductCount() {
      try {
        this.$q.loading.show();
        let shops = await Shop.where('id', User.current(this.$store).shop.id).$get();
        if(shops.length)
          this.shop = shops[0]
      } catch (error) {
        console.error(error);
      } finally {
        this.$q.loading.hide();
      }
    },
    async refresh(done) {
      await this.getProductCount();
      done();
    },
  },
};
</script>
