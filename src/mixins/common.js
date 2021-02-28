export default {
  methods: {
    formatPrice(price) {
      return `₹ ${parseFloat(price).toFixed(2)}`
    },
    getCurrentPosition(options = {
      enableHighAccuracy: true
    }) {

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            resolve(position)
          },
          function (error) {
            console.log(error)
            reject(error)
          },
          options);
      })
    }
  }
}
