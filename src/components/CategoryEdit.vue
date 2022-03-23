<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHendler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            v-model="title"
            id="name"
            type="text"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />

          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            Минимальное заначение{{ $v.limit.$params.minValue.min }}
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min";
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: {
    categories: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      title: "",
      limit: 100,
      select: null,
      current: null,
    };
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  methods: {
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message('Категория измненена')
       
      } catch (error) {
        console.log('ty')
      }
    },
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style></style>
