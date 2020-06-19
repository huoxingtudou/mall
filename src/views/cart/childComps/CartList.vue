<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  components: { Scroll, CartListItem },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.content {
  height: calc(100vh - 44px - 49px - 40px);
  /* height: 100vh; */
  /* margin-bottom: 49px; */
  overflow: hidden;
}
</style>
