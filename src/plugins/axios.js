import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        // Instância axios para manter as configurações
        Vue.prototype.$http = axios.create({
            baseURL: 'https://controle-de-financas-mega-default-rtdb.firebaseio.com/',
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {
            const array = []
            for (let key in res.data) {
                array.push({ id: key, ...res.data[key]})
            }
            res.data = array
            return res
        }, error => Promise.reject(error))
    }
})