<template>
 <div id="FAQ-view">
   <scrollHeader :scrollHeadText = "FAQText"></scrollHeader>
   <div class="faq-content project-introduce-content">
     <div class="discover-box mescroll">
       <div class="banner-box">
          <img src="../../assets/images/FAQ-banner.png"/>
        </div>
        <ul class="discover-classify">
          <li>
            <router-link :to="{path:'/FAQTypeList',query: {name: 'appHelpRecharge'}}">
              <img src="../../assets/images/FAQ-recharge.png" alt="" />
              <p>充值</p>
            </router-link>
          </li>
          <li>
             <router-link :to="{path:'/FAQTypeList',query: {name: 'appHelpWithdraw'}}">
              <img src="../../assets/images/FAQ-withdraw.png" alt="" />
              <p>提现</p>
            </router-link>
          </li>
         <li>
           <router-link :to="{path:'/FAQTypeList',query: {name: 'appHelpLoan'}}">
            <img src="../../assets/images/FAQ-lend.png" alt="" />
            <p>出借</p>
          </router-link>
         </li>
          <li>
             <router-link :to="{path:'/FAQTypeList',query: {name: 'appHelpDebt'}}">
              <img src="../../assets/images/FAQ-debt.png" alt="" />
              <p>债转</p>
            </router-link>
          </li>
         <li>
           <router-link :to="{path:'/FAQTypeList',query: {name: 'appHelpAccount'}}">
            <img src="../../assets/images/FAQ-account.png" alt="" />
            <p>账号</p>
          </router-link>
         </li>
          <li>
            <router-link :to="{path:'/FAQTypeList',query: {name: 'appHelpIntegral'}}">
              <img src="../../assets/images/FAQ-ingetral.png" alt="" />
              <p>积分</p>
            </router-link>
          </li>
        </ul>
        <div class="daodao-box">
          <div class="daodao-box-title" style="margin-top: 0.3rem;">热门问题</div>
          <div class="daodao-box-content">
            <p class="issue" v-for="(item, id) in faqList" :key="id" @click="goDeatil(item.id)">{{item.title}}</p>
          </div>
        </div>
     </div>
   </div>
 </div>
</template>

<script>
import 'mescroll.js/mescroll.min.css'
import scrollHeader from '@/components/scrollHeader'
import $ from 'jquery'
export default {
  data () {
    return {
      FAQText: '常见问题',
      scrollHeight: 0,
      faqList: [],
      isFirstEnter: false
    }
  },
  methods: {
    getPageData () {
      this.axios({
        url: this.HOST + '/web-server/conContent/v1/getContentList',
        method: 'GET',
        params: {
          page: 1,
          rows: 10,
          entranceType: 'appHelp'
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          this.faqList = res.data.data.data.list
          this.scrollHeight = $('.faq-content>div').outerHeight(true) - window.screen.height
        } else {
          this.$layer.open({
            content: res.data.data.msg,
            skin: 'msg',
            time: 2
          })
        }
      })
    },
    goDeatil (id) {
      this.$router.push({
        path: '/FAQDetail',
        query: {
          FAQID: id
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'FAQTypeList') {
      to.meta.isBack = true
    }
    next()
  },
  created () {
    this.isFirstEnter = true
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.faqList = []
      this.getPageData()
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  },
  components: {
    scrollHeader
  }
}
</script>

<style lang="less">
html,body{
  background: #ffffff;
}
.phlc-back-header {
  i.iconfont {
    font-size: 0.36rem;
    text-align: center;
    line-height: 0.6rem;
    color: #bbb!important;
  }
}
#FAQ-view{
  .faq-content{
    width: 7.5rem;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    margin: 0 auto;
    background: #fff;
    .banner-box {
      position: relative;
      img {
        width: 100%;
      }
    }
    .discover-classify{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      text-align: center;
      margin: 0 0.4rem;
      padding-bottom:.5rem ;
      padding-top: .4rem;
      background: #ffffff;
      li {
        width: 2rem;
        padding: 0.27rem 0;
        margin-bottom: 0;
        position: relative;
        img {
          width: 0.82rem;
          margin: 0 auto;
        }
        p {
          margin-top: 0.15rem;
          font-size: 0.28rem;
          color: #444;
        }
      }
    }
    .daodao-box {
      padding: 0 0.4rem;
      border-top: 0.2rem solid #f8f8f9;
      background: #ffffff;
      .daodao-box-title {
        font-size: 0.36rem;
        font-weight: bold;
        padding-left: 0.05rem;
      }
      .daodao-box-content{
        width: 100%;
      }
    }
  }
  .issue {
    line-height: 1.1rem;
    border-bottom: 1px solid #eee;
    font-size: 0.3rem;
    color: #444;
  }
}

</style>
