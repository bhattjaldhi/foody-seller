<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 100vh" v-if="order">
      <q-card-section class="q-pl-none">
        <q-btn
          class="text-capitalize"
          icon="close"
          rounded
          flat
          label="Order detail"
          v-close-popup
        ></q-btn>
      </q-card-section>
      <q-card-section>
        <q-card bordered flat>
          <q-card-section>
            <div class="text-bold text-subtitle1">Customer details:</div>
            <div>
              <span class="text-bold">Name: </span> {{ order.user_name }}
            </div>
            <div>
              <span class="text-bold">Phone:</span> {{ order.user_phone }}
            </div>
            <div>
              <span class="text-bold">address:</span> {{ order.user_address }}
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section>
        <q-list dense>
          <q-item v-for="(item, indexI) in orderItems" :key="`item${indexI}`">
            <q-item-section>
              {{ item.quantity }} x {{ item.name }}
            </q-item-section>
            <q-item-section side>
              {{ formatPrice(item.price) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section v-if="order.comment">
        <div class="text-bold">Comment:</div>
        <div class="text-body2">{{ order.comment }}</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          @click="viewLocation"
          outline
          color="primary"
          class="text-capitalize"
          >View location</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import CommonMixin from "src/mixins/common";

export default {
  mixins: [CommonMixin],
  data() {
    return {
      dialog: false,
      order: null,
    };
  },
  computed: {
    orderItems() {
      return JSON.parse(this.order.items);
    },
  },
  methods: {
    open(order) {
      this.dialog = true;
      this.order = order;
    },
    viewLocation() {
      window.open(
        "geo:" + this.order.user_latitude + "," + this.order.user_longitude
      );
    },
  },
};
</script>

<style>
</style>