<template>
 <div id="novice-view" class="plus-screen-view">
   <scrollHeader :scrollHeadText = "noviceMsg"></scrollHeader>
   <div class="project-introduce-content  plus-screen-content">
     <div class="phlc-novice-header">
       <a href="javascript:void(0)" class="phlc-login-back phlc-cursor-pointer mui-action-back"></a>
       <p class="novice-header-tip">98.8%用户从这里了解流程</p>
     </div>
     <div class="novice-cont plus-screen-scroll">
       <div class="first-box">
         <nav class="phlc-porject-list-nav">
            <div class="novice-cont-nav clearfix">
              <span class="novice-nav nav-left fl"></span>
              <span class="">{{swiperData1.name}}</span>
              <span class="novice-nav nav-right fr"></span>
            </div>
            <swiper class="swiper-wrapper nav1" :options="stepOneNavOption" ref="stepOneNavSwiper">
              <swiper-slide v-for = "(step, sBar) in swiperData1.step" :class="sBar === 0 ? 'phlc-swiper-active' : ''"
              :data-index="sBar"
              ref="dataStep"
              :key="sBar">{{step}}</swiper-slide>
            </swiper>
         </nav>
         <swiper :options="stepOneImgOption" class="phlc-project-list-content" ref="stepOneImgSwiper">
            <swiper-slide class="swiper-slide " v-for= "(imgs, sCon) in swiperData1.img" :key="sCon" :data-index="sCon">
              <div class="height100 mescroll" id="refreshContainer0">
                <div class="height100 content">
                  <img v-bind:src="imgs"/>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </swiper>
      </div>
      <div class="second-box">
         <nav class="phlc-porject-list-nav">
            <div class="novice-cont-nav clearfix" style="width:4.5rem!important;">
              <span class="novice-nav nav-left fl"></span>
              <span class="">{{swiperData2.name}}</span>
              <span class="novice-nav nav-right fr"></span>
            </div>
            <swiper class="swiper-wrapper nav1" :options="stepTwoNavOption" ref="stepTwoNavSwiper">
              <swiper-slide v-for = "(step, sBar) in swiperData2.step" :class="sBar === 0 ? 'phlc-swiper-active' : ''"
              :data-index="sBar"
              ref="dataStep"
              :key="sBar">{{step}}</swiper-slide>
            </swiper>
         </nav>
         <swiper :options="stepTwoImgOption" class="phlc-project-list-content" ref="stepTwoImgSwiper">
            <swiper-slide class="swiper-slide" v-for= "(imgs, sCon) in swiperData2.img" :key="sCon" :data-index="sCon">
              <div class="height100 mescroll" id="refreshContainer0">
                <div class="height100 content">
                  <img v-bind:src="imgs"/>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </swiper>
        </div>
      <div class="third-box">
         <nav class="phlc-porject-list-nav">
            <div class="novice-cont-nav clearfix">
              <span class="novice-nav nav-left fl"></span>
              <span class="">{{swiperData3.name}}</span>
              <span class="novice-nav nav-right fr"></span>
            </div>
            <swiper class="swiper-wrapper nav1" :options="stepThreeNavOption" ref="stepThreeNavSwiper">
              <swiper-slide v-for = "(step, sBar) in swiperData3.step" :class="sBar === 0 ? 'phlc-swiper-active' : ''"
              :data-index="sBar"
              ref="dataStep"
              :key="sBar">{{step}}</swiper-slide>
            </swiper>
         </nav>
         <swiper :options="stepThreeImgOption" class="phlc-project-list-content" ref="stepThreeImgSwiper">
            <swiper-slide class="swiper-slide" v-for= "(imgs, sCon) in swiperData3.img" :key="sCon" :data-index="sCon">
              <div class="height100 mescroll" id="refreshContainer0">
                <div class="height100 content">
                  <img v-bind:src="imgs"/>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </swiper>
        </div>
      <div class="fourth-box">
         <nav class="phlc-porject-list-nav">
            <div class="novice-cont-nav clearfix" style="width:4.5rem!important;">
              <span class="novice-nav nav-left fl"></span>
              <span class="">{{swiperData4.name}}</span>
              <span class="novice-nav nav-right fr"></span>
            </div>
            <swiper class="swiper-wrapper nav1" :options="stepFourNavOption" ref="stepFourNavSwiper">
              <swiper-slide v-for = "(step, sBar) in swiperData4.step" :class="sBar === 0 ? 'phlc-swiper-active' : ''"
              :data-index="sBar"
              ref="dataStep"
              :key="sBar"
              style="width:1.35rem!important;">{{step}}</swiper-slide>
            </swiper>
         </nav>
         <swiper :options="stepFourImgOption" class="phlc-project-list-content" ref="stepFourImgSwiper">
            <swiper-slide class="swiper-slide" v-for= "(imgs, sCon) in swiperData4.img" :key="sCon" :data-index="sCon">
              <div class="height100 mescroll" id="refreshContainer0">
                <div class="height100 content">
                  <img v-bind:src="imgs"/>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </swiper>
        </div>
      <div class="five-box">
         <nav class="phlc-porject-list-nav">
            <div class="novice-cont-nav clearfix" style="width:4.5rem!important;">
              <span class="novice-nav nav-left fl"></span>
              <span class="">{{swiperData5.name}}</span>
              <span class="novice-nav nav-right fr"></span>
            </div>
            <swiper class="swiper-wrapper nav1" :options="stepFiveNavOption" ref="stepFiveNavSwiper">
              <swiper-slide v-for = "(step, sBar) in swiperData5.step" :class="sBar === 0 ? 'phlc-swiper-active' : ''"
              :data-index="sBar"
              ref="dataStep"
              :key="sBar"
              style="width:1.35rem!important;">{{step}}</swiper-slide>
            </swiper>
         </nav>
         <swiper :options="stepFiveImgOption" class="phlc-project-list-content" ref="stepFiveImgSwiper">
            <swiper-slide class="swiper-slide" v-for= "(imgs, sCon) in swiperData5.img" :key="sCon" :data-index="sCon">
              <div class="height100 mescroll" id="refreshContainer0">
                <div class="height100 content">
                  <img v-bind:src="imgs"/>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'mescroll.js/mescroll.min.css'
import scrollHeader from '@/components/scrollHeader'
import $ from 'jquery'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    const _this = this
    return {
      noviceMsg: '新人如何操作',
      swiperData1: {
        'name': '01 注册账号',
        'step': ['输入手机号', '设置账号密码', '注册成功'],
        'img': [require('../../assets/images/novice1-1.png'),
          require('../../assets/images/novice1-2.png'),
          require('../../assets/images/novice1-3.png')
        ]
      },
      swiperData2: {
        'name': '02 开通新网银存管',
        'step': ['实名认证', '绑定银行卡', '成功开通'],
        'img': [require('../../assets/images/novice2-1.png'),
          require('../../assets/images/novice2-2.png'),
          require('../../assets/images/novice2-3.png')
        ]
      },
      swiperData3: {
        'name': '03 账号充值',
        'step': ['填写金额', '输入交易密码', '成功充值'],
        'img': [require('../../assets/images/novice3-1.png'),
          require('../../assets/images/novice3-2.png'),
          require('../../assets/images/novice3-3.png')
        ]
      },
      swiperData4: {
        'name': '04 选择标的出借',
        'step': ['筛选标的', '输入金额', '选择卡券', '成功出借'],
        'img': [require('../../assets/images/novice4-1.png'),
          require('../../assets/images/novice4-2.png'),
          require('../../assets/images/novice4-3.png'),
          require('../../assets/images/novice4-4.png')
        ]
      },
      swiperData5: {
        'name': '05 查看出借回报',
        'step': ['进入我的', '账号概况', '出借记录', '坐等收益'],
        'img': [require('../../assets/images/novice5-1.png'),
          require('../../assets/images/novice5-2.png'),
          require('../../assets/images/novice5-3.png'),
          require('../../assets/images/novice5-4.png')
        ]
      },
      stepOneNavOption: {
        notNextTick: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          tap: (event) => {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.$refs.stepOneImgSwiper.swiper.slideTo(Math.floor($(event.target).attr('data-index')))
          }
        }
      },
      stepOneImgOption: {
        notNextTick: true,
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionEnd: function () {
            _this.$refs.stepOneNavSwiper.swiper.slideTo(this.activeIndex)
            $('.first-box .nav1 .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      },
      stepTwoNavOption: {
        notNextTick: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          tap: (event) => {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.$refs.stepTwoImgSwiper.swiper.slideTo(Math.floor($(event.target).attr('data-index')))
          }
        }
      },
      stepTwoImgOption: {
        notNextTick: true,
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionEnd: function () {
            _this.$refs.stepTwoNavSwiper.swiper.slideTo(this.activeIndex)
            $('.second-box .nav1 .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      },
      stepThreeNavOption: {
        notNextTick: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          tap: (event) => {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.$refs.stepThreeImgSwiper.swiper.slideTo(Math.floor($(event.target).attr('data-index')))
          }
        }
      },
      stepThreeImgOption: {
        notNextTick: true,
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionEnd: function () {
            _this.$refs.stepThreeNavSwiper.swiper.slideTo(this.activeIndex)
            $('.third-box .nav1 .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      },
      stepFourNavOption: {
        notNextTick: true,
        slidesPerView: 4,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          tap: (event) => {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.$refs.stepFourImgSwiper.swiper.slideTo(Math.floor($(event.target).attr('data-index')))
          }
        }
      },
      stepFourImgOption: {
        notNextTick: true,
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionEnd: function () {
            _this.$refs.stepFourNavSwiper.swiper.slideTo(this.activeIndex)
            $('.fourth-box .nav1 .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      },
      stepFiveNavOption: {
        notNextTick: true,
        slidesPerView: 4,
        slidesPerGroup: 1,
        resistanceRatio: 0,
        on: {
          tap: (event) => {
            $(event.target).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
            _this.$refs.stepFiveImgSwiper.swiper.slideTo(Math.floor($(event.target).attr('data-index')))
          }
        }
      },
      stepFiveImgOption: {
        notNextTick: true,
        slidesPerView: 1,
        resistanceRatio: 0,
        on: {
          transitionEnd: function () {
            _this.$refs.stepFiveNavSwiper.swiper.slideTo(this.activeIndex)
            $('.five-box .nav1 .swiper-slide').eq(this.activeIndex).addClass('phlc-swiper-active').siblings().removeClass('phlc-swiper-active')
          }
        }
      }
    }
  },
  computed: {
    stepOneSwiper () {
      return this.$refs.stepOneNavSwiper.swiper
    },
    stepOneImgSwiper () {
      return this.$refs.stepOneImgSwiper.swiper
    },
    stepTwoSwiper () {
      return this.$refs.stepTwoNavSwiper.swiper
    },
    stepTwoImgSwiper () {
      return this.$refs.stepTwoImgSwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide,
    scrollHeader
  },
  mounted () {

  }
}
</script>

<style lang="less">
@import 'swiper/dist/css/swiper.css';
@import url("../../assets/style/home/novice.less");
</style>
