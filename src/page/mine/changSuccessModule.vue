<template>
 <div id="changSuccessModule-view"  class="plus-screen-view">
   <div id="retrievePassword-content" class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="phlc-vCode-content">
          <img src="../../assets/images/phlc-user-password.png" class="phlc-img-circle-diagram"/>
          <h1 class="font-size-50 phlc-text-align-center phlc-marginT-30">密码找回成功!</h1>
          <p class="phlc-pas-success-account phlc-text-align-center phlc-marginT-30">账号: <span class="phlc-pas-tel">{{this.account}}</span></p>
          <div class="submit-button" @click="goLogin">去登录</div>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
export default {
  data () {
    return {
      account: this.$route.query.account
    }
  },
  methods: {
    goLogin () {
      this.$router.push({path: '/login'})
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#changSuccessModule-view{
  background: #fff;
}
.phlc-img-circle-diagram {
	margin: 0 auto;
	width: 1.3rem;
}
.font-size-50{
  font-size: 0.5rem;
}
.phlc-text-align-center{
  text-align: center;
}
.phlc-marginT-30 {
	margin-top: 0.3rem;
}
.phlc-pas-success-account{
	color: #444;
	font-size: 0.3rem;
}
</style>
