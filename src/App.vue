<template>
  <div class="" id="app">
    <component :is="layout"><router-view /></component>
  </div>
</template>
<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
export default {
  components: {
    EmptyLayout,
    MainLayout
  },
  computed: {
    layout() {
      
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },
 
};
</script>
<style lang="scss">

#app {
background: url('./img/cool-background (1).png') 0 0 ;}


@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index";
</style>
