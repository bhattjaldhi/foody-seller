import Model from './'

export default class Shop extends Model {
  resource() {
    return 'shops'
  }

  async products_count(shopId) {
    let result = await super.request({
      method: 'get',
      url: `/shop/${shopId}/products_count`,
    })
    return result.data
  }
}
