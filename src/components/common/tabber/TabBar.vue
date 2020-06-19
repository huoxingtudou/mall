<template>
  <div id="tab-bar" class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  }
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  justify-content: space-evenly;
  background-color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.1);
}
</style>
