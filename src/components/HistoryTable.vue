<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>описание</th>
        <th>Тип</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, idx) of records" :key="rec.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ rec.newRecord.amount | currency("RUB") }}</td>
        <td>{{ rec.newRecord.date | date("date") }}</td>
        <td>{{ rec.categoryName }}</td>
        <td>{{rec.newRecord.description}}</td>
        <td>
          <span :class="[rec.typeClass]" class="white-text badge">{{
            rec.typeText
          }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};
</script>
