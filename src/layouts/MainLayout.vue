<template>
  <div>
    <div class="app-main-layout">
      <Navbar @sideBarToggle="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" />

      <!-- Добавляю класс full если состояние isOpen = false -->
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large teal darken-1" to="/New-record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar-vue";
import Sidebar from "@/components/Sidebar-vue";

export default {
  data() {
    return {
      
      isOpen: true,
    };
  },
  name: "MainLayout",
  components: { Navbar, Sidebar },

  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    // this.loading = true
  },
};
</script>
