<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
     v-for="link in sideBarLinks" 
     :key="link.title"
     tag="li"
     active-class="active" 
     :to="link.url" 
     exact
     >
      <a :href="link.url" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      sideBarLinks: [
        { title: "Счет", url: "/" },
        { title: "История", url: "/History-vue" },
        { title: "Планирование", url: "/Planing" },
        { title: "Новая запись", url: "/New-record" },
        { title: "Категории", url: "/categories" },
      ],
    };
  },
};
</script>

<style>
</style>