<template>
  <swiper class="imageSwiper">
    <swiper-item v-for="item in topImages" :key="item.index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "DetailSwiper",
  components: { Swiper, SwiperItem },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.imageSwiper {
  height: 300px;
}
</style>
