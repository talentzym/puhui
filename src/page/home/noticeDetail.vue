<template>
  <div id="noticeDetail-view" class="plus-screen-view">
    <wxheader :isService="true" :title="'公告详情'"></wxheader>
    <div class="plus-screen-content mescroll">
      <div class="plus-screen-scroll">
        <div class="detail-title">{{ detail.title }}</div>
        <p class="detail-createTime">{{ timeDifference(detail.publishDate) }}</p>
        <div class="detail-matter"></div>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
import { Indicator } from 'mint-ui'
import 'mescroll.js/mescroll.min.css'
export default{
  data () {
    return {
      detail: {}
    }
  },
  components: {
    wxheader
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.axios({
      url: this.HOST + '/web-server/conContent/v1/getContentDetail',
      method: 'get',
      params: {
        contentId: this.$route.query.id
      },
      transformResponse: [function (data, headers) {
        Indicator.close()
        return JSON.parse(data)
      }],
      data: {},
      timeout: this.axiosTimeout
    }).then((res) => {
      if (res.data.data.code === 1) {
        this.detail = res.data.data.data
        $('.detail-matter').html(this.detail.content)
      } else {
        this.$layer.toast(res.data.data.msg)
      }
    }).catch((err) => {
      if (err) {
        this.$layer.toast('查询失败，请再试一次哦~')
      }
    })
  }
}
</script>

<style lang="less">
#noticeDetail-view{
  .plus-screen-scroll{
    min-height: 100%;
  }
  .mescroll{
    height: auto;
  }
  .detail-title{
    font-size: 0.4rem;
    color: #222;
    line-height: 0.6rem;
    padding-top: 0.3rem;
  }
  .detail-createTime{
    font-size: 0.24rem;
    color: #666;
  }
  .detail-matter{
    padding-top: 0.5rem;
    p, blockquote, span{
      font-size: 0.3rem;
      color: #222;
      line-height: 0.5rem;
      min-height: 0.3rem;
      text-align: justify;
    }
    img{
      width: 100%;
      margin: 0.4rem 0;
    }
  }
}
</style>
