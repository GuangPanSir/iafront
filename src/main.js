import './assets/reset.css'
import './assets/rem'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vehistogram from 'v-charts/lib/histogram.common'
import user from '@/js/global'
import { Button,Tabbar, TabbarItem,Popup,Icon, NoticeBar,Divider,Uploader,Field,Form,Picker,Loading,Overlay,Sticky,DatetimePicker
,Cell,CellGroup,NavBar } from 'vant';

Vue.use(Button).use(Tabbar).use(TabbarItem).use(Popup).use(Icon).use(NoticeBar)
        .use(Divider).use(Uploader).use(Field).use(Form).use(Picker).use(Loading)
        .use(Overlay).use(Sticky).use(DatetimePicker).use(Cell).use(CellGroup)
        .use(NavBar);
Vue.component(Vehistogram.name, Vehistogram);
Vue.prototype.$user = user;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://192.168.43.127:8082/graduation';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});
