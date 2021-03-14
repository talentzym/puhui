<template>
  <div id="accountMsg-view" class="mescroll plus-screen-view">
    <div class="un-login" style="display: none;">
      <img src="../../assets/images/messageUnlogin.png"/>
      <p class="phlc-second-black-color">登录后可查看账号信息哦</p>
      <router-link tag="div" :to="{ path: '/login' }" class="phlc-red-normal unlogin" >立即登录</router-link>
    </div>
    <div class="mescroll logined" id="msg-mescroll">
      <div class="plus-screen-scroll">
        <router-link :to="{path: '/msgType', query:{type: '1'}}" tag="dl">
          <dt>
            <img src="../../assets/images/message-center-1.png"/>
          </dt>
          <dd>
            <h3>充值动态</h3>
            <p></p>
            <span></span>
          </dd>
        </router-link>
        <router-link :to="{path: '/msgType', query:{type: '2'}}" tag="dl">
          <dt>
            <img src="../../assets/images/message-center-2.png"/>
          </dt>
          <dd>
            <h3>提现动态</h3>
            <p></p>
            <span></span>
          </dd>
        </router-link>
        <router-link :to="{path: '/msgType', query:{type: '3'}}" tag="dl">
          <dt>
            <img src="../../assets/images/message-center-3.png"/>
          </dt>
          <dd>
            <h3>项目动态</h3>
            <p></p>
            <span></span>
          </dd>
        </router-link>
        <router-link :to="{path: '/msgType', query:{type: '4'}}" tag="dl">
          <dt>
            <img src="../../assets/images/message-center-4.png"/>
          </dt>
          <dd>
            <h3>红包动态</h3>
            <p></p>
            <span></span>
          </dd>
        </router-link>
        <router-link :to="{path: '/msgType', query:{type: '5'}}" tag="dl">
          <dt>
            <img src="../../assets/images/message-center-5.png"/>
          </dt>
          <dd>
            <h3>卡券动态</h3>
            <p></p>
            <span></span>
          </dd>
        </router-link>
        <router-link :to="{path: '/msgType', query:{type: '6'}}" tag="dl">
          <dt>
            <img src="../../assets/images/message-center-6.png"/>
          </dt>
          <dd>
            <h3>账号动态</h3>
            <p></p>
            <span></span>
          </dd>
        </router-link>
        <!--<router-link :to="{path: '/msgType', query:{type:'7'}}" tag="dl">
          <dt>
            <img src="../../assets/images/message-center-7.png"/>
          </dt>
          <dd>
            <h3>合伙人动态</h3>
            <p></p>
            <span></span>
          </dd>
        </router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
import MeScroll from 'mescroll.js'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default{
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      this.msgMescroll = new MeScroll('msg-mescroll', {
        down: {
          callback: this.$_downCallback,
          use: true,
          auto: true
        },
        up: {
          use: false
        }
      })
    },
    $_downCallback () {
      this.axios({
        url: this.HOST + '/web-server/message/v1/getNewestMsgListByGrouping',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          $('.logined').show()
          $('.un-login').hide()
          if (res.data.data.data['合伙人动态']) {
            $('dl').eq(6).show()
          } else {
            $('dl').eq(6).hide()
          }
          for (var i = 0; i < $('dl').length; i++) {
            for (var x in res.data.data.data) {
              if (res.data.data.data[x].sendTime) {
                if (x === $('dl').eq(i).find('h3').text()) {
                  if (res.data.data.data[x].readStatus === 1) {
                    $('dl').eq(i).removeClass('read-status')
                  } else {
                    $('dl').eq(i).addClass('read-status')
                  }
                  $('dl').eq(i).find('p').text(res.data.data.data[x].content)
                  $('dl').eq(i).find('span').text(this.timeDifference(res.data.data.data[x].sendTime))
                }
              } else {
                this.defaultMsg(x)
              }
            }
          }
        } else if (res.data.data.code === 1111) {
          $('.logined').hide()
          $('.un-login').show()
        }
        this.msgMescroll.endSuccess()
      }).catch((err) => {
        if (err) {
          this.msgMescroll.endErr()
        }
      })
    },
    defaultMsg (x) {
      if (x === '充值动态') {
        $('dl').eq(0).find('p').text('咦，您还未充值过~')
      }
      if (x === '提现动态') {
        $('dl').eq(1).find('p').text('咦，您还未提现过~')
      }
      if (x === '项目动态') {
        $('dl').eq(2).find('p').text('咦，您还未出借过任何项目~')
      }
      if (x === '红包动态') {
        $('dl').eq(3).find('p').text('咦，您还未收到过红包~~')
      }
      if (x === '卡券动态') {
        $('dl').eq(4).find('p').text('咦，您未获得任何卡券~')
      }
      if (x === '账号动态') {
        $('dl').eq(5).find('p').text('咦，您未有任何账号动态~')
      }
      if (x === '合伙人动态') {
        $('dl').eq(6).find('p').text('咦，您未有任何合伙人动态~')
      }
    }
  }
}
</script>

<style>
</style>
