<template>
  <div class="activity-back" v-on:click="routerback()">
    <img :src="src">
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'activityBack',
  props: {
    src: {
      default: require('../assets/images/invite-friends-back.png')
    }
  },
  methods: {
    routerback () {
      /* eslint-disable */
      var that = this
      if (Vue.prototype.plus) {
        // console.log('返回')
      /* eslint-disable */
        // console.log(JSON.stringify(Vue.prototype.plus))
        this.evil('mui.back()')
      } else {
        // console.log('返回1')
        // console.log(JSON.stringify(location.href))
        if (location.href.indexOf('julyActivity') !== -1) {
          // console.log('返回2')
          this.$router.go(-2)
        } else {
          // console.log('返回3')
          this.$router.back(-1)
        }
      }
    }
  }
}
</script>

<style>
.activity-back{
  position: absolute;
  left: .2rem;
  width: .88rem;
  height: .88rem;
  top: 0.2rem;
  z-index: 100;
}
.activity-back img{
  width: 0.48rem;
  height:0.48rem;
  margin:0.2rem;
}
</style>
