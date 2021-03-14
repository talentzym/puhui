<template>
  <div id="daodaoDetail-view" class="plus-screen-view">
    <wxheader :title="this.$route.query.title ? this.$route.query.title : ''"></wxheader>
    <div class="plus-screen-content mescroll">
      <div class="plus-screen-scroll">
        <div class="detail-title">{{ data.total }}</div>
        <p class="detail-createTime">{{ data.createTime ? timeDifference(data.createTime) : ''}}</p>
        <div class="detail-matter" v-html="data.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import { Indicator } from 'mint-ui'
import 'mescroll.js/mescroll.min.css'
export default{
  data () {
    return {
      data: {
        total: '',
        createTime: '',
        content: ''
      }
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
      url: this.HOST + '/web-server/found/v2/getContentById',
      method: 'GET',
      params: {
        id: this.$route.query.id
      },
      data: {},
      transformResponse: [function (data, headers) {
        Indicator.close()
        return JSON.parse(data)
      }],
      timeout: this.axiosTimeout
    }).then((res) => {
      if (res.data.data.code === 1) {
        this.data = res.data.data.content
      } else {
        this.$layer.toast('查询失败，请重新尝试~')
      }
    }).catch((err) => {
      if (err) {
        this.$layer.toast('查询失败，请重新尝试~')
      }
    })
  }
}
</script>

<style lang="less">
#daodaoDetail-view{
  .detail-title{
    font-size: 0.4rem;
    color: #222;
    line-height: 0.6rem;
    padding-top: 0.3rem;
  }
  .mescroll{
    height: auto;
  }
  .detail-createTime{
    font-size: 0.24rem;
    color: #666;
  }
  .detail-matter{
    padding: 0.5rem 0 1rem 0;
    p, blockquote{
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
