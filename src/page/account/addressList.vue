<template>
  <div class="plus-screen-view" id="addressList-view">
    <wxheader :title="'收货地址列表'"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <dl v-for="(item, $index) in data" v-bind:key="item.id">
          <dt v-bind:class="{'active': !$index}" v-on:click="toggleActive(item.id, $event)"></dt>
          <router-link tag="dd" :to="{path: '/editAddress', query: {type: 'edit', id: item.id + '' }}">
            <div>
              <span>{{ item.receiver }}</span>{{ item.receiverMobile }}
            </div>
            <p>{{ item.receiverProvince + item.receiverCity + (item.receiverArea ? item.receiverArea : '') + item.receiverAddress }}</p>
          </router-link>
        </dl>
        <router-link :to="{path: '/editAddress', query: {type: 'add'}}" tag="div" class="submit-button">添加新地址</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import { Indicator } from 'mint-ui'
import $ from 'jquery'
export default{
  components: {
    wxheader
  },
  mounted () {
    this.$nextTick(this.$_init())
    /* eslint-disable */
    mui.plusReady(() => {
      mui.init({
        beforeback: () => {
          this.$router.back(-1)
          return false
        }
      })
    })
    /* eslint-disable */
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    $_init () {
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
        } else if (res.data.data.code === 1111) {
          this.toLogin('/addressList')
        } else {
          this.$layer.toast('查询失败，请重新尝试！')
        }
      }).catch((err) => {
        if (err) {
          this.$layer.toast('查询失败，请重新尝试！')
        }
      })
    },
    toggleActive (id, $event) {
      if (!$(event.target).hasClass('active')) {
        var _this = this
        this.axios({
          url: this.HOST + '/activity-server/integral/v1/addressHandle',
          method: 'post',
          params: {},
          data: {
            flag: 'default',
            id: id,
            isDefault: 1
          },
          timeout: this.axiosTimeout,
          transformRequest: [function (data, headers) {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            })
            return _this.$qs.stringify(data)
          }],
          transformResponse: [function (data, headers) {
            Indicator.close()
            return JSON.parse(data)
          }]
        }).then((res) => {
          if (res.data.data.code === 1) {
            $($event.target).addClass('active').parent().siblings().children('dt').removeClass('active')
            if (_this.$route.query) {
              if (_this.$route.query.type) {
                this.$layer.toast('实物邮寄地址已选择~')
              }
            }
          } else if (res.data.data.code === 1111) {
            this.toLogin('/addressList')
          } else {
            this.$layer.toast('操作失败，请重新尝试！')
          }
        }).catch((err) => {
          if (err) {
            this.$layer.toast('操作失败，请重新尝试！')
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
#addressList-view{
  dl {
    padding: 0.3rem 0;
    border-bottom: 1px solid #eee;
    display: flex;
    position: relative;
    dt {
      width: 0.67rem;
      &:after {
        content: "";
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border-radius: 50%;
        border: 1px solid #bbb;
        text-align: center;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    dd {
      width: 6.03rem;
      background: url(../../assets/images/editor-address.png) no-repeat 5.72rem 50%;
      background-size: 0.3rem;
      div {
        font-size: 0.3rem;
        color: #222;
        padding-bottom: 0.1rem;
        position: relative;
        span {
          margin-right: 0.4rem;
        }
      }
      p {
        padding-right: 0.7rem;
        color: #8f8f94;
        font-size: 0.28rem;
      }
    }
  }
  .active:after {
    border: none;
    background: url(../../assets/images/phlc-address-active.png) no-repeat;
    background-size: 100%;
    width: 0.35rem;
    height: 0.35rem;
  }
}
</style>
