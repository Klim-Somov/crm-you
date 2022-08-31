<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Планирование</h3>
        <h4>{{ getBill }} руб.</h4>
      </div>
      <LoaderVue v-if="loading" />

      <p v-else-if="!categories.length" class="center">
        категорий пока нет.
        <router-link to="/categories">добавить</router-link>
      </p>
      <section v-else>
        <div v-for="cat of categories" :key="cat.id">
          <p>
            <strong>{{ cat.title }}:</strong>
            {{ cat.spend | currency }} из {{ cat.limit | currency }}
          </p>
          <div class="progress" v-tooltip="cat.tooltip">
            <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{ width: cat.progresPercent + '%' }"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import LoaderVue from "@/components/Loader-vue.vue";

export default {
  name: "planing-vue",
  data: () => ({
    loading: true,
    categories: [],
    records: [],
  }),
  computed: {
    getBill() {
      return this.$store.getters.info.bill;
    },
  },
  async mounted() {
  
    await this.$store.dispatch("fetchRecords");
    await this.$store.dispatch("fetchCategories");
    this.records = this.$store.getters.records;

    this.categories = this.$store.getters.categories.map((cat) => {
      const spend = this.records
        .filter((r) => r.newRecord.categoryId === cat.id)
        .filter((r) => r.newRecord.type === "outcome")
        .reduce((total, record) => {
          return (total += record.newRecord.amount);
        }, 0);
      const percent = (100 * spend) / cat.limit;
      const progresPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
        
        const tooltipValue = cat.limit - spend
        const tooltip =`${tooltipValue < 0 ? "превышено на" : "осталось"} ${Math.abs(tooltipValue)}`

      return {
        ...cat,
        progresPercent,
        progressColor,
        spend,
        tooltip
      };
    });
    this.loading = false;
  },
  components: { LoaderVue },
};
</script>
