<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <q-form ref="form" @submit.prevent="saveUser" v-if="input">
          <q-card class="q-ma-md">
            <q-card-section>
              <div class="text-h6">User profile</div>
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="input.name"
                label="Name"
                :rules="validation.name"
              />
              <q-input
                v-model="input.phone"
                label="Phone"
                :rules="validation.phone"
              />
              <q-input
                v-model="input.email"
                label="Email"
                :rules="validation.email"
              />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                outline
                label="Save"
                class="text-capitalize"
                color="primary"
                type="submit"
                :disable="loadingUserAction || loadingShopAction"
                :loading="loadingUserAction"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-form>
        <q-form ref="form" @submit.prevent="saveShop" v-if="input">
          <q-card class="q-ma-md">
            <q-card-section>
              <div class="text-h6">Shop details</div>
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="input.shop.name"
                label="Name"
                :rules="validation.name"
              />
              <q-input
                v-model="input.shop.address"
                label="Address"
                :rules="validation.address"
              />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                outline
                label="Save"
                class="text-capitalize"
                color="primary"
                type="submit"
                :disable="loadingShopAction || loadingUserAction"
                :loading="loadingShopAction"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import User from "src/models/users";
import Shop from "src/models/shops";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      input: null,
      loadingUserAction: false,
      loadingShopAction: false,
      validation: {
        name: [(v) => !!v || "Name is required"],
        phone: [(v) => !!v || "Phone is required"],
        email: [(v) => !!v || "Email is required"],
        address: [(v) => !!v || "Address is required"],
      },
    };
  },
  watch: {
      user(newVal){
          this.input = newVal
      }
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.input = { ...this.user };
  },
  methods: {
    async saveUser() {
      try {
        this.loadingUserAction = true;
        let user = await User.$find(this.input.id)
        user.name = this.input.name
        user.phone = this.input.phone
        user.email = this.input.email
        await user.save()
        this.$store.dispatch("getUserDetails");
        this.$q.notify({
            type: 'positive',
            message: 'User details have been updated successfully'
        })
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingUserAction = false;
      }
    },
    async saveShop() {
      try {
        this.loadingShopAction = true;
        let shop = await Shop.$find(this.input.shop.id)
        shop.name = this.input.shop.name
        shop.address = this.input.shop.address
        await shop.save()
        this.$store.dispatch("getUserDetails");
        this.$q.notify({
            type: 'positive',
            message: 'Shop details have been updated successfully'
        })
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingShopAction = false;
      }
    },
  },
};
</script>

<style>
</style>