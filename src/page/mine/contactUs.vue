<template>
 <div id="contactUs-view" class="plus-screen-view">
   <wxheader :title="'联系我们'" :isToggle="true"></wxheader>
   <div class="plus-screen-content project-introduce-content contactUs-content">
     <div>
       <section class="contactHeader">
          <p>
            <a href="javascript:void(0)" class="phlc-login-back phlc-cursor-pointer mui-action-back"></a>
          </p>
          <p class="phlc-first-black-color contact-us-tip1">联系我们</p>
          <p class="contact-us-tip2 phlc-second-black-color">我们竭诚为每一次联系提供满意回复</p>
        </section>
        <ul class="contact-cont plus-screen-scroll">
          <li class="contact-li">
            <p class="contact-li-p1 clearfix">
              <span class="phoneImg fl"><img src="../../assets/images/contact-us-tel.png"/></span>
              <span class="phoneImgtip phlc-second-black-color fl">电话客服(工作日9:00-19:00)</span>
            </p>
            <p class="phonetip phlc-first-black-color"><i id="target">400-8989-189</i></p>
            <div class="call"><a :href="'tel:' + 4008989189">呼叫</a></div>
          </li>
          <li class="contact-li">
            <p class="contact-li-p1 clearfix">
              <span class="QQImg fl"><img src="../../assets/images/conactUsQQ.png"/></span>
              <span class="phoneImgtip phlc-second-black-color fl">在线QQ交流群</span>
            </p>
            <p class="phonetip phlc-first-black-color"><i id="target2">311190977</i></p>
            <div class="call2" @click="doCopy('311190977')">复制</div>
          </li>
          <li class="contact-li">
            <p class="contact-li-p1 clearfix">
              <span class="WCImg fl"><img src="../../assets/images/conactUsWC.png"/></span>
              <span class="phoneImgtip phlc-second-black-color fl">在线客服微信号</span>
            </p>
            <p class="phonetip phlc-first-black-color"><i id="target3">puhuilicai</i></p>
            <div class="call2" @click="doCopy('puhuilicai2017')">复制</div>
          </li>
          <li class="contact-li">
            <p class="contact-li-p1 clearfix">
              <span class="WCImg fl"><img src="../../assets/images/conactUsWB.png"/></span>
              <span class="phoneImgtip phlc-second-black-color fl">官方微博</span>
            </p>
            <p class="phonetip phlc-first-black-color"><i id="target4">普惠理财官方微博</i></p>
            <div class="call2" @click="doCopy('普惠理财官方微博')">复制</div>
          </li>
          <li class="contact-li">
            <p class="contact-li-p1 clearfix">
              <span class="ADImg fl"><img src="../../assets/images/conactUsAD.png"/></span>
              <span class="phoneImgtip phlc-second-black-color fl">公司地址</span>
            </p>
            <p class="phonetip phlc-first-black-color"><i id="target5">北京市西城区安德里北街2号</i></p>
            <div class="call2" @click="doCopy('北京市西城区安德里北街2号')">复制</div>
          </li>
          <li class="contact-li">
            <p class="contact-li-p1 clearfix">
              <span class="EMImg fl"><img src="../../assets/images/conactUsEM.png"/></span>
              <span class="phoneImgtip phlc-second-black-color fl">媒体投放、商务合作和市场推广请联系</span>
            </p>
            <p class="phonetip phlc-first-black-color"><i id="target6">marketing@puhuilicai.com</i></p>
            <div class="call2" @click="doCopy('marketing@puhuilicai.com')">复制</div>
          </li>
          <li class="contact-li">
            <p class="contact-li-p1 clearfix">
              <span class="EMImg fl"><img src="../../assets/images/conactUsEM.png"/></span>
              <span class="phoneImgtip phlc-second-black-color fl">资金需求、保理融资等服务请联系</span>
            </p>
            <p class="phonetip phlc-first-black-color"><i id="target7">partner@puhuilicai.com</i></p>
            <div class="call2" @click="doCopy('partner@puhuilicai.com')">复制</div>
          </li>
        </ul>
     </div>
   </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default {
  data () {
    return {
    }
  },
  mounted () {
    var scrollHeight = $('.project-introduce-content > div').outerHeight(true) - window.screen.height
    scrollHeight = scrollHeight >= 150 ? 150 : scrollHeight
    $('.project-introduce-content').on('scroll', function (e) {
      var percent = Math.abs($(this).children().offset().top) / scrollHeight
      $('header').css({'background': 'rgba(255,255,255,' + percent + ')', 'box-shadow': '.02rem .02rem 0.15rem rgba(204,204,204,' + percent + ')', 'color': 'rgba(0,0,0,' + percent + ')'})
      var rgb = Math.round(255 * (1 - percent)) <= 116 ? 116 : Math.round(255 * (1 - percent))
      $('header .iconfont').css('color', 'rgb(' + rgb + ',' + rgb + ',' + rgb + ')')
    })
  },
  methods: {
    doCopy: function (val) {
      var asd = this.$layer
      this.$copyText(val).then(function (e) {
        asd.toast('复制成功')
      }, function (e) {
        asd.toast('复制失败')
      })
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#contactUs-view{
  header {
    i.iconfont {
      font-size: 0.36rem;
      text-align: center;
      line-height: 0.6rem;
      color: #211e1e!important;
    }
  }
  .contactUs-content{
    top: 0.01rem!important;
    .contactHeader{
      height: 3rem;
      margin: 0 auto;
      background: url(../../assets/images/conactUs1.jpg)no-repeat;
      background-size: 100% 100%;
      position: relative;
      top: 0;
      z-index: 1;
      p {
        a {
          display: block;
          position: absolute;
          left: .07rem;
          width: .88rem;
          height: .88rem;
          top: .65rem;
        }
        img {
          display: block;
          width: .22rem;
          height: .36rem;
          margin-left: .33rem;
          margin-top: .26rem;
        }
      }
      .contact-us-tip1{
        font-size:.36rem;
        font-family:PingFangSC-Regular;
        font-weight:500;
        text-align: center;
        padding-top: 1.3rem;
      }
      .contact-us-tip2{
        text-align: center;
        font-size: .26rem;
        padding-top: .4rem;
      }
    }
    .contact-cont{
      width: 7.5rem;
      margin: 0 auto;
      padding-left: .4rem;
      background: #ffffff;
      .contact-li{
        width: 7.1rem;
        height: 1.86rem;
        border-bottom: .02rem solid #eeeeee;
        background: #ffffff;
        padding-top: .5rem;
        position: relative;
        .contact-li-p1{
          .phoneImg {
            img{
              display: block;
              width: .3rem;
              height: .3rem;
              margin-top: .05rem;
              margin-right: .2rem;
            }
          }
          .phoneImgtip{
            font-size: .26rem;
            line-height: .44rem;
          }
          .QQImg {
            img{
              display: block;
              width: .26rem;
              height: .3rem;
              margin-top: .05rem;
              margin-right: .2rem;
            }
          }
          .WCImg {
            img{
              display: block;
              width: .32rem;
              height: .26rem;
              margin-top: .05rem;
              margin-right: .2rem;
            }
          }
          .ADImg {
            img{
              display: block;
              width: .24rem;
              height: .32rem;
              margin-top: .05rem;
              margin-right: .2rem;
            }
          }
          .EMImg {
            img{
              display: block;
              width: .3rem;
              height: .22rem;
              margin-top: .05rem;
              margin-right: .2rem;
            }
          }
        }
        .phonetip{
          font-size: .3rem;
          padding-left: .5rem;
          padding-top: .2rem;
        }
        .call{
          display: block;
          width: .86rem;
          height: .4rem;
          line-height: .44rem;
          text-align: center;
          background:linear-gradient(90deg,rgba(239,96,46,1),rgba(239,64,46,1));
          border-radius: .2rem;
          -webkit-border-radius: .2rem;
          -moz-border-radius:.2rem;
          font-size:.2rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(252,252,252,1);
          position: absolute;
          top: 1.1rem;
          right: .4rem;
          a{
            color:rgba(252,252,252,1);
          }
        }
        .call2{
          display: block;
          width: .86rem;
          height: .4rem;
          line-height: .4rem;
          text-align: center;
          border-radius: .2rem;
          -webkit-border-radius: .2rem;
          -moz-border-radius:.2rem;
          font-size:.2rem;
          font-family:PingFangSC-Regular;
          font-weight:400;
          border: .02rem solid #E6382C;
          color:#E6382C;
          position: absolute;
          top: 1.1rem;
          right: .4rem;
        }
      }
    }
  }
}
</style>
