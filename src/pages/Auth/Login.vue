<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="q-ma-md">
        <q-item-label class="flex justify-center text-h5 text-red"
          >Jay ambe restaurant</q-item-label
        >
        <q-form @submit.prevent="login">
          <q-card class="q-mt-md">
            <q-card-section class="bg-red text-white text-h6"
              >Seller Login</q-card-section
            >
            <q-card-section>
              <q-input
                type="number"
                v-model="input.phone"
                outlined
                label="Phone number"
              ></q-input>
              <q-input
                type="password"
                class="q-mt-md"
                v-model="input.password"
                outlined
                label="Password"
              ></q-input>
            </q-card-section>
            <q-card-section class="flex justify-end">
              <q-item-label>
                <q-btn flat to="/register" color="primary">Register as a seller</q-btn>
              </q-item-label>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn type="submit" glossy no-caps size="md" class="q-px-lg"
                >Login</q-btn
              >
            </q-card-actions>
          </q-card>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { fcmBus } from "src/boot/fcm";

export default {
  name: "Login",
  data() {
    return {
      input: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      this.$q.loading.show();

      try {
        let response = await this.$api.auth.login(this.input);
        await this.$store.commit('getUserDetails')
        if (!response.user.notification_key) {
        }
        fcmBus.$emit("register-token", response);
        this.$router.replace({ name: "home" });
      } catch (error) {
        console.error(error);
      } finally {
        this.$q.loading.hide();
      }
    },
  },
};
</script>

<style>
</style>