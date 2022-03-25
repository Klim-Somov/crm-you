<template>
  <div class="app-page">
    
    <div>
      <div class="page-title title white-text">
        <h3 >Счет</h3>

        <button class="btn waves-effect waves-light btn-small">
          <i class="material-icons">refresh</i>
        </button>
      </div>
      <loader v-if="loading" />
      <div v-else class="row">
        <Home-bill :rates="currency.rates" />

        <Home-currensy :rates="currency.rates" :date="date" />
      </div>
    </div>
  </div>
</template>

<script>

import HomeCurrensy from "@/components/Home-currensy";
import HomeBill from "@/components/Home-bill.vue";
import Loader from "@/components/Loader-vue.vue";

export default {
  name: "home-vue",
  data() {
    return {
      loading: true,
      currency: null,
      date: new Date(),
    };
  },
  async mounted() {
    

    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
    await this.$store.dispatch("getUserid");
   
  },

  components: { HomeBill, HomeCurrensy, Loader },
};
</script>
<style  scoped>

</style>