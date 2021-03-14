<template>
  <div id="noticeList-view" class="plus-screen-view">
    <div class="mescroll" id="notice-mescroll">
      <div class="plus-screen-scroll">
        <section v-on:click="routerLink('/noticeDetail',{id: item.id})" v-for="item in noticeData" :key="item.id">
          <img :src="imgHost + item.img" class="messageImg" :onerror="errorImg"/>
          <h3>{{ item.title }}</h3>
          <p>{{ formtime(item.publishDate) }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default{
  data () {
    return {
      isDown: false,
      noticeData: [],
      errorImg: 'this.src="' + require('../../assets/images/notice-img-default.png') + '"'
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  activated () {
    if (this.$store.state.noticeListscroll) {
      this.noticeMescroll.scrollTo(this.$store.state.noticeListscroll, 0)
    } else {
      this.noticeMescroll.triggerDownScroll()
    }
  },
  methods: {
    $_init () {
      this.noticeMescroll = new MeScroll('notice-mescroll', {
        down: {
          callback: this.downCallback,
          auto: false
        },
        up: {
          callback: this.upCallback,
          isBounce: false,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          onScroll: (mescroll, y, isUp) => {
            this.$store.state.noticeListscroll = y
          }
        }
      })
    },
    downCallback (page) {
      this.isDown = true
      this.noticeMescroll.resetUpScroll(true)
    },
    upCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/conContent/v1/getContentList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          entranceType: 'pub'
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (this.isDown) {
          this.noticeData = []
          this.isDown = false
        }
        this.noticeData = this.noticeData.concat(res.data.data.data.list)
        this.noticeMescroll.endSuccess()
        this.noticeMescroll.endBySize(this.noticeData.length, res.data.data.data.total)
      }).catch((err) => {
        if (err) {
          this.noticeMescroll.endErr()
        }
      })
    },
    formtime (str) {
      var date = new Date(str)
      var Y = date.getFullYear() + '.'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      return Y + M + D
    }
  }
}
</script>

<style>
</style>
