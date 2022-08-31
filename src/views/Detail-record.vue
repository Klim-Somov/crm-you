<template>
  <div class="app-page">
    <div>
      <div>
        <div class="breadcrumb-wrap">
          <a href="/History-vue" class="breadcrumb">История</a>
          <a class="breadcrumb"> Расход </a>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card red">
              <div class="card-content white-text">
                <p>Описание:</p>
                <p>Сумма:</p>
                <p>Категория:</p>

                <small>12.12.12</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <script>
export default {
  name: "detail-vue",
  data: () => ({
    record: null,
    loading: true,
  }),
 async mounted() {
  const id = this.$route.params.id
  const record = await this.$store.dispatch('fetchRecordById')
  console.log(record);
 }
};
</script> -->




<style scoped>
.breadcrumb {
  color: aliceblue !important;
}
.breadcrumb:before {
  color: aliceblue !important;
}
</style>
