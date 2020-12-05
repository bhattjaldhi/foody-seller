0<template>
  <q-page>
    <div class="q-pa-md">
      <q-form @submit.prevent="saveSettings">
        <q-card bordered flat v-if="input">
          <q-card-section>
            <span class="text-h6">Settings</span>
          </q-card-section>
          <q-card-section>
            <q-toggle v-model="input.shop.is_online" true-value="1" false-value="0" label="Online" @input="changeOnline"></q-toggle>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="input.shop.delivery_charge"
              label="Delivery charge"
              :rules="validation.charge"
              type="number"
              suffix="₹"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              outline
              label="Save"
              class="text-capitalize"
              color="primary"
              type="submit"
              :disable="loading"
              :loading="loading"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
      <q-list bordered separator class="q-mt-md">
        <q-item clickable v-ripple="{ color: 'primary' }" @click="logout">
          <q-item-section class="text-red">Logout</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import Shop from "src/models/shops";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      input: null,
      validation: {
        charge: [(v) => (!!v && v != 0) || "Amount should be valid"],
      }
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch:{
    user(newVal){
      this.input = {...newVal}
    }
  },
  async mounted() {
    this.$q.loading.show()
    await this.$store.dispatch("getUserDetails");
    this.input = { ...this.user };
    this.$q.loading.hide()
  },
  methods: {
    logout() {
      this.$api.auth.logout();
      this.$router.replace("/");
    },
    async changeOnline(value){
        let shop = await Shop.$find(this.input.shop.id);
        shop.is_online = value;
        shop.save();
    },
    async saveSettings() {
      try {
        this.loading = true;
        let shop = await Shop.$find(this.input.shop.id);
        shop.delivery_charge = this.input.shop.delivery_charge;
        await shop.save();
        this.$q.notify({
          type: "positive",
          message: "Settings have been updated successfully",
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>