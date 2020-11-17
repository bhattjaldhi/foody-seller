<template>
   <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="q-ma-md">
        <q-item-label class="flex justify-center text-h5 text-red">Foody Seller</q-item-label>
        <q-form @submit.prevent="login">
          <q-card class="q-mt-md">
            <q-card-section class="bg-red text-white text-h6">Register as a seller</q-card-section>
            <q-card-section>
              <q-input type="number" v-model="input.phone" outlined label="Phone number"></q-input>
              <q-input type="password" class="q-mt-md" v-model="input.password" outlined label="Password"></q-input>
              <q-card-actions align="right" class="q-mt-md">
                <q-btn type="submit" glossy no-caps size="md" class="q-px-lg">Login</q-btn>
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script>
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
      try {
        let response = await this.$api.auth.login(this.input);
        this.$router.replace({ name: "SelectShop" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
</style>