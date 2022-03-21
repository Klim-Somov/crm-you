<template>
  <div class="col s12 m6 l4">
    <loader-vue v-if="loading"/>
    <div v-else class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p 
        v-for="cur of currency"
        :key="cur"
        class="currency-line">
          <span>{{getCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import LoaderVue from './Loader-vue.vue';


export default {
  components: { LoaderVue },
  props: ["rates"],
  data(){
    return {
      currency: ['RUB','USD', 'EUR'],
      loading:true
    }
  },
  computed: {
    base() {
       return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
       
    },
  },
  methods: {
    getCurrency(cur) {
      return Math.floor(this.base * this.rates[cur])
      
    }
  },
   mounted() {
     
     setInterval(() => {
       this.loading = false  
     }, 1000);
  }
  
};
</script>
