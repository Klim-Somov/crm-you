<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>
      <loader-vue v-if="loading" />
      <p v-else-if="!categories.length" class="center">категорий пока нет.  
        <router-link to="/categories">добавить</router-link>
        </p> 
      <form @submit.prevent="submitHendler" v-else class="form">
        <div class="input-field">
          <select 
          v-model="category"
           ref="select" >
            <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <p>
          <label>
            <input class="with-gap" v-model="type" name="type" type="radio" value="income" />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input class="with-gap" v-model="type" name="type" type="radio" value="outcome" />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input 
           id="amount" 
           type="number"  
           v-model.number="amount" 
           :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
         
          >
          <label for="amount">Сумма</label>
         

           <span
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid"
          >
                        Минимальное заначение{{ $v.amount.$params.minValue.min }}

          </span>

        </div>

        <div class="input-field">
          <input 
           :class="{invalid: $v.description.$dirty && !$v.description.required}"
          v-model="description" 
          id="description" 
          type="text" />
          <label for="description">Описание</label>
          <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
            >Введите описание</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import M from "materialize-css/dist/js/materialize.min";
import {mapGetters} from 'vuex'
export default {
  name: "record-vue",
  data() {
    return {
      select: null,
      loading: false,
      categories: [],
      category: null,
      type: 'outcome',
      amount: 100,
      description: "",
    };
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
        return this.info.bill >=this.amount
      

    },
  },
    methods: {
    async submitHendler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        console.log("ok")
      } else {
        this.$message('Недостатолчно соедств на счете')
      }

      // try {
      //   const categoryData = {
      //     id: this.current,
      //     title: this.title,
      //     limit: this.limit,
      //   };
      //   await this.$store.dispatch("updateCategory", categoryData);
      //   this.$message('Категория измненена')
       
      // } catch (error) {
        //   console.log('ty')
        // } 
        this.description = ''
        this.amount = 100
      }
    },
   validations: {
    amount:{ minValue: minValue(100) },
    description:  { required },
  },
 
  async mounted() {
     await this.$store.dispatch("fetchCategories");
    this.categories = this.$store.getters.categories;
    this.loader = false;
   
    if (this.categories.length) {
    this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
    
    
  },
};
</script>

<style></style>
