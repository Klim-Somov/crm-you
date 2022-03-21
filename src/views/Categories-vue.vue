<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader-vue v-if="loader"/>
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
import LoaderVue from '@/components/Loader-vue.vue';

export default {
  name: "Categoryes-vue",
  components: { CategoryCreate, CategoryEdit, LoaderVue },
  data() {
    return {
      categories: [],
      loader: true
    };
  },
  async mounted() {
   await this.$store.dispatch('fetchCategories') 
   this.categories = this.$store.getters.categories
    console.log(this.categories)
    this.loader = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
     
    },
  },
};
</script>
