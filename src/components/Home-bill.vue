<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
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


export default {
  props: ["rates"],
  data(){
    return {
      currency: ['RUB','USD', 'EUR']
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
  }
};
</script>
