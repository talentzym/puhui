<template>
 <div id="FAQtypeList"  class="plus-screen-view">
   <wxheader :title = "myFAQtitle"></wxheader>
   <div class="plus-screen-content">
     <div class="FAQ-type-list mescroll" id="FAQ-list-content">
       <div class="plus-screen-scroll">
         <div class="list">
            <p class="issue" v-for="(item, id) in list" :key="id" @click="goDeatil(item.id)">{{item.title}}</p>
          </div>
       </div>
      </div>
   </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import MeScroll from 'mescroll.js'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default {
  data () {
    return {
      isDown: false,
      list: [],
      myFAQtitle: '',
      isFirstEnter: false
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'FAQDetail') {
      to.meta.isBack = true
    }
    next()
  },
  created () {
    this.isFirstEnter = true
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.faqType()
    }
    this.$route.meta.isBack = false
    this.isFirstEnter = false
  },
  mounted () {
    this.$nextTick(this.$_init())
    this.faqType()
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('FAQ-list-content', {
        down: {
          callback: this.$_downCallback,
          auto: false
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          noMoreSize: 1,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>'
        }
      })
    },
    $_downCallback (page) {
      this.isDown = true
      this.mescroll.resetUpScroll(true)
    },
    $_upCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/conContent/v1/getContentList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          entranceType: this.$route.query.name
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (this.isDown) {
            $('.list').html('')
            this.isDown = false
          }
          this.list = res.data.data.data.list
        } else {
          this.$layer.toast({
            content: res.data.data.msg,
            skin: 'msg',
            time: 2
          })
          this.list = this.list.concat(res.data.data.data.list)
        }
        this.mescroll.endSuccess()
        this.mescroll.endBySize(this.list.length, res.data.data.data.total)
      }).catch((err) => {
        if (err) {
          this.mescroll.endErr()
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
    },
    faqType () {
      if (this.$route.query.name === 'appHelpRecharge') {
        this.myFAQtitle = '充值问题'
      } else if (this.$route.query.name === 'appHelpWithdraw') {
        this.myFAQtitle = '提现问题'
      } else if (this.$route.query.name === 'appHelpLoan') {
        this.myFAQtitle = '出借问题'
      } else if (this.$route.query.name === 'appHelpDebt') {
        this.myFAQtitle = '债转问题'
      } else if (this.$route.query.name === 'appHelpAccount') {
        this.myFAQtitle = '账号问题'
      } else if (this.$route.query.name === 'appHelpIntegral') {
        this.myFAQtitle = '积分问题'
      } else {
        this.myFAQtitle = '热门问题'
      }
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#FAQtypeList{
  .FAQ-type-list{
    .list{
      .issue {
        line-height: 1.1rem;
        border-bottom: 1px solid #eee;
        font-size: 0.3rem;
        color: #444;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
