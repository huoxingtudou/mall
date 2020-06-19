<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="@/assets/img/tabber/home.svg" alt />
        <img slot="item-icon-active" src="@/assets/img/tabber/home_active.svg" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="@/assets/img/tabber/category.svg" alt />
        <img slot="item-icon-active" src="@/assets/img/tabber/category_active.svg" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart">
        <img slot="item-icon" src="@/assets/img/tabber/shopcart.svg" alt />
        <img slot="item-icon-active" src="@/assets/img/tabber/shopcart_active.svg" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img slot="item-icon" src="@/assets/img/tabber/profile.svg" alt />
        <img slot="item-icon-active" src="@/assets/img/tabber/profile_active.svg" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/common/tabber/TabBar";
import TabBarItem from "@/components/common/tabber/TabBarItem";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
</style>
