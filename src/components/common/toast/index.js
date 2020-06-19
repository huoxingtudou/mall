import Toast from "./Toast"

const obj = {}
obj.install = function (Vue) {

  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.用new的方式，根据组件构造器，创建一个组件对象
  const toast = new toastContrustor()
  // 3.手动挂载
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast

}
export default obj
