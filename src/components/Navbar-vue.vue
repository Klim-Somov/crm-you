<template>
  <nav class="navbar blue lighten-3">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('sideBarToggle')">
          <i class="material-icons  white-text">dehaze</i>
        </a>
        <!-- приминяю фильтр 'date' зарегестрированный в main.js -->
        <span class="user white-text">{{ date | date('time')}} {{ date | date('date')}}  </span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          
          <a
          
            class="dropdown-trigger white-text user "
            href="#"
            data-target="dropdown"
            ref="dropdown"
          > 
          {{name}}
            <i class="material-icons left">person</i>
            <i class="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="dropdown" class="dropdown-content">
            <li>
              <a href="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="/login" class="black-text" @click.prevent="logOut">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import M from "materialize-css/dist/js/materialize.min";
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    };
  },
  methods: {
    async logOut() {
     await this.$store.dispatch( 'logout' )
      this.$router.push("/login?message=logout");
    },
  },
  computed: {
   name() {
     if (this.$store.getters.info != null)
     return this.$store.getters.info.name
     else return "User"
     }
  },
   mounted() {
    
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {});
  },
  beforeDesrtoy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>
<style scoped>
.user {
 
  font-size: 23px;
  font-weight: bold;
}

</style>