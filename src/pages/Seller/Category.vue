<template>
  <q-page>
    <q-card class="q-ma-md" flat>
      <q-pull-to-refresh @refresh="refresh" color="orange-2" bg-color="orange-9" icon="lightbulb">
        <q-list separator >
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6">Categories</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-for="(category, index) in categories" :key="index" :to="`products-by-category/${category.id}`">
            <q-item-section>
              <q-item-label class="text-bold text-uppercase">{{category.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-pull-to-refresh>
    </q-card>
  </q-page>
</template>

<script>
import Category from "src/models/category";
export default {
  name: "Products",
  data() {
    return {
      categories: [],
      input: {
          name: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(done) {
      this.$q.loading.show();
      try {
        this.categories = await Category.orderBy('order').$get();
      } catch (error) {
        console.error(error);
      }finally{
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