<template>
  <div id="riskAssessment-view" class="plus-screen-view">
    <wxheader :title="'出借者风险承受能力测评'"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <p class="phlc-red-disbled-color phlc-view-index phlc-marginT-40">
          <span id="phlc-test" class="phlc-red-normal-color">1</span>/7
        </p>
        <div class="phlc-riskAssessment-topic">
          <p id="topic">您的家庭年收入为多少（人民币）？</p>
          <section class="options-box phlc-cursor-pointer" v-on:click="optionActive($event)">
            <div>5万元以下</div>
            <div>5-20万元</div>
            <div>20-50万元</div>
            <div>50-100万元</div>
            <div>100万元以上</div>
          </section>
          <div class="submit-button phlc-red-normal phlc-cursor-pointer phlc-marginT-30 phlc-white-color display-none phlc-red-disbled" id="topic-submit" v-on:click="submit()">提交</div>
          <div class="submit-button phlc-cursor-pointer phlc-red-normal-border phlc-red-normal-color phlc-marginT-30 display-none" id="topic-on" v-on:click="topicChange(-1)">上一题</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
export default{
  data () {
    return {
      dataIndex: 0,
      subBool: false,
      viewData: [{
        topic: '您的家庭年收入为多少（人民币）？',
        options: ['5万元以下', '5-20万元', '20-50万元', '50-100万元', '100万元以上'],
        index: null
      }, {
        topic: '在您每年的家庭收入中，可用于出借理财的比例为？',
        options: ['10%以下', '10%-25%', '25%-50%', '50%以上'],
        index: null
      }, {
        topic: '您目前的出借理财产品主要有那些？',
        options: ['存款（银行、宝宝类）', '债券、偏债型基金', '股票、偏股型基金', '金融衍生品（如期货、外汇等）、私募股权出借'],
        index: null
      }, {
        topic: '以下哪项描述最符合您的出借态度？',
        options: ['厌恶风险，不希望本金损失，希望获得稳定回报', '保守出借，不希望本金损失，愿意承担一定幅度的回报波动', '寻求资金的较高回报和成长性，愿意为此承担有限本金损失', '希望赚取高回报，愿意为此承担较大本金损失'],
        index: null
      }, {
        topic: '您喜欢并能接受的出借期限是多久？',
        options: ['90天以下', '90-180天', '180-360天', '360天以上'],
        index: null
      }, {
        topic: '您的出借目的是？',
        options: ['资产保值', '资产稳健增长', '资产迅速增长'],
        index: null
      }, {
        topic: '您的出借出现何种程度的波动时，您会呈现明显的焦虑？',
        options: ['本金无损失，但回报未达预期', '出现轻微本金损失', '本金10%以内的损失', '本金10%-20%的损失', '本金20%以上的损失'],
        index: null
      }]
    }
  },
  components: {
    wxheader
  },
  mounted () {
    $('.options-box').on('tap', (e) => {
      var ev = e || window.event
      if (ev.target.nodeName === 'DIV') {
        this.viewData[this.dataIndex].index = $(ev.target).index()
        if (this.dataIndex === 6) {
          $('#topic-submit').removeClass('phlc-red-disbled')
          this.subBool = true
        }
        this.topicChange(1)
      }
    })
  },
  methods: {
    optionActive (event) {
      if (event.target.nodeName === 'DIV') {
        this.viewData[this.dataIndex].index = $(event.target).index()
        if (this.dataIndex === 6) {
          $('#topic-submit').removeClass('phlc-red-disbled')
          this.subBool = true
        }
        this.topicChange(1)
      }
    },
    topicChange (num) {
      this.dataIndex = this.dataIndex + num > 6 || this.dataIndex + num < 0 ? this.dataIndex : this.dataIndex + num
      $('#phlc-test').text(this.dataIndex + 1)
      $('#topic').text(this.viewData[this.dataIndex].topic)
      $('.options-box').html('')
      for (var i = 0; i < this.viewData[this.dataIndex].options.length; i++) {
        $('.options-box').append('<div>' + this.viewData[this.dataIndex].options[i] + '</div>')
      }
      if (this.viewData[this.dataIndex].index !== null) {
        $('.options-box>div').eq(this.viewData[this.dataIndex].index).addClass('options-active').siblings().removeClass('options-active')
      }
      this.dataIndex > 0 ? $('#topic-on').show() : $('#topic-on').hide()
      this.dataIndex === 6 ? $('#topic-submit').show() : $('#topic-submit').hide()
    },
    submit () {
      if (this.subBool) {
        var _this = this
        this.axios({
          url: this.HOST + '/web-server/account/v1/saveBidQuestion',
          method: 'post',
          transformRequest: [function (data, headers) {
            $('#topic-submit').text('提交中...').addClass('background-color-ff9a9a')
            return _this.$qs.stringify(data)
          }],
          params: {},
          data: {
            income: this.conversion(this.viewData[0].index),
            investRatio: this.conversion(this.viewData[1].index),
            investTerm: this.conversion(this.viewData[2].index),
            investAttitude: this.conversion(this.viewData[3].index),
            investExp: this.conversion(this.viewData[4].index),
            factorMode: this.conversion(this.viewData[5].index),
            investWave: this.conversion(this.viewData[6].index)
          },
          timeout: 5000,
          transformResponse: [function (data, headers) {
            $('#topic-submit').text('提交').removeClass('background-color-ff9a9a')
            return JSON.parse(data)
          }]
        }).then((res) => {
          if (res.data.data.code === 1) {
            this.$router.replace({
              path: '/formResult',
              query: {
                type: 'riskAssessment',
                resultMsg: res.data.data.resultMsg,
                title: '出借者风险承受能力测评'
              }
            })
          } else {
            this.$layer.toast(res.data.data.msg)
          }
        })
      }
    },
    conversion (index) {
      switch (index) {
        case 0:
          return '2'
        case 1:
          return '6'
        case 2:
          return '9'
        case 3:
          return '12'
        case 4:
          return '20'
      }
    }
  }
}
</script>

<style lang="less">
@import url("../../assets/style/account/riskAssessment.less");
</style>
