<template>
 <div>
  <header class="phlc-back-header toggle-header">
    <i href="javascript:void(0)" class="phlc-set-back iconfont icon-fanhui" v-on:click="routerback()"></i>
    <div class="login-tltle-t">{{scrollHeadText}}</div>
  </header>
 </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'scrollHeader',
  props: {
    scrollHeadText: {
      type: String,
      default: ''
    }
  },
  methods: {
    routerback () {
      this.$router.back(-1)
    },
    scrollHeader: function () {
      $('.project-introduce-content').scroll(function () {
        var scrollHeight = (window.screen.width * 0.2)
        var percent = Math.abs($(this).children().offset().top / scrollHeight)
        $('.toggle-header').css({'background': 'rgba(255,255,255,' + percent + ')', 'box-shadow': '.02rem .02rem 0.15rem rgba(204,204,204,' + percent + ')', 'color': 'rgba(0,0,0,' + percent + ')'})
        var rgb = Math.round(255 * (1 - percent)) <= 116 ? 116 : Math.round(255 * (1 - percent))
        $('.toggle-header > .iconfont').css('color', 'rgb(' + rgb + ',' + rgb + ',' + rgb + ')')
      })
    }
  },
  mounted () {
    this.scrollHeader()
  }
}
</script>

<style lang="less">
.phlc-back-header {
	position: relative;
  font-size: 0.36rem;
  z-index: 1001!important;
  width: 100%;
  text-align: center;
  padding: .2rem 0.4rem 0rem 0.2rem;
  height: 0.88rem;
  background: #fff;
  z-index: 100;
  box-sizing: border-box;
  .phlc-set-back{
    display: block;
    position: absolute;
    left: .07rem;
    width: .88rem;
    height: .88rem;
    top: .2rem;
    z-index: 1000;
  }
  i.iconfont{
    font-size: 0.36rem;
    text-align: center;
    line-height: 0.6rem;
    color: #fff;
  }
}
.toggle-header{
	background: rgba(255,255,255,0);
	color: rgba(0,0,0,0);
	box-shadow: .02rem .02rem 0.15rem rgba(204,204,204,0);
}
</style>
