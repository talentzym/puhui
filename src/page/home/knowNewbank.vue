<template>
 <div id="knowNewbank-view" class="plus-screen-view">
   <header class="phlc-back-header toggle-header">
    <i href="javascript:void(0)" class="phlc-set-back iconfont icon-fanhui" v-on:click="routerback()"></i>
    <router-link to="/commonQuestion" class="phlc-my-red-bag-service phlc-cursor-pointer iconfont" onclick="goToCommonQuestion()">
      <img class="common-problem" src="../../assets/images/phlc-common-problem.png"/>
    </router-link>
    <div class="login-tltle-t">银行存管</div>
  </header>
   <div id="know-newbank-content" class="project-introduce-content plus-screen-content">
     <div class="know-newbank-top">
        <div class="bg"></div>
      </div>
     <div class="plus-screen-scroll">
      <div id="wrapper">
        <ul class="know-newbank-list">
          <li>
              <div class="main-title">
                <i class="know-newbank-line line1L"></i>
                <span>什么是银行存管</span>
                <i class="know-newbank-line line1R"></i>
              </div>
              <article>
                <ul class="article-text clearfix">
                  <li class="clearfix alignment">
                    <span class="fl"></span>
                    <p class="letter fl">银行资金存管是指通过银行管理出借者的资金，平台管理交易，做到资金和交易隔离，让互联网金融平台无法直接接触资金，避免资金被挪用的风险。</p>
                  </li>
                  <li class="clearfix alignment">
                    <span class="fl"></span>
                    <p class="letter alignment fl">具体做法是互联网金融平台在银行业金融机构开设独立账户，用于存放用户的交易资金，银行业金融机构根据用户的指令、合同内容，对用户的交易与资金流水进行划拨和簿记，以保护用户的资金安全。</p>
                  </li>
                  <li class="clearfix alignment">
                    <span class="fl"></span>
                    <p class="letter fl">目前，国内只有不到5%的平台成功对接了银行存管。</p>
                  </li>
                </ul>
              </article>
            </li>
          <li>
              <div class="main-title">
                <i class="know-newbank-line line1L"></i>
                <span>银行存管的优势</span>
                <i class="know-newbank-line line1R"></i>
              </div>
              <article>
                <ul class="article-text clearfix advantage">
                  <li class="clearfix geli">
                    <div class="fl tu tu-1"></div>
                    <div class="fl ad-cont alignment">
                      <div class="know-newbank-stitle one"></div>
                      <p style="text-align: justify;" class="font-size-24 know-newbank-text letter">普惠理财接入新网银行存管系统后，银行将为用户设立独立账户，并与平台运营账户分离，实现平台自有资金和用户资金全面隔离。</p>
                    </div>
                  </li>
                  <li class="clearfix geli">
                    <div class="fl ad-cont alignment">
                      <div class="know-newbank-stitle two"></div>
                      <p style="text-align: justify;" class="font-size-24 know-newbank-text letter">用户发起的所有涉及资金的操作，均由新网银行根据用户指令进行操作，同时对资金流水及交易过程相关信息进行存档。</p>
                    </div>
                    <div class="fl tu-2 tu"></div>
                  </li>
                  <li class="clearfix geli">
                    <div class="fl tu tu-3"></div>
                    <div class="fl ad-cont alignment">
                      <div class="know-newbank-stitle three"></div>
                      <p class="font-size-24 know-newbank-text letter">用户在新网银行开通的账户都为独立子账户，账户信息由银行保管。</p>
                    </div>
                  </li>
                  <li class="clearfix geli">
                      <div class="fl ad-cont alignment">
                      <div class="know-newbank-stitle four"></div>
                      <p class="font-size-24 know-newbank-text letter">普惠理财用户在平台的投资资金、经过银行存管通道、可以避免挪用风险，专款专用。客观上，银行也起到了监督作用。</p>
                    </div>
                    <div class="fl tu-4 tu"></div>
                  </li>
                </ul>
              </article>
            </li>
          <li>
              <div class="main-title">
                <i class="know-newbank-line line2L"></i>
                <span>新网银行资金存管的方式</span>
                <i class="know-newbank-line line2R"></i>
              </div>
              <div class="know-newbank-img"></div>
            </li>
          <li>
              <div class="phlc-text-align-center main-title">
                <i class="know-newbank-line line1L"></i>
                <span>为什么选择新网银行</span>
                <i class="know-newbank-line line1R"></i>
              </div>
              <article>
                  <ul class="article-text clearfix">
                    <li class="clearfix alignment">
                      <span class="fl"></span>
                      <p class="letter fl">银行资金存管对接是对平台和银行技术实力的相互考验。</p>
                    </li>
                    <li class="clearfix alignment">
                      <span class="fl"></span>
                      <p class="letter fl">金融领域的系统开发有其业务类型的特殊性，银行和平台双方需要保持数据实时同步，对安全级别要求很高，且在数据体量巨大的同时需要解决性能问题。</p>
                    </li>
                    <li class="clearfix alignment">
                      <span class="fl"></span>
                      <p class="letter fl">新网银行是由新希望集团、小米公司、红旗连锁等股东发起设立，成为继腾讯微众银行，阿里网商银行之后全国第三家、中西部首家互联网银行。</p>
                    </li>
                    <li class="clearfix alignment">
                      <span class="fl"></span>
                      <p class="letter fl">新网银行定位为新一代互联网银行，致力于通过互联网技术为广大消费者和小微企业提供定制化的金融服务。</p>
                    </li>
                    <li class="clearfix alignment">
                      <span class="fl"></span>
                      <p class="letter fl">新网银行作为国内第三家互联网银行，有着科技、数据驱动的元素，与普惠理财未来的科技金融，技术驱动的互联网金融发展战略是非常契合的。</p>
                    </li>
                  </ul>
              </article>
            </li>
          <li>
              <div class="phlc-text-align-center main-title">
                <i class="know-newbank-line line3L"></i>
                <span>新网银行如何实现"直接存管"</span>
                <i class="know-newbank-line line3R"></i>
              </div>
              <article>
                <ul class="article-text clearfix">
                  <li class="clearfix geli">
                    <div class="fl tu2 tu-5"></div>
                    <div class="fl ad-cont alignment">
                      <div class="know-newbank-stitle one"></div>
                      <p class="font-size-24 know-newbank-text letter">用户在新网银行有专门的独立存管子帐户，普惠理财平台自有资金与用户完全隔离。</p>
                    </div>
                  </li>
                  <li class="clearfix geli">
                    <div class="fl ad-cont alignment">
                      <div class="know-newbank-stitle six"></div>
                      <p class="font-size-24 know-newbank-text letter">新网银行授权易宝支付等第三方机构只提供支付通道功能，交易只在新网银行独立子帐户中进行。</p>
                    </div>
                    <div class="fl tu-6 tu2"></div>
                  </li>
                  <li class="clearfix geli">
                    <div class="fl tu2 tu-7"></div>
                      <div class="fl ad-cont alignment">
                      <div class="know-newbank-stitle seven"></div>
                      <p class="font-size-24 know-newbank-text letter">用户需要单独设立交易密码保障账户安全，账户信息由新网银行管理，每次交易由用户授权才可操作。银行监管交易全流程并记录用户资金流水，交易真实可查。</p>
                    </div>
                  </li>
                </ul>
              </article>
            </li>
          <li class="last-section">
              <div class="phlc-text-align-center main-title">
                <i class="know-newbank-line line3L"></i>
                <span>普惠理财银行资金管存进度</span>
                <i class="know-newbank-line line3R"></i>
              </div>
              <article>
                <ul class="article-text clearfix">
                  <li class="know-newbank-contract alignment">
                    <div>普惠理财与新网银行长达数月合作洽谈，经双方合规考察，最终于2017年5月,正式签订银行资金存管合作协议。根据合作协议，启动资金存管的一系列对接工作对接流程如下:</div>
                    <div>协议签订-接口准备-平台启动开发-银行对接排期-正式对接-联调测试-数据迁移(2017.7.10)-正式上线(2017.7.14)。</div>
                    <div class="bankContract clearfix">
                        <div class="bankContractL fl Gallery">
                        <img src="../../assets/images/knowNewBank15.png" alt="" preview preview-text="资金管存服务协议1">
                        <h6>资金存管协议首页</h6>
                      </div>
                      <div class="bankContractR fl Gallery">
                        <img src="../../assets/images/knowNewBank15.png" alt="" preview preview-text="资金管存服务协议1">
                        <h6>资金存管协议尾页</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </article>
          </li>
        </ul>
      </div>
     </div>
   </div>
   <div class="newBankBtn">
			<div class="phlc-main-button know-newbank-btn" id="newbankBtn" ref="btnPage"  @click="btnGoPage(btnText)">
        {{this.btnText}}
      </div>
    </div>
		<div class="mask-box" id="mask-box">
			<div class="mask-box-top clearfix">
				<span class="new-tip-top-left fl"><img src="../../assets/images/new-tip-top-left.png" class=""/></span>
				<span class="new-tip-top-center fl"></span>
				<span class="new-tip-top-right fr"><img src="../../assets/images/new-tip-top-right.png" class=""/></span>
			</div>
			<div class="mask-cont">
				<p class="mask-cont-tip">普惠理财携手新网银行</p>
				<p class="mask-cont-img"><img src="../../assets/images/new-tip-tip.png" /></p>
				<p class="mask-cont-b">2017.07.12已正式上线</p>
				<p class="mask-now-up phlc-red-normal phlc-cursor-pointer" id="now-up" @click="upgrade()">立即升级</p>
				<div class="mask-cha phlc-cursor-pointer" id="mask-close-layer" @click="windowClose('activeFlag')"><img src="../../assets/images/newtipcha.png" /></div>
			</div>
		</div>
 </div>
</template>

<script>
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default {
  data () {
    return {
      btnText: '',
      knowNewbankMsg: '银行存管',
      relHeight: 0,
      activeFlag: false
    }
  },
  components: {},
  mounted () {
    this.getPageData()
    this.scrollHeader()
  },
  methods: {
    scrollHeader: function () {
      $('#know-newbank-content').scroll(function () {
        var scrollHeight = (window.screen.width * 0.2)
        var newBank = Math.abs($(this).children().offset().top / scrollHeight)
        $('.toggle-header').css({'background': 'rgba(255,255,255,' + newBank + ')', 'box-shadow': '.02rem .02rem 0.15rem rgba(204,204,204,' + newBank + ')', 'color': 'rgba(0,0,0,' + newBank + ')'})
        var rgb = Math.round(255 * (1 - newBank)) <= 116 ? 116 : Math.round(255 * (1 - newBank))
        $('.toggle-header > .iconfont').css('color', 'rgb(' + rgb + ',' + rgb + ',' + rgb + ')')
        if (newBank > 0) {
          $('.common-problem').attr('src', require('../../assets/images/phlc-common-problem-black.png'))
        } else {
          $('.common-problem').attr('src', require('../../assets/images/phlc-common-problem.png'))
        }
      })
    },
    routerback () {
      this.$router.back(-1)
    },
    btnGoPage (msg) {
      if (msg === '立即使用') {
        this.$router.push('/login')
      } else if (msg === '立即开通') {
        this.$router.push('/bankDepository')
      } else if (msg === '立即激活') {
        this.windowOpen('activeFlag')
      }
    },
    windowOpen (flag) {
      this[flag] = true
      this.$mask.show()
      $('#mask-box').show()
    },
    windowClose (flag) {
      this[flag] = false
      this.$mask.hide()
      $('#mask-box').hide()
    },
    getPageData () {
      this.axios({
        url: this.HOST + '/web-server/found/v1/getJudgeBank',
        method: 'GET',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1111') { /* 未登录去登录 */
          this.btnText = '立即使用'
        } else if (res.data.data.code === '100000') { /* 未开通去开通 */
          this.btnText = '立即开通'
        } else if (res.data.data.code === '100001') { /* 未激活去激活 */
          this.btnText = '立即激活'
        } else if (res.data.data.code === '1') { /* 都开通了就消失 */
          this.btnText = ''
          $('#newbankBtn').hide()
        }
      })
    },
    upgrade () {
      this.axios({
        url: this.HOST + '/web-server/registerRequest/v1/activePlatuser',
        method: 'POST',
        params: {},
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (res.data.data.code === '1') {
          if (!res.data.data.cgtData) {
            this.getPageData()
            this.scrollHeader()
          } else {
            this.$router.push({
              path: '/mutual/yeepay',
              query: {
                data: res.data.data,
                title: '银行存管激活'
              }
            })
          }
        } else {
          this.$layer.toast('升级失败，请联系客服！')
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url("../../assets/style/home/knowNewbank.less");
</style>
