<template>
  <div>
    <v-header></v-header>
    <list-wraper></list-wraper>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import listWraper from './components/listWraper/listWraper.vue'
export default {
  components:{
    vHeader: header,
    listWraper
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
