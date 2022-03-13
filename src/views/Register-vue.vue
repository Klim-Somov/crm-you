,<template>
    <form @submit.prevent="onSubmit" class="card auth-card">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
   <div class="input-field">
        
        
        <input id="email" 
        type="text"
        v-model.trim="email" 
        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" 
        />

        <label for="email">Email</label>
       <small 
        class="helper-text invalid"
        v-if="($v.email.$dirty && !$v.email.required)" 
        >Введите E-mail</small>
         <small 
        class="helper-text invalid"
        v-else-if="($v.email.$dirty && !$v.email.email)" 
        >Введите корректный E-mail</small>
      </div>
      <div class="input-field">
      
        <input id="password" 
        type="password"
        v-model.trim="password"
         :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"  
         />


        <label for="password">Пароль</label>
        <small 
        class="helper-text invalid"
        v-if="($v.password.$dirty && !$v.password.required)"
        >Введите пароль</small>
        <small 
         class="helper-text invalid"
        v-else-if="($v.password.$dirty && !$v.password.minLength)"
        >Осталось ввести {{8 - password.length}} символов </small>
      </div>
    <div class="input-field">
      <input
      
      :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
        v-model="name"
          id="name"
          type="text"    
      >
      <label for="name">Имя</label>
      <small 
       v-if="($v.name.$dirty && !$v.name.required || ($v.name.$dirty && !$v.name.minLength))"
      class="helper-text invalid">Минимум введите имя (мин 4 символа)</small>
    </div>
    <p>
      <label>
        <input 
        v-model="agree"
        type="checkbox" />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <a href="/login">Войти!</a>
    </p>
  </div>
</form>
</template>
<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
// import { ref } from 'vue'
// import { useStore } from 'vuex'
// const login_form = ref({});
// const register_form = ref({});
// const store = useStore();

export default {
 
 name: "Register-vue",
  validations: {
    email: {email, required, },
    password: { required, minLength: minLength(8) },
    name: { required, minLength: minLength(4)},
    agree: {checked: b => b },
      },

  data() {
    return {
      agree: false,
      name: "",
      email: "",
      password: "",
    };
  },
 
   methods: {
  async  onSubmit() {
    if (this.$v.$invalid) {
      this.$v.$touch()
      return
    }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
    try {
       await this.$store.dispatch('register', formData);
      this.$router.push("/");
      } catch (e) {console.error("drt");}
    },
  },
};
</script>