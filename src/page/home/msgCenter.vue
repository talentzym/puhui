<template>
  <div id="msgCenter-view" class="plus-screen-view">
    <header class="phlc-close-header">
      <a href="javascript:void(0);" v-on:click="routerback()">
        <img src="../../assets/images/phlc-common-fanhui.png"/>
      </a>
      <p>
        <span v-on:click="routerLink('/msgCenter/accountMsg')" tag="span" v-bind:class="{'router-active': this.$route.path === '/msgCenter/accountMsg'}">账号消息</span>
        <span v-on:click="routerLink('/msgCenter/noticeList')" tag="span" v-bind:class="{'router-active': this.$route.path === '/msgCenter/noticeList'}">平台公告</span>
      </p>
    </header>
    <div id="msgCenter-content" class="plus-screen-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default{
  name: 'msgCenter',
  methods: {
    routerback () {
      this.$router.back(-1)
    },
    routerLink (path) {
      this.$router.replace({
        path: path
      })
    }
  }
}
</script>

<style lang="less">
#msgCenter-view{
  .router-active{
    color: #e6382c;
  }
  #notice-mescroll .plus-screen-scroll{
    padding-top: 0.4rem;
  }
  #msg-mescroll .plus-screen-scroll{
    padding: 0;
  }
  .phlc-close-header{
    width: 100%;
    height: 0.88rem;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
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
      padding: 0.25rem 0.33rem;
      z-index: 100;
      img{
        width: 0.22rem;
        height: 0.38rem;
      }
    }
    p{
      width: 100%;
      font-size: 0.32rem;
      color: #222;
      text-align: center;
      position: absolute;
      top: .25rem;
      left: 0;
      >span:first-child{
        margin-right: 0.6rem;
      }
    }
  }
  dl {
    display: flex;
    height: 1.5rem;
    width: 100%;
    dt {
      width: 1.2rem;
      padding: 0.35rem 0 0rem 0.4rem;
      position: relative;
      img {
        width: 100%;
      }
    }
    dd {
      flex-grow: 1;
      padding: 0.35rem 0.4rem 0.35rem 0.2rem;
      position: relative;
      border-bottom: 1px solid #eee;
      h3 {
        font-size: 0.3rem;
        color: #222;
      }
      p {
        font-size: 0.24rem;
        color: #444;
        width: 5.6rem;
        margin-top: 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        position: absolute;
        top: 0.3rem;
        right: 0.4rem;
        font-size: 0.24rem;
        color: #666;
      }
    }
    &.read-status dt:after{
      content: "";
      display: block;
      width: 0.14rem;
      height: 0.14rem;
      background: #E6382C;
      border: 0.04rem solid #fff;
      border-radius: 50%;
      position: absolute;
      top: 0.35rem;
      right: 0;
    }
  }
  .swiper-container{
    height: 100%;
    .swiper-slide{
      overflow: auto;
    }
  }
  section {
    margin-bottom: 0.4rem;
    img {
      width: 100%;
      height: 3.1rem;
      border-radius: 0.1rem;
    }
    h3 {
      font-size: 0.3rem;
      color: #222;
      margin: 0.25rem 0 0.2rem 0;
    }
    p{
      font-size: 0.24rem;
      color: #666;
    }
    .messageImg{
      width: 6.7rem;
      height: 3.1rem;
      margin: 0 auto;
      border-radius: .1rem;
      -webkit-border-radius: .1rem;
      -moz-border-radius: .1rem;
    }
  }
  .un-login {
    width: 100%;
    height: 100%;
    padding-top: 1.3rem;
    background: #fff;
    box-sizing: border-box;
  }
  .un-login img {
    width: 2.37rem;
    height: 1.55rem;
    margin: 0rem auto;
  }
  .un-login p{
    font-size: .3rem;
    text-align: center;
    margin-top: .9rem;
  }
  .un-login div{
      margin: 1.32rem auto 0;
      color: #ffffff;
      text-align: center;
      box-shadow: 0 0 0.1rem #E6382C;
      width: 6rem;
      height: .86rem;
      border-radius: .43rem;
      -webkit-border-radius: .43rem;
      -moz-border-radius: .43rem;
      font-size: .3rem;
      text-align: center;
      line-height: .86rem;
  }
}
</style>
