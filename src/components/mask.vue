<template>
 <div class="mask-plugins" ref="root" @touchmove.prevent v-show="showFlag">

  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
export default{
  data () {
    return {
      showFlag: false
    }
  },
  created () {},
  methods: {
    changeView (obj) {
      if (obj) {
        this.$nextTick(() => {
          this.$refs['root'].style.height = obj.clientHeight + 'px'
          this.$refs['root'].style.width = obj.clientWidth + 'px'
        })
      } else {
        this.$nextTick(() => {
          this.$refs['root'].style.height = window.innerHeight + 'px'
          this.$refs['root'].style.width = window.innerWidth + 'px'
        })
      }
    },
    async show (obj = undefined) {
      this.showFlag = true
      Vue.prototype.isMask = true
      $('.plus-screen-scroll').parent().css('overflow-y', 'hidden')
    },
    hide () {
      this.showFlag = false
      Vue.prototype.isMask = false
      $('.mask-plugins').remove()
      $('.plus-screen-scroll').parent().css('overflow-y', 'auto')
    }
  }
}
</script>

<style lang="less">
.mask-plugins{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: rgba(0, 0, 0, .5);
  pointer-events: auto;
  width: 100%!important;
  height: 100%!important;
}
</style>
