import BackTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    this.itemListener = () => {
      refresh();
    };
    this.$bus.$on("itemclick", this.itemListener);
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShow = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
  },

}
