<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button @click.native="checkClick" :is-checked="isSelectAll" class="check-button" />
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算:({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartButtonBar",
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.getters.cartList.length === 0) return false;
      return !this.$store.getters.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.getters.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        this.$store.getters.cartList.forEach(item => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品");
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  display: flex;
}
.check-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
