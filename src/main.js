import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from "axios" //全局引入axios,在任意子组件下都能使用

const app = createApp(App);
installElementPlus(app);

const baseURL = "http://localhost:3000";

axios.defaults.baseURL = baseURL; //配置url前缀
axios.defaults.withCredentials = true;  //加这条权限  不然不会携带cookie数据随着请求走
app.config.globalProperties.$axios = axios;  //设置全局的axios,为所有的组件实例添加$axios属性

app.use(store).use(router).mixin({ 
    data(){
        return {
            baseURL
        }
    }
}).mount('#app');