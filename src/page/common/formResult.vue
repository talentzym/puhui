<template>
    <div id="form-result-view" class="plus-screen-view">
    <wxheader :title=" this.$route.query.title ? this.$route.query.title : ''"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <!-- 开通新网银行存管结果页 所需参数: {type:dredgeDepository, name: 姓名, idNumber: 身份证号}-->
        <div v-show=" this.$route.query.type === 'dredgeDepository' " class="realName">
          <div>
            <img src="../../assets/images/phlc-shiming.png" class="phlc-img-circle-diagram" style="width: 1.6rem!important;"/>
            <p>您已通过实名认证</p>
          </div>
          <div>
            <p class="phlc-pas-success-account phlc-marginT-60 padding-left-88">姓名<span class="phlc-name">{{ this.$route.query.name ? this.$route.query.name : ''}}</span></p>
            <p class="phlc-pas-success-account phlc-marginT-10 padding-left-88">身份证号<span class="phlc-id-number">{{ this.$route.query.idNumber ? this.$route.query.idNumber : ''}}</span></p>
          </div>
          <p class="phlc-text-bank-open-bottom"><img src="../../assets/images/phlc-realname.png"/> 交易资金全程由新网银行存管</p>
        </div>
        <div v-show=" this.$route.query.type === 'riskAssessment' " class="padding-top-100">
          <img v-show=" this.$route.query.resultMsg === '保守型' " src="../../assets/images/review-conservative.png" class="phlc-img-circle-diagram"/>
          <img v-show=" this.$route.query.resultMsg === '稳健型' " src="../../assets/images/review-steady.png" class="phlc-img-circle-diagram"/>
          <img v-show=" this.$route.query.resultMsg === '平稳型' " src="../../assets/images/review-balance.png" class="phlc-img-circle-diagram"/>
          <img v-show=" this.$route.query.resultMsg === '成长型' " src="../../assets/images/review-growth.png" class="phlc-img-circle-diagram"/>
          <img v-show=" this.$route.query.resultMsg === '进取型' " src="../../assets/images/review-enterprising.png" class="phlc-img-circle-diagram"/>
          <h1 class="font-size-50  phlc-text-align-center phlc-marginT-30">{{ $route.query.resultMsg }}</h1>
          <p class="phlc-pas-success-account text-align-center phlc-marginT-30">经评测您的风险承受能力评级</p>
          <div v-on:click="routerReplace('/riskAssessment')" class="submit-button phlc-white-color phlc-marginT-60 phlc-red-normal phlc-cursor-pointer" id="re-evaluating">重新评测</div>
        </div>
        <div v-show=" this.$route.query.type === 'bindPhoneNumber' ">
          <div class="phlc-vCode-content">
            <p class="phlc-pas-success-account text-align-center phlc-paddingT-30">绑定的新手机号</p>
            <h1 class="font-size-50 text-align-center phlc-marginT-30">{{this.$route.query.newPhone}}</h1>
            <router-link class="submit-button gologin" to="/login">去登录</router-link>
          </div>
        </div>
        <div v-show=" this.$route.query.type === 'editLoginPassword' ">
          <img src="../../assets/images/editLoginPassword.png" class="phlc-img-circle-diagram" style="width: 2.48rem;"/>
          <p class="phlc-pas-success-account text-align-center phlc-marginT-30">登录密码修改成功</p>
          <router-link class="submit-button gologin" to="/login">去登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
export default{
  components: {
    wxheader
  },
  methods: {
    replaceRouter (path) {
      this.$router.replace({
        path: path
      })
    }
  }
}
</script>

<style lang="less">
#form-result-view{
  .plus-screen-scroll{
    padding: 0;
    min-height: 100%;
    position: relative;
    >div{
      padding: 0 0.4rem;
    }
  }
  .realName{
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f8f8f9;
    padding: 0!important;
    >div{
      padding: 0 0.4rem;
      background: #fff;
      &:first-child{
        padding: 0.6rem 0.4rem;
        margin-bottom: 0.2rem;
        >p{
          font-size: 0.32rem;
          color: #222222;
          text-align: center;
          margin-top: 0.4rem;
        }
      }
      &:nth-child(2){
        font-size: 0.28rem;
        color: #222222;
        padding: 0;
        >p{
          padding: 0 0.4rem;
          height: 1rem;
          line-height: 1rem;
          position: relative;
          &:first-child{
            border-bottom: 1px solid #f8f8f9;
          }
          >span{
            position: absolute;
            right: 0.4rem;
            top: 0;
            font-size: 0.26rem;
            color: #666666;
          }
        }
      }
    }
  }
  .phlc-img-circle-diagram {
    margin: 0 auto;
    width: 1.3rem;
  }
  h1{
    font-size: 0.5rem;
    text-align: center;
  }
  .phlc-pas-success-account{
    color: #444;
    font-size: 0.3rem;
  }
  .padding-left-88{
    padding-left: 0.88rem;
  }
  .phlc-marginT-60{
    margin-top: 0.6rem;
  }
  .phlc-marginT-10{
    margin-top: 0.1rem;
  }
  .phlc-paddingT-30{
    padding-top: 0.3rem;
  }
  .phlc-text-bank-open-bottom{
    text-align: center;
    position: absolute;
    bottom: 1.1rem;
    left: 0;
    right: 0;
    font-size: 0.24rem;
    color: #a2acb2;
    img{
      width: 0.48rem;
      display:inline-block;
    }
  }
  .gologin{
    display: block;
  }
  .phlc-img-circle-diagram {
    margin: 0 auto;
    width: 1.3rem;
  }
}
</style>
