<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>История записей</h3>
      </div>

      <div class="history-chart">
        <canvas ref="canvas"></canvas>
      </div>

      <section>
        <LoaderVue v-if="loading" />
        <p class="center" v-else-if="!records.length">
          записей пока нет
          <router-link to="/New-record">Добавить новую запись</router-link>
        </p>
        <HistoryTable v-else :records="records" />
      </section>
    </div>
  </div>
</template>
<script>
import HistoryTable from "@/components/HistoryTable.vue";
import LoaderVue from "@/components/Loader-vue.vue";
import { Bar } from "vue-chartjs";
export default {
  name: "history-vue",
  components: { HistoryTable, LoaderVue },
  extends: Bar,
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    await this.$store.dispatch("fetchRecords");
    await this.$store.dispatch("fetchCategories");
    this.categories = this.$store.getters.categories;
    this.records = this.$store.getters.records.map((rec) => {
      return {
        ...rec,
        categoryName: this.categories.find(
          (c) => c.id === rec.newRecord.categoryId
        )?.title,
        typeClass: rec.newRecord.type === "income" ? "green" : "red",
        typeText: rec.newRecord.type === "income" ? "Доход" : "Расход",
      };
    });
    this.renderChart({
      labels: this.categories.map((c) => c.title),
      datasets: [
        {
          label: "Расходы по категориям",
          data: this.categories.map((c) => {
            return this.records.reduce((total, r) => {
              if (r.newRecord.categoryId === c.id && r.newRecord.type === 'outcome') {
                total += +r.newRecord.amount
              }
              return total
            }, 0);
          }),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    this.loading = false;
  },
};
</script>
