<template>
  <div>
    <v-header></v-header>
    <list-wraper></list-wraper>
  </div>
</template>

<script>
import header from './header/header.vue'
import listWraper from './listWraper/listWraper.vue'
export default {
  components:{
    vHeader: header,
    listWraper
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
