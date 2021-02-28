<template>
  <div class="q-pa-md">
    <q-pull-to-refresh @refresh="refresh">
      <q-list bordered class="rounded-borders q-mt-md" v-if="orders.length">
        <q-expansion-item
          expand-separator
          v-for="(order, indexO) in orders"
          :key="`order${indexO}`"
        >
          <template v-slot:header>
            <q-item-section>
              <q-item-label>{{ order.user_name }}</q-item-label>
              <q-item-label caption>
                {{ formatDate(order.created_at) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row items-center text-primary">
                {{ formatPrice(parseInt(order.total)) }}
              </div>
            </q-item-section>
          </template>

          <q-list dense padding>
            <q-item>
              <q-item-section>
                <q-btn
                  size="small"
                  class="text-capitalize"
                  flat
                  bordered
                  color="primary"
                  @click="viewLocation(order)"
                >
                  User location
                </q-btn>
              </q-item-section>

              <q-item-section>
                <q-btn
                  size="small"
                  class="text-capitalize"
                  flat
                  outlined
                  color="primary"
                  @click="viewDetails(order)"
                >
                  View details
                </q-btn>
              </q-item-section>
              <q-item-section side>
                <q-select
                  :value="order.status"
                  dense
                  outlined
                  :options="statuses"
                  @input="changeStatus($event, order)"
                  label="Status"
                />
              </q-item-section>
            </q-item>
            <q-item
              v-for="(item, indexI) in orderItems(order)"
              :key="`item${indexO}${indexI}`"
            >
              <q-item-section>
                {{ item.quantity }} x {{ item.name }}
              </q-item-section>
              <q-item-section side>
                {{ formatPrice(item.price) }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
      <div
        class="flex items-center"
        style="height: 80vh"
        v-if="!orders.length && !loadingLoadMore"
      >
        <div class="col justify-center text-center">
          <q-icon name="info" size="55px"></q-icon>
          <div class="q-mt-md">There are no recent orders</div>
        </div>
      </div>
    </q-pull-to-refresh>
    <q-btn
      outline
      color="primary"
      :loading="loadingLoadMore"
      v-if="meta && meta.current_page !== meta.last_page"
      class="full-width q-my-md"
      @click="getOrders"
      >Load more</q-btn
    >
    <OrderDetailDialog ref="refOrderDetailDialog" />
  </div>
</template>

<script>
import Orders from "src/models/order";
import OrderDetailDialog from "src/components/dialogs/OrderDetailDialog";
import moment from "moment";
import CommonMixin from "src/mixins/common";
import { mapGetters } from "vuex";

let statuses = [
  {
    label: "Pending",
    value: "PENDING"
  },
  {
    label: "Ready",
    value: "READY"
  },
  {
    label: "On the way",
    value: "ON_THE_WAY"
  },
  {
    label: "Delivered",
    value: "DELIVERED"
  }
];

export default {
  mixins: [CommonMixin],
  components: {
    OrderDetailDialog
  },
  data() {
    return {
      page: 0,
      limit: 10,
      meta: null,
      loadingLoadMore: false,
      statuses: statuses
    };
  },

  computed: {
    ...mapGetters(["user", "orders"])
  },

  mounted() {
    this.refresh();
  },
  methods: {
    async refresh(done = null) {
      this.page = 0;
      await this.getOrders();
      done && done();
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    },
    orderItems(order) {
      return JSON.parse(order.items);
    },
    async viewLocation(order) {
      try {
        let position = await this.getCurrentPosition();
        let url = "https://maps.google.com/maps?";
        url += `saddr=${position.coords.latitude +
          "," +
          position.coords.longitude}&`;
        url += `daddr=${order.user_latitude + "," + order.user_longitude}&`;
        window.open(url);
      } catch (error) {
        console.error(error.message);
        this.$q.notify({
          type:'negative',
          message: 'Please enable location'
        })
      }
    },
    viewDetails(order) {
      this.$refs.refOrderDetailDialog.open(order);
    },
    async changeStatus(event, order) {
      this.$q.loading.show();
      let _order = Object.assign(
        Object.create(Object.getPrototypeOf(order)),
        order
      );
      _order.status = event.value;
      await _order.save();

      this.$store.dispatch("updateOrder", _order);
      this.$api.firebase.sendNotification(
        _order.fcm_token,
        `Foody : ${this.user.shop.name}`,
        `Your order status has been updated to ${_order.status}`,
        {
          type: "UPDATE_ORDER_STATUS",
          payload: { orderId: _order.id, status: _order.status }
        }
      );
      this.$q.loading.hide();
    },
    async getOrders() {
      this.page++;
      this.$q.loading.show();
      try {
        this.loadingLoadMore = true;
        let res = await Orders.where("shop_id", this.user.shop_id)
          .page(this.page)
          .limit(this.limit)
          .orderBy("-updated_at")
          .get();

        if (res.meta.current_page === 1 && !res.data.length) {
          this.$store.commit("orders", []);
        } else {
          this.meta = res.meta;
          if (res.meta.current_page === 1) {
            this.$store.commit("orders", res.data);
          } else {
            this.$store.commit("orders", this.orders.concat(res.data));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingLoadMore = false;
        this.$q.loading.hide();
      }
    }
  }
};
</script>

<style></style>
