<template>
  <div id="conversion-view" class="plus-screen-view">
    <wxheader :title="'兑换红包'" :isService="true"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <ul class="exchange-red-bag-list" id="exchange-list" v-show=" data.length">
          <li class="clearfix" v-for="item in data" v-bind:key="item.id">
            <span class="red-bag-tip fl">{{ item.note }}</span>
            <span class="fr exchange-account">{{ fmoney(item.amount) }}</span>
          </li>
          <p class="botText">到底了没有更多了</p>
        </ul>
        <div class="nocont" v-show=" !data.length ">
          <img src="../../assets/images/request-no-data.png" />
          <p>咦，红包兑换完啦</p>
        </div>
      </div>
    </div>
    <div class="exchange-bot" v-show=" data.length ">
      <span class="fl exchange-bot-account">红包总额：{{ fmoney(rental) }}</span>
      <i class="exchange-bot-total fl"></i>
      <span class="fr exchange-bot-confirm phlc-cursor-pointer" v-on:click="submit()">确认</span>
    </div>
    <div class="error-window" id="error" v-show="windowFlag">
      <img src="../../assets/images/exchange-red-error.png" alt="" />
      <p>{{ errorText }}</p>
      <div v-on:click="windowClose()">知道了</div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import { Indicator } from 'mint-ui'
import $ from 'jquery'
export default{
  data () {
    return {
      data: [],
      windowFlag: false,
      errorText: ''
    }
  },
  components: {
    wxheader
  },
  computed: {
    rental () {
      var amount = 0
      for (let i in this.data) {
        amount += this.data[i].amount
      }
      return amount
    }
  },
  mounted () {
    this.$nextTick(this.$_refresh())
  },
  methods: {
    $_refresh () {
      this.axios({
        url: this.HOST + '/web-server/redPack/v1/myUnRedPackList',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === 1) {
          this.data = res.data.data.unRadPackList
        }
      })
    },
    windowShow () {
      this.$mask.show()
      this.windowFlag = true
    },
    windowClose () {
      this.$mask.hide()
      this.windowFlag = false
    },
    submit () {
      var redPackId = []
      for (let i in this.data) {
        redPackId.push(this.data[i].id)
      }
      redPackId = redPackId.join('|')
      var _this = this
      this.axios({
        url: this.HOST + '/web-server/redPack/v1/chargeRedPack',
        method: 'POST',
        transformRequest: [function (data, headers) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          $('.exchange-bot-confirm').text('提交中...').addClass('background-color-ff9a9a')
          return _this.$qs.stringify(data)
        }],
        params: {},
        data: {
          chargeList: redPackId
        },
        timeout: 5000,
        transformResponse: [function (data, headers) {
          Indicator.close()
          $('.exchange-bot-confirm').text('提交').removeClass('background-color-ff9a9a')
          return JSON.parse(data)
        }]
      }).then((res) => {
        if (res.data.code === 1) {
          if (res.data.data.code === 1) {
            this.$layer.toast('兑换成功，预计1小时内到账')
            this.$_refresh()
          } else if (res.data.data.code === 2222) {
            this.$layer.toast('完成实名后可兑换哦!')
          } else if (res.data.data.failCode === '102000') {
            this.$mask.show()
            this.windowFlag = true
            this.errorText = '出借满2000元才可兑换哦~'
          } else {
            this.$mask.show()
            this.windowFlag = true
            this.errorText = '咦，兑换失败，请联系客服！'
          }
        } else {
          this.$mask.show()
          this.windowFlag = true
          this.errorText = '咦，兑换失败，请联系客服！'
        }
      }).catch((err) => {
        if (err) {
          this.$mask.show()
          this.windowFlag = true
          this.errorText = '咦，兑换失败，请联系客服！'
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url("../../assets/style/account/conversionRedBag.less");
</style>
