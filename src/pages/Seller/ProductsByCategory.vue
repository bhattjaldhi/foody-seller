<template>
  <q-page>
    <q-card class="q-ma-md" flat>
      <q-pull-to-refresh
        @refresh="refresh"
        color="orange-2"
        bg-color="orange-9"
        icon="lightbulb"
      >
        <q-list separator padding>
          <q-item>
            <q-item-section>
              <q-item-label overline>PRODUCTS</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-btn
                  outline
                  no-caps
                  color="red"
                  @click="$refs.addProductDialog.open()"
                  >+ Add</q-btn
                >
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-for="(product, index) in products" :key="index">
            <q-item-section>
              <q-item-label>{{ product.name }}</q-item-label>
              <q-item-label caption>{{
                formatPrice(product.price)
              }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label>
                <q-toggle v-model="product.is_available" @input="onChangeAvailable($event, product)"></q-toggle>
                <q-btn flat @click="$refs.addProductDialog.open(product)">
                  <q-icon name="edit" />
                </q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-pull-to-refresh>
    </q-card>

    <AddProductDialog
      :categoryId="categoryId"
      ref="addProductDialog"
      @onProductAdd="productAdded"
      @onProductUpdate="productUpdated"
    ></AddProductDialog>
  </q-page>
</template>

<script>
import Product from "src/models/product";
import AddProductDialog from "src/components/dialogs/AddProductDialog";
import common from "src/mixins/common";

export default {
  name: "ProductsByCategory",
  mixins: [common],
  props: ["categoryId"],
  components: {
    AddProductDialog,
  },
  data() {
    return {
      dialog: false,
      products: [],
      input: {
        name: "",
        price: 0,
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    productAdded(product) {
      this.products.unshift(product);
    },
    productUpdated(product) {
      let foundIndex = this.products.findIndex((x) => x.id === product.id);
      this.products[foundIndex].name = product.name;
      this.products[foundIndex].price = product.price;
    },
    async onChangeAvailable(value, product){
      product.is_available = value
      await product.save()
    },
    async getData(done) {
      this.$q.loading.show();
      try {
        let user = this.$store.state.auth.user;
        let products = await Product.where("category_id", this.categoryId)
          .where("user_id", user.id)
          .orderBy("-updated_at")
          .$get();

        this.products = products.map((x) => {
          x.is_available = x.is_available ? true : false;
          return x;
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.$q.loading.hide();
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