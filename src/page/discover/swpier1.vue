<template>
  <div>
    <swiper>
      <swiper-slide class="swiperS">
        <p>李书文总是我的男神，赢在中国的风采还是久久不能忘却，也改变了我的择偶观，所以单身至今，优秀的人自然会创造出优秀的团队，果然，我没有看错！</p>
        <div class="span">来自平台用户：ghe***89</div>
      </swiper-slide>
      <swiper-slide class="swiperS">
        <p>吸引我的是客服的萌妹子们，每次回款特贴心的电话告知，主要是声音甜如蜜，不续投，着实有失我绅士风度了，这样的服务态度，又让我多一个放心！</p>
        <div class="span">来自平台用户：zha****ng</div>
      </swiper-slide>
      <swiper-slide class="swiperS">
        <p>看好年化收益，活动定期不断更新，充满了新鲜感，也满足运气爆棚的我，各种福利拿到手软，并非我薅羊毛，只是我想要的在这里都给足了，没有理由让我离开！</p>
        <div class="span">来自平台用户：tan***an</div>
      </swiper-slide>
      <swiper-slide class="swiperS">
        <p>我已经观望很久的说，这里有顶级团队架构、始终合规运营、项目的真实性、无一例逾期的回款，着实想过资金一并入住普惠理财，决定不再潜了，一起奔跑吧！</p>
        <div class="span">来自平台用户：wan***23</div>
      </swiper-slide>
      <div class="swiper-pagination clearfix" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      isLogin: false,
      redPacketWindowFlag: false,
      voucherWindowFlag: false,
      codeFlag: false,
      tel: '',
      code: '',
      data: {
        bidStatis: {
          dateCount: 0,
          incomeSum: 0,
          people: 0
        },
        mobile: '',
        listData: []
      },
      swiperOption: {
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      scrollOption: {
        hoverStop: false,
        openTouch: false,
        limitMoveNum: 4,
        step: 0.5
      },
      awardData: {
        dataType: 0,
        mobile: '',
        nominalValue: 0
      }
    }
  },
  methods: {
    resetTel () {
      this.tel = ''
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
