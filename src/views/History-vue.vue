<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>История записей</h3>
      </div>

      <div class="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <LoaderVue v-if="loading" />
        <p class="center" v-else-if="!records.length">записей пока нет
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

export default {
  name: "history-vue",
  components: { HistoryTable, LoaderVue },
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
        categoryName: this.categories.find((c) => c.id === rec.newRecord.categoryId)?.title,
        typeClass: rec.newRecord.type === "income" ? "green" : "red",
        typeText: rec.newRecord.type === "income" ? "Доход" : "Расход",
      };
    });
    this.loading = false;    console.log(this.records);
  },
};
</script>
