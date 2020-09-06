<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 80vw;">
      <q-card-section>
        <div class="text-h6 text-red">Add product</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="form">
          <q-input label="Product name" v-model="input.name" filled />
          <q-input class="q-mt-md" type="number" v-model="input.price" filled label="Price">
            <template v-slot:append>₹</template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" no-caps outline @click="saveProduct">Save</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Product from "src/models/product";

export default {
  props: ["categoryId"],
  data() {
    return {
      dialog: false,
      product: null,
      input: {
        name: "",
        price: 0,
      },
    };
  },
  methods: {
    open(product = null) {
      this.product = product;

      // if product is going to edit
      if (product) {
        this.input.name = product.name;
        this.input.price = product.price;
      }

      this.dialog = true;
    },
    close() {
      this.product = null;
      this.input.name = "";
      this.input.price = "";
      this.dialog = false;
    },

    async saveProduct() {
      try {
        let user = this.$store.state.auth.user;

        this.$q.loading.show();

        if (this.product) {
          await this.updateProduct();
        } else {
          await this.createProduct();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.$q.loading.hide();
        this.close();
      }
    },
    async createProduct() {
      let product = new Product({});
      product.name = this.input.name;
      product.price = parseInt(this.input.price);
      product.category_id = this.categoryId;
      product.shop_id = user.shop_id;
      product.user_id = user.id;
      let res = await product.save();
      this.$emit("onProductAdd", res.data);
    },
    async updateProduct() {
      let product = await Product.$find(this.product.id);
      product.name = this.input.name;
      product.price = parseInt(this.input.price);
      let res = await product.save();
      this.$emit("onProductUpdate", res.data);
    },
  },
};
</script>

<style>
</style>