<template>
  <q-page>
      <div class="row">
          <div class="col-6"></div>
      </div>
  </q-page>
</template>

<script>
import Shop from "src/models/shops";
import User from "src/models/users";

export default {
    name: "Category",
    mounted(){
        this.getData()
    },
    data(){
        return {
            categories: []
        }
    },
    methods:{
       async getData(){
        try {
            this.$q.loading.show();

            this.categories = await Shop.products(
                Shop.current(this.$store).shop.id
            );
                
            } catch (error) {
                console.error(error);
            } finally {
                this.$q.loading.hide();
            }
        }
    }

}
</script>

<style>

</style>