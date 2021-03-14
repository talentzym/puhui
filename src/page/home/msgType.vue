<template>
<div id="msgType-view" class="plus-screen-view">
  <wxheader :title='dataArr[$route.query.type - 1].headText'></wxheader>
  <div id="msgType-content" class="plus-screen-content">
    <div class="mescroll" id="msgType-mescroll">
      <div class="plus-screen-scroll" id="msgType-scroll">
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
export default{
  name: 'msgType',
  data () {
    return {
      dataArr: [{
        headText: '充值动态',
        noDataText: '咦，您还未充值过~'
      }, {
        headText: '提现动态',
        noDataText: '咦，您还未提现过~'
      }, {
        headText: '项目动态',
        noDataText: '咦，您还未出借过任何项目~'
      }, {
        headText: '红包动态',
        noDataText: '咦，您未获得任何红包~'
      }, {
        headText: '卡券动态',
        noDataText: '咦，您还未收到过卡券~'
      }, {
        headText: '账号动态',
        noDataText: '咦，您未有任何账号动态~'
      }, {
        headText: '合伙人动态',
        noDataText: '咦，您未有任何合伙人动态~'
      }],
      isDown: false,
      icon: require('../../assets/images/request-news.png')
    }
  },
  components: {
    wxheader
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('msgType-mescroll', {
        down: {
          callback: this.$_downCallback
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          auto: false,
          noMoreSize: 1,
          empty: {
            warpId: 'msgType-scroll',
            icon: this.icon,
            tip: this.dataArr[this.$route.query.type - 1].noDataText,
            btntext: '',
            btnClick: null,
            supportTap: false
          }
        }
      })
    },
    $_downCallback () {
      this.isDown = true
      this.mescroll.resetUpScroll()
    },
    $_upCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/message/v1/getMsgMessageListByType',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          type: this.$route.query.type
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          if (this.isDown) {
            $('#msgType-scroll').html('')
            this.isDown = false
            this.mescroll.endSuccess()
          }
          var obj = res.data.data.resultInformation
          var contFalg = 0
          for (var i = 0; i < obj.length; i++) {
            contFalg++
            $('#msgType-scroll').append('<section data-readStatus="' + obj[i].readStatus + '">' +
              '<h3>' + obj[i].title + '</h3>' +
              '<p>' + obj[i].content + '</p>' +
              '<span>' + new Date(obj[i].sendTime).format('yyyy-MM-dd HH:mm') + '</span>' +
              '</section>')
            if ((obj[i].readStatus === 0 && i + 1 === obj.length) || (obj[i].readStatus === 0 && obj[i + 1] && obj[i + 1].readStatus === 1)) {
              $('.content').append('<p class="noReadText">上次加载到这里了</p>')
              contFalg = 0
              this.$_unread()
            }
          }
          if (!contFalg) {
            $('.noReadText').hide()
          }
        } else if (res.data.data === 1111) {
          this.$router.replace({
            path: '/login'
          })
        }
        this.mescroll.endBySize($('#msgType-scroll section').length, res.data.data.total)
      }).catch((err) => {
        if (err) {
          this.mescroll.endErr()
        }
      })
    },
    $_unread () {
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/message/v1/updateMsgMessageReadStatus',
        method: 'post',
        params: {},
        data: {
          type: this.$route.query.type
        },
        transformRequest: [function (data, headers) {
          return _this.$qs.stringify(data)
        }],
        transformResponse: [function (data, headers) {
          return JSON.parse(data)
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: this.axiosTimeout
      }).then((res) => {
        this.readStatus = false
      })
    }
  }
}
</script>

<style lang="less">
#msgType-view{
  .noReadText{
    height: .72rem;
    width: 7.5rem;
    background: #f8f8f9;
    color: #e6382c;
    text-align: center;
    line-height:.72rem;
    font-size: .24rem;
  }
  section{
    padding: 0.4rem 0;
    position: relative;
    border-bottom: 1px solid #eee;
    h3{
      font-size: 0.3rem;
      color: #444;
      margin-bottom: 0.3rem;
    }
    p{
      font-size: 0.3rem;
      color: #222;
      line-height: 0.45rem;
    }
    span{
      font-size: 0.24rem;
      color: #999;
      line-height: 0.3rem;
      position: absolute;
      right: 0;
      top: 0.4rem;
    }
  }
}
</style>
