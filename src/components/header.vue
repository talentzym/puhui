<template>
  <div id="header-view">
    <header class="phlc-close-header" v-bind:class="{'shadow': shadow, 'togge-header': isToggle}">
      <a href="javascript:void(0);" v-on:click="routerback()">
        <i class="iconfont icon-fanhui"></i>
      </a>
      <div class="header-title">
        <p class="title" v-bind:class="{'project': label}">{{ title }}</p>
        <p class="label">{{ label }}</p>
      </div>
      <span class="service" v-show="isService" v-on:click="windowOpen('serviceFlag')">
        <img v-show="!isToggle" src="../assets/images/phlc-withdraw-service-black.png"/>
        <img v-show="isToggle" src="../assets/images/phlc-withdraw-service.png"/>
      </span>
    </header>
    <div id="service-window" v-show="serviceFlag">
      <h1 class="phlc-yxfont" style="text-align:center!important;">400 8989 189</h1>
      <p class="phlc-text-align-left">服务时间：9:00-19:00(工作日)</p>
      <p class="phlc-text-align-left">请于服务时间拨打客服电话，我们将竭诚为您服务~</p>
      <div class="service-btn">
        <span v-on:click="windowClose('serviceFlag')">取消</span>
        <span v-on:click="callService()">呼叫</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Bus from '../assets/js/bus.js'
export default {
  name: 'appFooter',
  data () {
    return {
      serviceFlag: false
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    shadow: {
      type: Boolean,
      default: false
    },
    isToggle: {
      type: Boolean,
      default: false
    },
    isService: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    routerback () {
      /* eslint-disable */
      if (Vue.prototype.plus) {
      /* eslint-disable */
        this.evil('mui.back()')
      } else {
        this.$router.back(-1)
        Bus.$emit('status', 'award')
      }
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    callService () {
      window.location.href = 'tel:4008989189'
    }
  }
}
</script>

<style lang="less">
@import url("../assets/iconfont/iconfont.css");
.phlc-close-header{
  width: 100%;
  height: 0.88rem;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  color: #222;
  z-index: 999;
  &.togge-header{
    background: transparent;
    color: transparent;
    a{
      color: #fff;
    }
  }
  .service{
    width: 0.88rem;
    height: 0.88rem;
    padding: 0.25rem;
    box-sizing: border-box;
    position: absolute;
    top: 0rem;
    right: .15rem;
    img{
      width: .38rem;
      height: .38rem;
    }
  }
  &.shadow{
    box-shadow: 0.02rem 0.02rem 0.15rem rgba(204,204,204,0.3);;
  }
  >a{
    position: absolute;
    left: .07rem;
    top: 0rem;
    width: 0.88rem;
    height: 0.88rem;
    box-sizing: border-box;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.4rem;
    z-index: 100;
    color: inherit;
    img{
      width: 0.22rem;
      height: 0.38rem;
    }
  }
  .header-title{
    width: 5.5rem;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 0.36rem;
    text-align: center;
    >.title{
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      &.project{
        /*top: .08rem;*/
        font-size: 0.3rem;
      }
    }
    >.label{
      font-size: 0.24rem;
      color: #8F8F94;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      /*top: -.08rem;*/
    }
  }
}
#service-window{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6.4rem;
  z-index: 1000;
  background: #fff;
  border-radius: 0.2rem;
  padding-top: 0.1rem;
  box-sizing: border-box;
  h1{
    font-size: 0.42rem;
    color: #222;
    margin: 0.5rem 0.42rem;
  }
  p {
    font-size: 0.3rem;
    line-height: 0.4rem;
    color: #444444;
    margin: 0 0.42rem;
  }
  .service-btn{
    display: flex;
    width: 100%;
    border-top:1px solid #D0D0D0;
    box-sizing: border-box;
    height: 1rem;
    line-height: 1rem;
    margin-top: 0.6rem;
    span{
      flex-grow: 1;
      text-align: center;
      font-size: .36rem;
      &:first-child{
        border-right:1px solid #D0D0D0;
        box-sizing: border-box;
      }
      &:last-child{
        color: #E6382C;
      }
    }
  }
}
</style>
