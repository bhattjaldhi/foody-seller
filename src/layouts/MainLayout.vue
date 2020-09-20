<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>{{user.shop.name}}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";

import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Home",
    caption: "Your personal dashboard",
    icon: "home",
    link: "/seller",
  },
  {
    title: "Profile",
    caption: "Manage profile",
    icon: "person",
    link: "/seller/profile",
  },
  {
    title: "Orders",
    caption: "Find recent orders you received",
    icon: "receipt",
    link: "/seller/orders",
  },
  {
    title: "Products",
    caption: "Manage your products from here",
    icon: "fastfood",
    link: "/seller/categories",
  },
  {
    title: "Settings",
    caption: "Configure app settings from here",
    icon: "settings",
    link: "/seller/settings",
  },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
