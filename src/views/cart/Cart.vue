<template>
  <div class="cart">
    <nav-bar class="cartbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "views/cart/childComps/CartList";
import CartButtonBar from "./childComps/CartButtonBar";
import { mapGetters } from "vuex";
export default {
  name: "Category",
  components: {
    NavBar,
    CartList,
    CartButtonBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }
    ...mapGetters(["cartLength"])
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cartbar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 500;
}
</style>
