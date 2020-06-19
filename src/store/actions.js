export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.id === payload.id)
      if (oldProduct) {
        context.commit('AddCounter', oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit('AddCart', payload)
        resolve('添加了商品')
      }
    })
  }
}
