import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.Filter";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/Loader-vue";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Particles from "particles.vue";
import tooltipDirective from "@/directives/tooltip.directive";

Vue.config.productionTip = false;

Vue.use(Particles);
Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader-vue.", Loader);

let auth = getAuth();
let app;

onAuthStateChanged(auth, () => {

  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
