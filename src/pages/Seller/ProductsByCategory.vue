<template>
  <q-page>
    <q-card class="q-ma-md" flat>
      <q-pull-to-refresh @refresh="refresh" color="orange-2" bg-color="orange-9" icon="lightbulb">
        <q-list separator padding>
          <q-item>
            <q-item-section>
              <q-item-label overline>PRODUCTS</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-btn outline no-caps color="red" @click="$refs.addProductDialog.open()">+ Add</q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-for="(product, index) in products" :key="index">
            <q-item-section>
              <q-item-label>{{product.name}}</q-item-label>
              <q-item-label caption>{{formatPrice(product.price)}}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label>
                <q-btn flat @click="$refs.addProductDialog.open(product)">
                  <q-icon name="edit" />
                </q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-pull-to-refresh>
    </q-card>

    <AddProductDialog :categoryId="categoryId" ref="addProductDialog" @onProductAdd="productAdded" @onProductUpdate="productUpdated"></AddProductDialog>
  </q-page>
</template>

<script>
import Product from "src/models/product";
import AddProductDialog from 'src/components/dialogs/AddProductDialog'
import common from 'src/mixins/common'

export default {
  name: "ProductsByCategory",
  mixins: [common],
  props: ["categoryId"],
  components: {
    AddProductDialog
  },
  data() {
    return {
      dialog: false,
      products: [],
      input: {
        name: "",
        price: 0
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    productAdded(product){
      this.products.unshift(product)
    },
    productUpdated(product){
      let foundIndex = this.products.findIndex(x => x.id === product.id);
      this.products[foundIndex].name = product.name
      this.products[foundIndex].price = product.price
    },
    async getData(done) {
      try {
        let user = this.$store.state.auth.user;
        this.products = await Product.where(
          "category_id",
          this.categoryId
        ).$get();
      } catch (error) {
        console.error(error);
      }
    },
    async refresh(done) {
      await this.getData();
      done(true);
    },
  },
};
</script>

<style>
</style>