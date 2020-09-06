export default {
  methods: {
    formatPrice(price) {
      return `₹ ${parseFloat(price).toFixed(2)}`
    }
  }
}
