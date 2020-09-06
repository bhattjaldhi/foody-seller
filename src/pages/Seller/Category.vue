<template>
  <q-page>
    <q-card class="q-ma-md" flat>
      <q-pull-to-refresh @refresh="refresh" color="orange-2" bg-color="orange-9" icon="lightbulb">
        <q-list separator padding>
          <q-item>
            <q-item-section>
              <q-item-label overline>ADD CATEGORY</q-item-label>
              <q-item-label>
                  <q-input borderless label="Write name here..." dense v-model="input.name"></q-input>
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label>
                <q-btn outline no-caps color="red" @click="createCategory">+ Add</q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-for="(category, index) in categories" :key="index">
            <q-item-section>
              <q-item-label>{{category.name}}</q-item-label>
              <q-item-label caption>{{category.products_count}} products</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label>
                <q-btn flat :to="`products-by-category/${category.id}`">
                  <q-icon name="edit" />
                </q-btn>
              </q-item-label>
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
      try {
        let user = this.$store.state.auth.user;
        this.categories = await Category.where("shop_id", user.shop_id).$get();
      } catch (error) {
        console.error(error);
      }
    },
    async createCategory(){
        try {
            let user = this.$store.state.auth.user;

            this.$q.loading.show();

            let category = new Category({});
            category.name = this.input.name;
            category.shop_id = user.shop_id
            category.user_id = user.id
            let res = await category.save()
            

            this.categories.push({...res.data, products_count: 0})


        } catch (error) {
            console.error(error)
        }finally{
            this.input.name = ""
            this.$q.loading.hide()
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