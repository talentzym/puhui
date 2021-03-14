<template>
 <div id="bindSuccess-view" class="plus-screen-view">
    <wxheader :title='"普惠理财"' ref="header"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="successbox">
          <img src="" alt="" class="bindimage">
          <p class="font-size-36">{{ bindMsg }}</p>
          <span class="bind-again" v-on:click="gobindpage()" v-show="bindagainStatus">重新绑定</span>
        </div>
        <div class="caution font-size-26">— 网贷有风险，出借需谨慎 —</div>
      </div>
    </div>
 </div>
</template>

<script>
import $ from 'jquery'
import wxheader from '@/components/header'
export default {
  data () {
    return {
      params: {},
      bindMsg: '绑定成功',
      status: false,
      bindagainStatus: false,
      img: require('../../assets/images/bindSuccess.png')
    }
  },
  mounted () {
    this.getopenId()
    $('.bindimage').attr('src', this.img)
  },
  methods: {
    getopenId () {
      console.log(window.location.href)
      /* 如果跳转的地址换了（window.location.href）截取方法需改  以下是带#号的 */
      // var url = window.location.href
      // var url0 = url.split('?')[1]
      // var url1 = url0.split('#')[0]
      // var url2 = url.split('#')[1]
      // var url3 = url2.split('?')[1]
      // var theRequest = {}
      // if (url1.indexOf('&') !== -1) {
      //   var str = url1.substr(0)
      //   var strs = str.split('&')
      //   for (var i = 0; i < strs.length; i++) {
      //     theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      //   }
      // }
      // var objName = url3.split('=')[0]
      // var objValue = url3.split('=')[1]
      // theRequest[objName] = objValue
      // this.params = theRequest
      /* 以下是不带#号的 */
      var url = window.location.href
      url = url.split('?')[1]
      var strs = null
      var theRequest = {}
      if (url.indexOf('&') !== -1) {
        var str = url.substr(0)
        strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      this.params = theRequest
      console.log(this.params)
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/bindWeChat/v2/wechatOauth2',
        method: 'post',
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: this.params,
        timeout: 5000,
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }]
      }).then((res) => {
        console.log(res)
        if (res.data.data.data.code === 10000) {
          this.bindMsg = '绑定成功'
          this.status = true
          this.bindagainStatus = false
        } else {
          if (res.data.data.data.code === 10005) {
            this.bindagainStatus = true
          }
          this.bindagainStatus = false
          this.bindMsg = res.data.data.data.msg
          this.status = false
        }
        console.log(this.status)
        this.img = this.status === true ? require('../../assets/images/bindSuccess.png') : require('../../assets/images/bindError.png')
        console.log(this.img)
        $('.bindimage').css('width', '2rem')
        $('.bindimage').attr('src', this.img)
      }).catch((err) => {
        if (err) {
          console.log(err)
          this.$layer.toast('查询失败，请重新尝试')
        }
      })
    },
    gobindpage () {
      this.$router.push({path: '/bindWeixinServiceNumber'})
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#bindSuccess-view{
  background: transparent;
  >.plus-screen-scroll{
    height: 100%;
    padding-top: 0.4rem;
    background: #fff;
  }
  .successbox{
    margin-top: 1.2rem;
    img{
      margin: 0 auto;
      width: 2rem;
    }
    p{
      text-align: center;
    }
  }
  .caution{
    color: #BBBBBB;
    position: absolute;
    bottom:1rem;
    left: 27%;
  }
  .bind-again{
    display: block;
    width:3.20rem;
    height:.86rem;
    border:.02rem solid #FA5135;
    border-radius: .4rem;
    font-size: .3rem;
    color:#FE5D33;
    text-align: center;
    line-height: .86rem;
    margin: 0 auto;
    margin-top: 1.6rem;
  }
}
</style>
