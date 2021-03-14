<template>
 <div class="plus-screen-view" id="articles-view">
   <activityBack></activityBack>
   <div class="toTop" @click="backTop()">
     <img src="./images/toTop.png" alt="">
   </div>
   <div class="plus-screen-content mescroll">
     <div class="plus-screen-scroll">
       <div class="content" v-for="(item, index) in list" v-bind:key="index" :class="index !== 0 ? 'marginTop' : ''">
         <div class="title-box">
           <div class="title-bg">
             征文{{item.no}}
           </div>
         </div>
         <div v-html="item.content" style="margin-top:.1rem;"></div>
         <div v-html="item.signature" style="margin-top:.2rem;"></div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import activityBack from '@/components/activityBack'
// import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default {
  data () {
    return {
      maskFalg: false,
      list: [
        {
          no: '一',
          content: '<p class="text">欣赏一个平台，始于信任，源于安全，敬于坚持，合于严格，终于稳定。与平台相交已1609天，从十亿到三十亿，财富与普惠同成长。当信任偶遇信任，当梦想偶遇理想，当家庭的担当偶遇社会的责任，一切都再难以用言语表达。</p><p class="text">古人云：立德、立功、立言是“三不朽”，那普惠理财也应如此吧！</p>',
          signature: '<p class="signature">fan***</p><p class="signature">注册于2014年11月</p>'
        }, {
          no: '二',
          content: '<p class="text">2014年12月21日正式加入普惠理财2014年12月23日注册普惠理财历时5年1579天37896个小时。</p><p class="text">虽然此时此刻我已不就职于普惠理财，但我仍然是一个普惠人，普惠理财是我入职的第一份互联网公司，我也很荣幸在这里开始了我的互联网职业生涯，我算是和普惠理财共同成长起来的，在这里有最棒的同事，为了保证每一个出借人的账户安全，公司上上下下对待产品都非常上心，也因为有这么一群人的存在，普惠理财才可以经历了各种行业内的波动，一直延续至今，并且做的很好。</p><p class="text">如果让我来评价普惠理财的话。两个字，靠谱！一群靠谱的人去做靠谱的事儿，普惠理财已经经历了从0到1的过程，一步一个脚印的走到了30亿的交易额，但我相信这只是普惠的一小步，还有更远大的梦想等着你们去创造，加油！普惠理财！</p>',
          signature: '<p class="signature">zqw***</p><p class="signature">注册于2014年12月</p>'
        }, {
          no: '三',
          content: '<p class="text">2015年4月通过朋友的推荐注册了普惠理财，因为信赖朋友以及相信李总，选择把闲钱放置在这个小平台上，一直都关注着他的成长。</p><p class="text">起初一个月满标一千万，到后来一个月交易量达到一个亿！短短四年半的时间，成功突破三十亿！没有什么营销推广，没有什么强势股东，就是稳稳的做供应链金融，踏实干商业保理，一点一点的堆砌起来这个了不起的平台。</p><p class="text">2018年雷潮，他没有倒，2019年TDW事件，他没有倒，未来的普惠理财只会越来越强，希望小普再创佳绩！</p>',
          signature: '<p class="signature">Buf***</p><p class="signature">注册于2015年4月</p>'
        }, {
          no: '四',
          content: '<p class="text">在遇到小普之前，从未接触过互联网金融，选择他是选择了他的模式，非常喜欢李总的一句比喻：屌丝借款，高富帅还款。有了这些高质量的应收账款作为核心资产，降低了风险系数，给到投资人的收益也很稳定，在安全性上，这个最重要的考量点，让人安心。</p><p class="text">投在小普上面的理财资金虽然不是我的全部资金，但是，不知不觉已经为我创造了2万多的收益，很稳很放心！会推荐给更多的朋友知道，有这样一个小平台，一直慢慢前行，一直稳稳创收！期待50亿，祝好！</p>',
          signature: '<p class="signature">den***</p><p class="signature">注册于2014年10月</p>'
        }, {
          no: '五',
          content: '<p class="text">祝贺普惠理财交易额突破30亿！</p><p class="text">这一路走来，想想就知道是有多么艰辛。看到互金很多头部，头顶着各种各样的光环，强股东背景的、风投好几轮的、上市的，纷纷暴雷，或良性退出市场，普惠理财却在这场战斗中留存到最后，跨进百强，日后势必会获得更多投资人的信赖，树立自己的品牌标杆！</p>',
          signature: '<p class="signature">170****6944</p><p class="signature">注册于2017年9月</p>'
        }, {
          no: '六',
          content: '<p class="text">普惠理财成交额积累到30亿，从时间上来讲是比较久一些，但是，如若不是这样慢慢的累积，又怎么会给人踏实的感觉。</p><p class="text">很多快速创立、快速扩张、最后快速衰败，速度很快，却未能匹配上应对风险的能力，运营超大规模的能力，随即而败。希望普惠理财继续不忘初心，慢慢来，做最好的自己。</p>',
          signature: '<p class="signature">170****0220</p><p class="signature">注册于2017年10月</p>'
        }, {
          no: '七',
          content: '<p class="text">3月底的一天，待收余额145亿、上市公司控股的团贷网雷了的新闻占领各大媒体，很难想象这么个规模、背景的平台一夕之间就崩溃了。很庆幸自己在这个平台没有投资，也很为还在这个平台投资的朋友们悲哀，想起来之前普惠理财的老板李书文李总说过的一句话：凡是出事的平台都是因为初心出了问题。</p><p class="text">投资是个高风险的行为，几年P2P的投资经历告诉我们，什么风投注资、上市公司控股、国企入股、官员站台、第三方排名高、央视广告都然并卵，选择一个P2P是否靠谱就看老板是不是靠谱，老板的初心有没有问题！</p><p class="text">很庆幸一直都在普惠理财投资，虽然规模并没有增长许多，但是普惠理财一直坚持初心扎根供应链金融，希望未来的日子普惠理财一直都好，继续为大家提供安全稳定的投资渠道。</p>',
          signature: '<p class="signature">xiz***</p><p class="signature">注册于2014年10月</p>'
        }, {
          no: '八',
          content: '<p class="text">听闻普惠理财突破了30亿，带着惊喜打开了普惠理财的app,看看我的经历，已经陪伴了普惠理财走过了500多天，话说当初也是因为朋友介绍，稀里糊涂的注册，带着怀疑的心情出借了2000元，用了一张18元的返现券，心里一直忐忑不安,到期回款之后立即提现，第二天就到账了。看着银行卡的钱心情轻松了很多，然后才仔细的看了看网站的情况：</p><p class="text">首先：项目的情况，供应链金融，核心企业增信，感觉是靠谱很多。</p><p class="text">其次：平台的法人，高管团队。李书文是2007年的赢在中国冠军，看了李书文赢在中国的表现，我直接变成粉丝了，略带匪气的责任心让人佩服。</p><p class="text">再次：“一群很轴的书生”的信息披露，“一群爱运动的胖子”的数据报告，这种严谨又不失幽默的作风让人感觉到舒服。</p><p class="text">最后，和客服小姐姐的聊天，专业有爱心且耐心，不因我投资的金额的多少而对我另眼相看，相反还特别的耐心的告诉我如何出借配置收益最大。</p><p class="text">现在，对平台也算是熟悉了，慢慢的收益越来越多。虽然很随意的开始，但是希望我们的相伴永远不会结束，希望普惠理财早日通过备案，不忘初心，不离不弃。</p>',
          signature: '<p class="signature">188****0296</p><p class="signature">注册于2017年12月</p>'
        }, {
          no: '九',
          content: '<p class="text">祝贺普惠理财！30亿，毋庸置疑，已是同行中的佼佼者。</p><p class="text">过多赞许的话，估计大部分人都已经反反复复给予过肯定，在这里就不再赘述，想多谈谈对平台更高的要求，过百亿的路还有很长，提两句帮助平台改进的建议。</p><p class="text">活动有很多，每个月都不间断，版本更新很快，几乎月月都能收到更新提示，每次上线都会发现很多漏洞，甚至有的问题严重到都不应该出现，希望平台可以提升这方面的重视程度。</p><p class="text">再有就是，活动力度大一点，尤其多给老用户一些好处，增加用户黏性，他们才是平台的种子用户，开枝散叶的主力军。维系好老用户的关系，他们也会愿意吸引更多新户来，这样循环平台的血液，做到越来越强。</p>',
          signature: '<p class="signature">170****0086</p><p class="signature">注册于2017年9月</p>'
        }, {
          no: '十',
          content: '<p class="text">相信普惠理财，就像普惠理财一直专注于供应链金融领域的信念一样。</p><p class="text">当你真的专注于一件事，你的全部想法都是有关怎么做好它，做强它，只要这些想法坚定不移，做好只是时间问题，普惠理财虽然时间用的稍久一点，但是最终做到了30亿，做强了供应链金融的商业模式。我会选择继续相信普惠理财并且全力支持下去！加油。</p>',
          signature: '<p class="signature">phl***</p><p class="signature">注册于2016年1月</p>'
        }, {
          no: '十一',
          content: '<p class="text">通过朋友介绍，知道了普惠理财，便开始相守相望，说实话平台很小，但却心安！为什么？一则相信朋友，二则相信李书文，三则实地考察了一番，更加笃定自己的选择是对的。</p><p class="text">每个月的活动都很不错，除了加息劵还有实物奖品，但有时候会有小BUG，咨询客服时，人家的态度也让我甚是欣慰，不求你平台做多大，只希望你越来越稳定，越来越长久！</p>',
          signature: '<p class="signature">135****1040</p><p class="signature">注册于2018年8月</p>'
        }, {
          no: '十二',
          content: '<p class="text">没想到，在不知不觉中普惠已经陪伴我1409天了。</p><p class="text">犹记第一次知道普惠是源于好朋友的介绍：他告诉我普惠是个新成立的平台，但是投资风格很稳，适合作为理财的一个选择。出于对朋友的信任，还有对收益的一点期望，我加入了普惠之中，把自己的闲散资金放入其中。经过一段时间的考验，我发现普惠还真是很稳定，没有逾期，没有扯皮，有的只是稳定的回款收益，还有各种红包加息券，为用户送来实惠！</p><p class="text">值此征文，感谢普惠给我带来的稳定收益，虽然没有大富大贵，但是确让人安心。也希望普惠越来越好，稳定地给各位投资人带来收益。</p><p class="text">不跟风，慢慢来！</p>',
          signature: '<p class="signature">xwh***</p><p class="signature">注册于2015年6月</p>'
        }
      ]
    }
  },
  activated () {
    this.$_muiPlus()
  },
  mounted () {
    this.$_muiPlus()
  },
  methods: {
    $_muiPlus () {
      /* eslint-disable */
      mui.plusReady(() => {
        Vue.prototype.plus = plus
        this.updateSerivces()
        mui.init({
          beforeback: () => {
            if (this.maskFalg) {
              return false
            } else {
              if (location.href.split('#')[1].indexOf('articles') !== -1) {
                // console.log(2)
                var view = this.plus.webview.currentWebview().id
                this.plus.webview.close(view)
              } else {
                // console.log(3)
                this.$router.back(-1)
                return false
              }
            }
          }
        })
      })
      /* eslint-disable */
    },
    backTop () {
      $('html,body').animate({
        scrollTop: 0
      }, 500)
      $('.mescroll').animate({
        scrollTop: 0
      }, 300)
    }
  },
  components: {
    activityBack
  }
}
</script>

<style lang="less">
#articles-view{
  overflow-x: hidden;
  .plus-screen-content{
    top: 0;
    overflow-x: hidden;
    .plus-screen-scroll{
      padding: 0;
      background: url(./images/articles-bg.png) no-repeat;
      background-color: #F7FAFF;
      background-size: 100%;
      min-height: 100%;
      padding: 5rem 0 0.53rem 0;
    }
    .content{
      width: 6.86rem;
      border:.03rem solid rgba(249,233,125,1);
      margin: 0 auto;
      box-sizing: border-box;
      padding: .4rem .32rem;
      position: relative;
      .title-box{
        width: 4rem;
        height: .64rem;
        margin: 0 auto;
        background: #F7FAFF;
        position: absolute;
        top: -13px;
        left: 72px;
        .title-bg{
          position: absolute;
          left: 10px;
          width: 3.62rem;
          height: .64rem;
          background: url(./images/title-bg.png) no-repeat;
          background-size: 100% 100%;
          font-size:.48rem;
          font-weight:bold;
          font-style:italic;
          color:rgba(1,78,193,1);
          text-align: center;
        }
      }
      .text{
        font-size: .3rem;
        color: #3B6BB2;
        margin-top: .2rem;
        text-align: justify;
      }
      .signature{
        font-size: .3rem;
        color: #014EC1;
        text-align: right;
      }
    }
    .marginTop{
      margin-top: .8rem;
    }
  }
  .toTop{
    position: fixed;
    bottom: 1rem;
    right: .15rem;
    width: 1rem;
    height: 1rem;
    z-index: 1111;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
