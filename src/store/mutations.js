export default {
  AddCounter(state, payload) {
    payload.count++;
  },
  AddCart(state, payload) {
    payload.checked = true;
    state.cartList.push(payload)
  }
}
