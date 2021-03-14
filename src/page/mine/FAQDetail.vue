<template>
 <div id="FAQDetail"  class="plus-screen-view">
   <wxheader :title="typeTitle"></wxheader>
   <div class="plus-screen-content">
     <div class="FAQDetail mescroll" id="FAQ-list-content">
       <div class="plus-screen-scroll">
        <div class="FAQ-detail"></div>
       </div>
      </div>
   </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
export default {
  data () {
    return {
      typeNum: Number(this.$route.query.FAQID),
      typeTitle: ''
    }
  },
  mounted () {
    this.getPageData()
  },
  methods: {
    getPageData () {
      this.axios({
        url: this.HOST + '/web-server/conContent/v1/getContentDetail',
        method: 'GET',
        params: {
          contentId: Number(this.typeNum)
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          this.typeTitle = this.faqType(res.data.data.data.type)
          $('.FAQ-detail').html('<h3>' + res.data.data.data.title + '</h3>' +
            '<p>' + new Date(res.data.data.data.publishDate).format('yyyy-MM-dd') + '</p>' +
          '<div>' + res.data.data.data.content + '</div>')
        } else {
          this.$layer.open({
            content: res.data.data.msg,
            skin: 'msg',
            time: 2
          })
        }
      })
    },
    faqType (type) {
      switch (type) {
        case 'appHelpRecharge':
          return '充值问题'
        case 'appHelpWithdraw':
          return '提现问题'
        case 'appHelpLoan':
          return '出借问题'
        case 'appHelpDebt':
          return '债转问题'
        case 'appHelpAccount':
          return '账号问题'
        case 'appHelpIntegral':
          return '积分问题'
        default:
          return '热门问题'
      }
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#FAQDetail{
  .FAQ-detail{
    h3 {
      font-size: 0.36rem;
      line-height: 0.8rem;
      color: #444;
    }
    div {
      margin-top: 0.56rem;
      span{
        text-align: justify;
      }
    }
    p {
      font-size: 0.3rem;
      color: #444;
      line-height: 0.5rem;
    }
  }
}
</style>
