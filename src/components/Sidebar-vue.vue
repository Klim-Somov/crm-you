<template>
  <ul class="sidenav side app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in sideBarLinks"
      :key="link.title"
      tag="li"
      active-class="active"
      :to="link.url"
      class=""
      exact
    >
      <a
        :href="link.url"
        class="white-text waves-effect waves-orange pointer"
        >{{ link.title }}</a
      >
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["value"],
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

<style scoped>
.sidenav {
  background-color: #006064;

  opacity: 0.7;
}
.sidenav li > a {
  font-size: 23px;
}
</style>
