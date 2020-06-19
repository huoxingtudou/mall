<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramsInfo"></detail-param-info>
      <detail-comment-info ref="comments" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommends" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <detail-bottom-bar @addCart="addTopCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar";
import DetailSwiper from "views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "views/detail/childComps/DetailBottomBar";
import BackTop from "components/content/backtop/BackTop";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";
import Toast from "components/common/toast/Toast";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShow: false,
      message: "",
      show: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop
    // Toast
  },
  created() {
    this.id = this.$route.params.id;
    getDetail(this.id).then(res => {
      // 顶部轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 店铺信息
      this.shop = new Shop(data.shopInfo);
      // 详情数据
      this.detailInfo = data.detailInfo;
      // 参数
      this.paramsInfo = new GoodsParam(data.itemParams, data.itemParams.rule);
      // 商品信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.comments.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.recommends.$el.offsetTop - 44);
      // console.log(this.themeTopY);
    },
    debounce(func, delay) {
      let timer = null;

      return function(...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 500);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopY.length;
      for (let i in this.themeTopY) {
        i = parseInt(i);
        // if (
        //   positionY > this.themeTopY[i] &&
        //   positionY < this.themeTopY[i + 1]
        // ) {
        //   console.log(i);
        // }
        if (
          (this.currentIndex != i &&
            i < length - 1 &&
            positionY >= this.themeTopY[i] &&
            positionY < this.themeTopY[i + 1]) ||
          (i === length - 1 && positionY >= this.themeTopY[i])
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShow = -position.y > 1000;
    },
    addTopCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.id = this.id;

      // 将商品添加到购物车中
      this.addCart(product).then(res => {
        this.$toast.show(res);
      });
    }
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemclick", this.itemListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: white;
  /* height: 100vh; */
}
.content {
  height: 100vh;
  /* margin-top: 44px; */
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
