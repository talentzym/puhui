<template>
  <div class="plus-screen-view" id="editAddress-view">
    <wxheader :title="'收货地址'"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <form>
          <div class="form-action">
            <div class="form-action-label" v-bind:class="{ 'input-err-border': errors.first('name') }">
              <label>收货人</label>
              <input class="mui-input-clear" required="required" type="text" name="name"
              v-model="name"
              v-validate="{required:true, regex: regex.name}"
              placeholder="请填写收货人姓名"/>
              <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('name', $event)"></i>
            </div>
            <p>{{ errors.first('name') }}</p>
          </div>
          <div class="form-action">
            <div class="form-action-label"  v-bind:class="{ 'input-err-border': errors.first('tel') }">
              <label>联系电话</label>
              <input class="mui-input-clear" required="required" type="tel" name="tel"
                v-model="tel"
                v-validate="{required: true, regex: regex.phone}"
                oninput="this.value = this.value.replace(/\D/gi, '');"
                placeholder="请填写收货人手机号码"/>
              <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('tel', $event)"></i>
            </div>
            <p>{{ errors.first('tel') }}</p>
          </div>
          <div class="form-action form-action-address">
            <div class="form-action-label">
              <label>联系地址</label>
              <div v-html="area" v-bind:class="{'areaStyle': area !== '请选择配送区域'}" v-on:click="windowOpen('windowFlag')"></div>
            </div>
            <input class="mui-input-clear" required="required" type="text" name="address" style="width: 6.7rem;padding-right: 0.4rem;box-sizing: border-box;"
              v-model="address"
              v-validate="{required: true, min: 1}"
              v-bind:class="{ 'input-err-border': errors.first('address') }"
              placeholder="请填写详细街道信息"/>
            <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('address', $event)" style="top: 1.52rem;"></i>
            <p>{{ errors.first('address') }}</p>
          </div>
        </form>
        <div class="submit-button" v-bind:class="{'background-color-ff9a9a': !( area !== '请选择配送区域' && name && tel && address && !errors.first('name') && !errors.first('tel') && !errors.first('address')) }" v-on:click="submit()">提交</div>
      </div>
    </div>
    <div id="distpicker-window" v-show="windowFlag">
      <p class="distpicker-window-title">地址选择</p>
      <a href="javascript:void(0)" class="phlc-cursor-pointer" v-on:click="windowClose('windowFlag')">
        <img src="../../assets/images/phlc-login-cha.png"/>
      </a>
      <v-distpicker class="distpicker" type="mobile" @selected="onSelected"></v-distpicker>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import { Indicator } from 'mint-ui'
import { Validator } from 'vee-validate'
import VDistpicker from 'v-distpicker'
import $ from 'jquery'
const dict = {
  custom: {
    name: {
      required: '请输入收货人姓名！',
      regex: '请输入正确的姓名！'
    },
    tel: {
      required: '请输入收货人手机号码！',
      regex: '请输入正确的手机号码！'
    },
    address: {
      required: '请输入详细信息！'
    }
  }
}
Validator.localize('en', dict)
export default{
  components: {
    wxheader,
    VDistpicker
  },
  data () {
    return {
      data: {},
      name: '',
      tel: '',
      address: '',
      area: '请选择配送区域',
      windowFlag: false
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  methods: {
    $_init () {
      if (this.$route.query.id) {
        this.axios({
          url: this.HOST + '/activity-server/integral/v1/getActivityAddress',
          method: 'GET',
          params: {},
          data: {},
          transformRequest: [function (data, headers) {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            })
          }],
          transformResponse: [function (data, headers) {
            Indicator.close()
            return JSON.parse(data)
          }],
          timeout: this.axiosTimeout
        }).then((res) => {
          if (res.data.data.code === 1) {
            this.data = res.data.data.address
            for (let i in this.data) {
              if (this.$route.query.id === this.data[i].id + '') {
                this.name = this.data[i].receiver
                this.tel = this.data[i].receiverMobile
                this.area = this.data[i].receiverProvince + ' ' + this.data[i].receiverCity + ' ' + (this.data[i].receiverArea ? this.data[i].receiverArea : '')
                this.address = this.data[i].receiverAddress
              }
            }
          } else {
            this.$layer.toast('查询失败，请重新尝试！')
          }
        }).catch((err) => {
          if (err) {
            this.$layer.toast('查询失败，请重新尝试！')
          }
        })
      }
    },
    submit () {
      this.$validator.validate().then(result => {
        if (result && this.area !== '请选择配送区域') {
          var _this = this
          var provinces = this.area.split(' ')
          var postData = {
            flag: this.$route.query.id ? 'update' : 'add',
            receiverProvince: provinces[0],
            receiverCity: provinces[1],
            receiverArea: provinces[2],
            addressStr: this.address,
            receiver: this.name,
            receiverMobile: this.tel
          }
          if (this.$route.query.id) {
            postData.id = this.$route.query.id
          }
          this.axios({
            url: this.HOST + '/activity-server/integral/v1/addressHandle',
            method: 'post',
            transformRequest: [function (data, headers) {
              Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              })
              $('.submit-button').text('提交中...').addClass('background-color-ff9a9a')
              return _this.$qs.stringify(data)
            }],
            params: {},
            data: postData,
            timeout: this.axiosTimeout,
            transformResponse: [function (data, headers) {
              Indicator.close()
              $('.submit-button').text('提交').removeClass('background-color-ff9a9a')
              return JSON.parse(data)
            }]
          }).then((res) => {
            if (res.data.data.code === 1) {
              this.$router.back(-1)
            } else {
              this.$layer.toast('操作失败，请重新尝试')
            }
          }).catch((err) => {
            if (err) {
              this.$layer.toast('操作失败，请重新尝试')
            }
          })
        }
      })
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
    },
    onSelected (data) {
      this.area = data.province.value + ' ' + data.city.value + ' ' + data.area.value
      this.windowClose('windowFlag')
    }
  }
}
</script>

<style lang="less">
#editAddress-view{
  form .form-action{
    .form-action-label{
      position: relative;
      height: 1rem;
      border-bottom: 1px solid #eee;
      label{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        line-height: 1rem;
        width: 1.7rem;
        font-size: 0.34rem;
        color: #444;
        text-align: left;
      }
      input{
        left: 1.7rem;
        width: 5rem;
        border-bottom: none;
        padding-right: 0.4rem;
        box-sizing: border-box;
      }
    }
    &.form-action-address{
      height: 2.4rem;
      .form-action-label{
        border-bottom: none;
        > div{
          font-size: 0.3rem;
          color: #bbb;
          position: absolute;
          left: 1.7rem;
          width: 5rem;
          height: 1rem;
          line-height: 1rem;
          border-bottom: 1px solid #eee;
        }
      }
      input, .form-action-clear{
        top: 1.02rem;
        padding-left: 1.7rem;
      }
      .form-action-clear~p{
        left: 1.7rem;
        top: 2.02rem;
      }
    }
  }
  .areaStyle{
    font-size: 0.36rem!important;
    color: #222!important;
  }
  #distpicker-window{
    width: 7.5rem;
    height: 8rem;
    position: absolute;
    background: #fff;
    border-radius: 0.15rem 0.15rem 0 0;
    z-index: 1000;
    padding: 0.4rem 0.4rem 0 0.4rem;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    .distpicker-window-title{
      text-align: center;
      font-size: 0.32rem;
      color: #222;
      margin-bottom: 0.3rem;
    }
    >a{
      position: absolute;
      width: 0.88rem;
      height: 0.88rem;
      top: 0.23rem;
      right: 0.4rem;
      padding: 0.26rem;
      box-sizing: border-box;
      img{
        width: 0.31rem;
      }
    }
    .distpicker{
      font-size: 0.3rem;
      width: 100%;
      .address-container{
        height: 6rem;
      }
    }
  }
}
</style>
