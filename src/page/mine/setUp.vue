<template>
 <div id="setUp-view">
   <wxheader></wxheader>
   <div class="set-content" id="set-content">
     <ul class="phlc-top-list">
        <li class="phlc-set-portrait clearfix">
          <span class="fl phlc-set-header-tip phlc-third-black-color">头像</span>
          <span class="fr phlc-set-header-portrait"><img src="../../assets/images/default-avatar.png" class="phlc-set-header-img" onerror="headImgError(this)"/></span>
        </li>
        <li class="phlc-set-nickname">
          <span class="fl phlc-third-black-color nickname">昵称</span>
          <!--<i class="fr phlc-set-arrow"></i>-->
          <span class="fr phlc-set-nicheng phlc-second-black-color" id="set-user-name"></span>
        </li>
        <li class="phlc-set-phone" id="set-mobile-num" @click="goToBankPhone($event)">
          <span class="fl phlc-third-black-color phlc-set-phone-nub">手机号码</span>
          <i class="fr phlc-set-arrow"></i>
          <span class="fr phlc-set-header-portrait phlc-red-normal-color" id="set-mobile"></span>
        </li>
        <li class="phlc-set-phone" id="set-email-num">
          <span class="fl phlc-third-black-color phlc-set-phone-nub">邮箱</span>
          <span class="fr phlc-set-header-portrait phlc-red-normal-color" id="set-email"></span>
        </li>
      </ul>
      <ul class="phlc-bottom-list">
        <li class="phlc-set-portrait clearfix" id="go-realNameInfo" @click="goToeditLoginPassword()">
          <span class="fl phlc-set-header-tip phlc-third-black-color">修改登录密码</span>
          <i class="fr phlc-set-arrow"></i>
          <span class="fr phlc-red-normal-color" id="set-realNameInfo"></span>
        </li>
      </ul>
      <p class="phlc-set-introduction phlc-red-normal-color phlc-cursor-pointer" id="set-introduction" @click="signUut()">退出</p>
   </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
export default {
  data () {
    return {
      isBindPhone: false,
      phone: '',
      mdPhone: ''
    }
  },
  mounted () {
    this.getcustUserInfo()
  },
  methods: {
    getcustUserInfo () {
      this.axios({ /* 用户是否绑定手机 */
        url: this.HOST + '/web-server/account/v1/getAuthPhone',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1') {
          this.isBindPhone = res.data.data.isBind
        }
      })
      this.axios({ /* 获取用户信息 */
        url: this.HOST + '/web-server/account/v1/custUserInfo',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        console.log(res)
        if (res.data.code) {
          if (res.data.data.code === 1) {
            if (res.data.data.headPhoto) {
              $('.phlc-set-header-img').attr('src', res.data.data.headPhoto.indexOf('focus_image/') === -1 ? res.data.data.headPhoto : this.HOST + '/web-server/' + res.data.data.headPhoto)
            } else {
              $('.phlc-set-header-img').attr('src', '../../assets/images/default-avatar.png')
            }
            $('#set-user-name')[0].innerHTML = res.data.data.custUserInfo.userName
            if (res.data.data.emailInfo.email) { /* 是否绑定邮箱 */
              $('#set-email')[0].innerHTML = res.data.data.emailInfo.email
              $('#set-email').removeClass('phlc-red-normal-color')
              $('#set-email').addClass('phlc-fourth-black-color')
            } else {
              $('#set-email')[0].innerHTML = '未绑定'
              $('#set-email').removeClass('phlc-fourth-black-color')
              $('#set-email').addClass('phlc-red-normal-color')
            }
            if (res.data.data.custUserInfo.mobile) { /* 是否绑定手机号 */
              this.phone = res.data.data.custUserInfo.mobile
              $('#set-mobile')[0].innerHTML = res.data.data.custUserInfo.mobile.substr(0, 3) + '****' + res.data.data.custUserInfo.mobile.substring(7, 11)
              this.mdPhone = res.data.data.custUserInfo.mobile.substr(0, 3) + '****' + res.data.data.custUserInfo.mobile.substring(7, 11)
              $('#set-mobile').removeClass('phlc-red-normal-color')
              $('#set-mobile').addClass('phlc-second-black-color')
            } else {
              $('#set-mobile')[0].innerHTML = '去绑定'
              $('#set-mobile').removeClass('phlc-second-black-color')
              $('#set-mobile').addClass('phlc-red-normal-color')
            }
          }
        }
      })
    },
    signUut () { /* 退出登录 */
      this.axios({
        url: this.HOST + '/sso-server/userLogin/v1/logout',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1') {
          this.$router.push('/mine')
        }
      })
    },
    goToeditLoginPassword () {
      this.$router.push({path: '/editLoginPassword'})
    },
    goToBankPhone (ev) {
      this.$router.push({
        path: '/editConfirm',
        query: {
          mobile: this.phone,
          mdmobile: this.mdPhone
        }
      })
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less" >
#setUp-view{
  width: 7.5rem;
  overflow-x: hidden;
  .set-content{
    width: 100%;
    margin: 0 auto;
    padding-top: 0.88rem;
    .phlc-top-list{
      width: 7.5rem;
      height: 4.47rem;
      padding: 0 0 0 .4rem;
      background-color: #ffffff;
      li{
        border-bottom: .02rem solid #EEEEEE;
        height: 1.1rem;
        line-height: 1.1rem;
        padding-right: .8rem;
        font-size: .3rem;
        .phlc-set-arrow{
          display: block;
          width: .14rem;
          height: .26rem;
          background: url(../../assets/images/phlc-set-accrow.png) no-repeat;
          background-size: 100% 100%;
          margin-top: .42rem;
          margin-left: .2rem;
        }
      }
      li:nth-of-type(4){
        border: 0;
      }
      .phlc-set-portrait{
         .phlc-set-header-portrait{
          display: block;
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          background-color: #F8F8F9;
          margin-top: .15rem;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .phlc-center-list{
      width: 100%;
      height: 1.13rem;
      padding: 0 0 0 .4rem;
      background-color: #ffffff;
      margin-top: .3rem;
      li{
        height: 1.1rem;
        line-height: 1.1rem;
        padding-right: .8rem;
        font-size: .3rem;
        .phlc-set-arrow{
          display: block;
          width: .14rem;
          height: .26rem;
          background: url(../../assets/images/phlc-set-accrow.png) no-repeat;
          background-size: 100% 100%;
          margin-top: .42rem;
          margin-left: .2rem;
        }
      }
    }
    .phlc-bottom-list{
      width: 100%;
      height: 1.13rem;
      padding: 0 0 0 .4rem;
      background-color: #ffffff;
      margin-top: .3rem;
      li{
        height: 1.1rem;
        line-height: 1.1rem;
        padding-right: .8rem;
        font-size: .3rem;
        .phlc-set-arrow{
          display: block;
          width: .14rem;
          height: .26rem;
          background: url(../../assets/images/phlc-set-accrow.png) no-repeat;
          background-size: 100% 100%;
          margin-top: .42rem;
          margin-left: .2rem;
        }
      }
    }
    .phlc-set-introduction{
      width:7.5rem;
      height: 1.1rem;
      line-height: 1.1rem;
      text-align: center;
      background-color:#ffffff;
      margin-top: .6rem;
      font-size: .36rem;
    }
  }
}

</style>
