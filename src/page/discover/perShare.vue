<template>
  <div id="discover-share-view">
    <div id="plus-per-content">
      <div class="label">
        <p v-show="perShow"><span class="left"></span><span style="margin-left: .2rem;margin-right: .2rem;">Hello，我是{{shareEr}}，邀你领取</span><span class="left"></span></p>
      </div>
      <div class="restatus1">
        <div class="status1" v-if='status1'>
          <form>
            <div class="form-action phoneBox">
              <input class=" phoneInput" required="required" type="tel" name="phone" placeholder="请输入您的手机号" v-model="phone" maxlength="11" v-validate="{required:true, regex: regex.phone, length: 11}" v-on:change="phoneInput()" />
              <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('phone', $event)"></i>
              <p class="error">{{ errors.first('phone') }}</p>
            </div>
            <div class="form-action passBox">
              <div class="formDiv">
                <input class="mui-input-clear passInput" required="required" type="tel" name="code" v-model="code" maxlength="6" v-validate="{required:true, length:6}" placeholder="请输入6位验证码" oninput="this.value = this.value.replace(/\D/gi, '');" v-on:blur="blurIn()"/>
                <i style="right: 2.4rem;" class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('code', $event)"></i>
                <p class="error">{{ errors.first('code') }}</p>
                <div class="codeBtn form-action-code" v-on:click="validateCode(phone, '1')">获取验证码</div>
              </div>
            </div>
            <div class="sumbit" v-on:click="getcode()">立即领取</div>
            <p class="xieyip">
              <span class="span">
                <input type="checkbox" checked v-model="checkStatus" class="Checkbox" id="check1" @click="getStatus" v-on:blur="blurIn()">
                <label for="check1"></label>
              </span>
              <span class="xieyi">我已阅读并同意<i><router-link to="/provision" tag="span">《普惠理财用户隐私条款》</router-link></i></span>
            </p>
          </form>
        </div>
        <div class="status2" v-if='status2'>
          <img src="../../assets/images/share10.png" />
          <p class="p1">领取成功</p>
          <p class="p2">{{ amount }}元新人专享卡券包已放入<span>{{this.phone}}</span>账号</p>
          <div class="lookBtn">
            <router-link to="/home" tag="div" class=" phlc-cursor-pointer">查看</router-link>
          </div>
        </div>
        <div class="status3" v-if='status3'>
          <form class=" passwordBox">
            <div class="form-action phoneBox">
              <input class=" phoneInput" required="required" type="password" name="phone" placeholder="填写8-16位密码(含字母和数字)" v-model="password" maxlength="16" minlength="8" onkeyup="value=value.replace(/[^\w\.\s\/]/ig,'')" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" v-on:blur="getpassword()" v-on:focus="focuspassword()" />
              <i class="form-action-clear iconfont icon-qingchuneirong" v-on:click="clear('password', $event)"></i>
              <span class="eyeBtn" @click="changeEye"><i class="eyeclose eyei"></i></span>
              <p class="error errorPass">{{ errors.first('password') }}</p>
            </div>
            <div class="sumbit passwordBtn" @click="getreg()">确认</div>
          </form>
        </div>
      </div>
      <div class="whoLSW">
        <img src="../../assets/images/lsw-picture.png" alt="">
        <div class="introduce-modal-content">
          <swiper :options="swiperOption2" ref="introduceSwiper">
            <swiper-slide class="swiperS">
              <p>北大光华工商管理硕士学位、香港理工大学经济管理学博士。历任华润集团华润励致西南区总经理、四川中润产业控股有限公司董事长、硅谷天堂资产管理集团董事总经理等。</p>
              <p>1970年出生的他拥有多年的供应链金融一线实践经验，以及丰富的实业从业及企业管理经验。创办普惠理财前，曾担任华润集团华润励致西南区总经理，负责华润励致西南区的全面管理工作。之后又创办了四川中润产业控股有限公司，并担任董事长一职，创造了办公家具行业成立三年销售额超亿元的创业神话。</p>
              <p>后又投身于股权投资行列，担任国内资深PE机构－硅谷天堂董事总经理，成为国内“PE+上市公司”模式的主要推动者之一，同时还兼任君和厚朴、硅谷厚朴两个基金公司的董事长。</p>
            </swiper-slide>
            <swiper-slide class="swiperS2">
              <p>2013年创办了厚朴金控科技集团，成为中国供应链金融领域第一波涉猎者，通过多年创新实践、潜心研究，将厚朴金控科技集团打造成为中国供应链金融领域一张具有影响力的行业名片。</p>
              <p>多年来坚持每年出版一本专著，目前已经出版了包括《冠军之门》、《创业密码》、《创业论语》、《创业者笔记》、《熵：一种新的创业方法论》、《商业保理理论与实务》、《商业保理》、《逆袭者》、等在内的多本专著，这其中半数以上成为供不应求的热门畅销书。</p>
            </swiper-slide>
            <swiper-slide class="swiperS">
              <p>2007年参加了央视举办的大型创业节目《赢在中国》，在16万全球华人精英中夺得全国总冠军，并赢得由马云、柳传志、史玉柱等在内的国内最著名企业家投资的1000万元创业基金。</p>
              <p>作为中国人民大学商学院客座教授、中国农业大学商学院客座教授，热衷商业教育，独创“创业九阴真经”创业教学模块，为同学们提供了丰富多彩的《创业管理》课程指导，同时每年担任6位及以上硕士研究生导师。</p>
              <p>对于诗词亦有独特偏爱，且热爱烹饪，被誉为金融界最会做饭的诗人之美号。京城闻名的“厚朴食堂”、“金山三随斋”为他每周接待朋友、切磋厨艺的必去之处。他的《我和你只有方向》、《致创业者》、《四十岁之后》等诗篇成为国内供应链金融行业耳熟能详的佳作。</p>
            </swiper-slide>
            <div class="swiper-pagination clearfix" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="whoPh">
        <p class="whoP"><span class="whotip1"></span>普惠理财是谁<span class="whotip2"></span></p>
        <div class="whoC">普惠理财(www.puhuilicai.com）隶属于硅谷厚朴（北京）金融信息服务有限公司，硅谷厚朴成立于2014年8月，实缴资本5000万元，注册于北京市石景山区，硅谷厚朴(北京)金融信息服务有限公司是厚朴金控科技集团旗下专业的“互联网+供应链金融”综合信息服务平台。</div>
      </div>
      <div class="down clearfix">
        <div class="fl phimg"></div>
        <div class="downC fl">
          <p class="downCTip">普惠理财APP</p>
          <p class="downCTip2">5年专注供应链金融资产</p>
        </div>
        <div class=" fl downr">
          <a href="https://www.puhuilicai.com/appdownload" target="_blank">立即下载</a>
        </div>
      </div>
      <div class="lender">
        <p class="whoP"><span class="whotip1"></span>平台出借者心声<span class="whotip2"></span></p>
        <div class="dclund-modal-content">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiperS">
              <p>李书文总是我的男神，赢在中国的风采还是久久不能忘却，也改变了我的择偶观，所以单身至今，优秀的人自然会创造出优秀的团队，果然，我没有看错！</p>
              <div class="slspan">来自平台用户：ghe***89</div>
            </swiper-slide>
            <swiper-slide class="swiperS">
              <p>吸引我的是客服的萌妹子们，每次回款特贴心的电话告知，主要是声音甜如蜜，不续投，着实有失我绅士风度了，这样的服务态度，又让我多一个放心！</p>
              <div class="slspan">来自平台用户：zha****ng</div>
            </swiper-slide>
            <swiper-slide class="swiperS">
              <p>看好年化收益，活动定期不断更新，充满了新鲜感，也满足运气爆棚的我，各种福利拿到手软，并非我薅羊毛，只是我想要的在这里都给足了，没有理由让我离开！</p>
              <div class="slspan">来自平台用户：tan***an</div>
            </swiper-slide>
            <swiper-slide class="swiperS">
              <p>我已经观望很久的说，这里有顶级团队架构、始终合规运营、项目的真实性、无一例逾期的回款，着实想过资金一并入住普惠理财，决定不再潜了，一起奔跑吧！</p>
              <div class="slspan">来自平台用户：wan***23</div>
            </swiper-slide>
            <div class="swiper-pagination clearfix" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="yunying">
        <p class="whoP"><span class="whotip1"></span>合规运营{{dateCount}}天<span class="whotip2"></span></p>
        <div class="clearfix yunyingBox">
          <div class="fl yunyingleft">
            <img src="../../assets/images/pershare2.png" />
            <p class="jiaoyi">平台交易总额</p>
            <p class="jiaoyi2">{{bidSum}}元</p>
            <p class="jiaoyi2">≈{{bidSumyi}}亿元</p>
          </div>
          <div class="fl yunyingright">
            <img src="../../assets/images/pershare3.png">
            <p class="jiaoyi">历史投资回报</p>
            <p class="jiaoyi2">{{incomeSum}}元</p>
            <p class="jiaoyi2">≈{{incomeSumyi}}亿元</p>
          </div>
        </div>
      </div>
      <div class="youshi">
        <p class="whoP"><span class="whotip1"></span>平台优势<span class="whotip2"></span></p>
        <ul class="youshiUl clearfix">
          <li class="fl youshili">
            <img src="../../assets/images/pershare4.png" class="Img1" />
            <p class="youship1">模式创新</p>
            <p class="youship2">“互联网+供应链金融”</p>
            <p class="youship2">创新模式—I2AR </p>
          </li>
          <li class="fl youshili">
            <img src="../../assets/images/pershare5.png" class="Img2" />
            <p class="youship1">项目透明</p>
            <p class="youship2">公司背景和贸易合作</p>
            <p class="youship2">无遮掩公示</p>
          </li>
          <li class="fl youshili">
            <img src="../../assets/images/pershare6.png" class="Img3" />
            <p class="youship1">风控健全</p>
            <p class="youship2">独创的风险管理体系</p>
            <p class="youship2">多级风险评价模型</p>
          </li>
          <li class="fl youshili">
            <img src="../../assets/images/pershare7.png" class="Img4" />
            <p class="youship1">运营稳健</p>
            <p class="youship2">不竞速 不跟风慢慢来</p>
            <p class="youship2">做自己</p>
          </li>
        </ul>
      </div>
      <p class="botText1">© {{this.year}} 普惠理财(www.puhuilicai.com)</p>
      <p class="botText2">京ICP备14042685号</p>
      <p class="botText2">出借有风险，入市需谨慎</p>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Validator } from 'vee-validate'
import { Indicator } from 'mint-ui'
const dict = {
  custom: {
    phone: {
      required: '请输入您的手机号！',
      regex: '请输入正确的手机号！',
      length: '请输入正确的手机号！',
      show: true
    },
    code: {
      required: '请输入验证码！',
      length: '您输入的验证码格式有误！'
    }
  }
}
Validator.localize('en', dict)
export default {
  name: 'pershare',
  data () {
    return {
      shareEr: '******',
      perShow: true,
      phone: '',
      code: '',
      swiperOption: {
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperOption2: {
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          transitionEnd: function () {
            console.log(this.activeIndex)
            if (this.activeIndex === 1) {
              $('.introduce-modal-content .swiper-container').css('height', '5.9rem')
            } else {
              $('.introduce-modal-content .swiper-container').css('height', '7.9rem')
            }
          }
        }
      },
      checkStatus: true,
      status1: true,
      status2: false,
      status3: false,
      password: '',
      dateCount: '',
      user: '18860232303',
      parData: '',
      bidSum: '0',
      incomeSum: '0',
      bidSumyi: '0',
      incomeSumyi: '0',
      year: '',
      amount: 0
    }
  },
  mounted () {
    if (this.$route.query.inviteCode) {
      this.perShow = true
      document.title = '现在注册立送688元礼包~'
    } else {
      this.perShow = false
      document.title = '688元新人专享礼包-普惠理财'
    }
    var date = new Date()
    this.year = date.getFullYear() // 获取当前年份
    this.getUserInfo()
    this.getParInfo()
    this.getAmount().then((res) => {
      this.amount = res
    })
  },
  methods: {
    changeEye () {
      console.log($('.eyei').attr('class'))
      if ($('.eyei').is('.eyeclose')) {
        $('.eyei').addClass('eyeopen').removeClass('eyeclose')
        $('.phoneInput').attr('type', 'tel')
      } else {
        $('.eyei').addClass('eyeclose').removeClass('eyeopen')
        $('.phoneInput').attr('type', 'password')
      }
    },
    getreg () {
      console.log(this.phone)
      console.log(this.$md5(this.password))
      console.log(this.$route.query.inviteCode)
      if (this.getpassword()) {
        this.axios({
          url: this.HOST + '/web-server/user/v1/register',
          method: 'POST',
          params: {},
          data: {
            mobile: this.phone,
            password: this.$md5(this.password),
            rand: this.code,
            inviteNo: this.$route.query.inviteCode,
            source: this.$route.query.source
          },
          timeout: this.axiosTimeout,
          transformRequest: [ (data, headers) => {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            })
            $('.submit').text('确认中...')
            return this.$qs.stringify(data)
          }],
          transformResponse: [function (data, headers) {
            Indicator.close()
            $('.submit').text('确认')
            return JSON.parse(data)
          }]
        }).then((res) => {
          console.log(res)
          if (res.data.data.code === '1') {
            console.log('chengg')
            this.status3 = false
            this.status2 = true
          } else {
            this.$layer.toast(res.data.data.msg)
          }
        }).catch((err) => {
          if (err) {
            console.log(err)
            this.$layer.toast('注册失败，请再试一次哦~')
          }
        })
      }
    },
    getcode () {
      console.log('jiaoyanyanzhnegma')
      var _this = this
      console.log(this.checkStatus)
      this.$validator.validate().then(result => {
        if (result) {
          if (this.checkStatus) {
            this.axios({
              url: this.HOST + '/web-server/user/v1/validateMobileCode',
              method: 'POST',
              params: {},
              data: {
                mobile: this.phone,
                type: 1,
                rand: this.code,
                inviteNo: this.$route.query.inviteCode
              },
              timeout: this.axiosTimeout,
              transformRequest: [function (data, headers) {
                Indicator.open({
                  text: '加载中...',
                  spinnerType: 'fading-circle'
                })
                $('.submit').text('提交中...').addClass('background-color-ff9a9a')
                return _this.$qs.stringify(data)
              }],
              transformResponse: [function (data, headers) {
                Indicator.close()
                $('.submit').text('立即领取').removeClass('background-color-ff9a9a')
                return JSON.parse(data)
              }]
            }).then((res) => {
              if (res.data.data.code === '1') {
                console.log('成功')
                console.log(res)
                this.status1 = false
                this.status3 = true
              } else {
                this.$layer.toast(res.data.data.msg)
              }
            }).catch((err) => {
              if (err) {
                this.$layer.toast('验证失败，请重试')
              }
            })
          } else {
            this.$layer.toast('请阅读并同意用户隐私条款')
          }
        }
      })
    },
    focuspassword () {
      $('.errorPass').text('')
    },
    getStatus () {
      console.log(this.checkStatus)
    },
    phoneInput () {
      this.phone = this.phone.replace(/\D/gi, '')
      console.log(this.phone.length)
    },
    getpassword () {
      var regAc = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      if (this.password === '' || this.password === undefined) {
        //  console.log('账号不能为空');
        $('.errorPass').text('密码不能为空')
        return false
      } else if (!regAc.test(this.password)) {
        $('.errorPass').text('密码格式不正确')
        return false
      } else {
        return true
      }
    },
    getUserInfo () {
      this.axios({
        url: this.HOST + '/web-server/account/v1/getInviteUserInfo',
        method: 'GET',
        params: {
          inviteCode: this.$route.query.inviteCode
        },
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
        this.shareEr = res.data.data.userName
      })
    },
    getParInfo () {
      var date = new Date()
      var year = date.getFullYear() // 获取当前年份
      var month2 = date.getMonth() + 1 // 获取当前月份
      var year2 = year
      if (month2 < 10) {
        month2 = '0' + month2
      }
      var t2 = year2 + '-' + month2
      this.axios({
        url: this.HOST + '/web-server/index/v1/getPlatOperation',
        method: 'GET',
        params: {
          date: t2
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        this.parData = res.data.data.plantFormData
        this.incomeSum = this.parData.incomeSum
        this.dateCount = this.parData.dateCount
        this.bidSum = this.fmoney(this.parData.bidSum, 2)
        this.incomeSum = this.fmoney(this.parData.incomeSum, 2)
        this.incomeSumyi = this.fmoney(Number(this.parData.incomeSum) / 100000000, 2)
        this.bidSumyi = this.fmoney(Number(this.parData.bidSum) / 100000000, 2)
      })
    },
    blurIn () {
      window.scroll(0, 0)
    }
  },
  computed: {
    introduceSwiper () {
      return this.$refs.introduceSwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style  lang="less">
  #discover-share-view{
    width: 7.5rem;
    margin: 0 auto;
    .swiper-slide p{
      line-height: 1.7;
    }
    .eyeclose{
      display: block;
      width: .36rem;
      height: .18rem;
      margin: .36rem 0 0 .26rem;
      background: url(../../assets/images/phlc-login-eye-close.png) no-repeat;
      background-size: 99% 99%;
    }
    .eyeopen{
      display: block;
      width: .38rem;
      height: .24rem;
      margin: .34rem 0 0 .25rem;
      background: url(../../assets/images/phlc-login-eye-open.png) no-repeat;
      background-size: 99% 99%;
    }
    .eyeBtn{
      display: inline-block;
      width:.88rem;
      height: .88rem;
      position: absolute;
      right: .1rem;
      top: 0;
    }
  .passwordBtn{
    margin-top:.54rem !important ;
  }
  .passwordBox{
    padding-top: 1rem;
  }
  .lookBtn{
    width:5.6rem;
    height:.88rem;
    background:linear-gradient(90deg,rgba(246,82,75,1),rgba(233,53,47,1));
    box-shadow:0px .08rem .12rem 0px rgba(229,14,14,0.28);
    border-radius:.44rem;
    text-align: center;
    line-height: .88rem;
    color: #ffffff;
    font-size: .32rem;
    margin:.4rem auto;
  }
  .status2 .p1{
    font-size:.32rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(61,58,58,1);
    line-height:.4rem;
    text-align: center;
  }
  .status2 .p2{
    font-size:.24rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#666161;
    line-height:.4rem;
    margin-top: .2rem;
    text-align: center;
  }
  .status2 .p2 span{
    color:#546D92;
  }
  .status2 img {
    width: 2.44rem;
    height:1.44rem;
    margin: .08rem auto .4rem;
  }
  .botText2{
    font-size:.24rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,238,207,1);
    line-height:.3rem;
    text-align: center;
    padding-bottom: .16rem;
  }
  .botText1{
    font-size:.24rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,238,207,1);
    line-height:.3rem;
    text-align: center;
    margin-top: .63rem;
    padding-bottom: .16rem;
  }
  .youship2{
    font-size:.22rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,97,97,1);
    text-align: center;
    line-height: .3rem;
  }
  .youship1{
    font-size:.3rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(61,58,58,1);
    text-align: center;
    margin-bottom: .2rem;
  }
  .youshili .Img1{
    width: .64rem;
    height: .54rem;
    margin: .45rem auto .24rem;
  }
  .youshili .Img2{
    width: .64rem;
    height: .58rem;
    margin: .43rem auto .27rem;
  }
  .youshili .Img3{
    width: .51rem;
    height: .64rem;
    margin: .4rem auto .24rem;
  }
  .youshili .Img4{
    width: .64rem;
    height: .60rem;
    margin: .42rem auto .26rem;
  }
  .youshiUl{
    padding: .48rem .4rem;
  }
  .youshiUl li:nth-child(2n){
    margin-left: .26rem;
  }
  .youshiUl li:nth-child(1){
    margin-bottom: .26rem;
  }
  .youshiUl li:nth-child(2){
    margin-bottom: .26rem;
    border-radius:0rem 0.8rem 0px 0px;
  }
  .youshiUl li:nth-child(3){
    margin-bottom: .26rem;
    border-radius:0rem 0 0px 0.8rem ;
  }
  .youshiUl li:nth-child(4){
    margin-bottom: .26rem;
    border-radius:0rem 0 0.8rem 0px;
  }
  .youshili{
    width: 2.9rem;
    height:2.78rem;
    background:linear-gradient(135deg,rgba(255,252,252,1),rgba(255,226,225,1));
    border-radius:.8rem 0px 0px 0px;
  }
.youshi{
  width:6.86rem;
  height:7.12rem;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px .24rem 0px rgba(133,6,1,0.16);
  border-radius:6px;
  -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    margin: .32rem auto 0 ;
    padding-top: .46rem;
}
  .swiper-pagination-bullet{
    width:.12rem !important;
    height:.06rem !important;
    background:rgba(240,68,61,1) !important;
    border-radius:0 !important;
  }
  .swiper-container{
    height: 3rem;
  }
  .swiper-slide{
    height: 2.2rem;
  }
  .slspan{
    position: absolute;
    right: 0;
    font-size: .28rem;
    color: #3D3A3A;
    font-weight: 600;
  }
    /*.swiper-pagination{
      width: 69px;
      left: 100%;
      transform: translateX(-100%);
      bottom: -0.23rem;
    }*/
    .swiper-pagination-bullet-active{
      background: #F0443D !important;
      width: .38rem !important;
    }
    /*.swiper-pagination-bullet-active{
      width:.48rem !important;
      height:.06rem !important;
      background:#F0443D !important;
      opacity: 1;
    }*/
  .dclund-modal-content{
    width: 6.21rem;
    height: 2.4rem;
    margin: .44rem auto 0;
    font-size:.28rem;
    text-align: justify;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,58,58,1);
  }
  .introduce-modal-content{
    width: 100%;
    font-size:.28rem;
    text-align: justify;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,58,58,1);
    margin-top: .22rem;
    .swiper-container{
      height: 7.9rem;
    }
    .swiper-slide{
      height: 6.6rem;
      p{
        color:#3D3A3A;
      }
    }
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 20px;
        left: 0;
        width: 100%;
    }
  }
  .lender{
    width:6.86rem;
    height:4rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 24px 0px rgba(133,6,1,0.16);
     border-radius:6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    margin: .32rem auto 0 ;
    padding-top: .46rem;
  }
  .jiaoyi2{
    font-size:.24rem;
    text-align: center;
    margin-bottom: ;
  font-family:DINAlternate-Bold;
  font-weight:bold;
  color:rgba(244,108,71,1);
  }
  .jiaoyi{
    font-size:.3rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(61,58,58,1);
    text-align: center;
  }
  .yunyingleft img{
    width: 1rem;
    height:1.21rem;
    margin: 0 auto;
  }.yunyingright img{
    width: 1rem;
    height:1.21rem;
    margin: 0 auto;
  }
  .yunyingBox{
    margin-top: .6rem;
  }
  .yunyingleft{
    width: 50%;
  }
  .yunyingright{
    width: 50%;
  }
  .yunying{
    width:6.86rem;
    height:3.76rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 24px 0px rgba(133,6,1,0.16);
     border-radius:6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    margin: .32rem auto 0 ;
    padding-top: .46rem;
  }
  .downr{
    width:1.8rem;
    height:.72rem;
    background:linear-gradient(90deg,rgba(246,82,75,1),rgba(233,53,47,1));
    box-shadow:0px .08rem .12rem 0px rgba(229,14,14,0.28);
    border-radius:.36rem;
    -webkit-border-radius:.36rem;
  -moz-border-radius: .36rem;
  font-size:.3rem;
  line-height: .72rem;
  text-align: center;
  margin-left: .17rem;
  margin-top: .62rem;
  color: #FFFFFF;
  }
  .downr a{
    color: #FFFFFF;
  }
  .downC{
    width: 2.9rem;
    margin-top: .55rem;
    margin-left: .17rem;
  }
  .downCTip2{
    font-size:.26rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,97,97,1);
  }
  .downCTip{
    font-size:.38rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(61,58,58,1);
  }
  .phimg{
    width:1rem;
    height:1rem;
    background: url(../../assets/images/logo.png) no-repeat;
    background-size: 100% 100%;
    margin-top: .48rem;
    margin-left: .32rem;
  }
  .down{
    width: 6.86rem;
    height: 1.96rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 24px 0px rgba(133,6,1,0.16);
    border-radius:6px;
    -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  margin: .32rem auto 0 ;
  }
  .whoC{
    width: 6.23rem;
    margin: .44rem auto 0;
    font-size: .28rem;
    line-height: 1.7;
    text-align: justify;
    color:#3D3A3A;
  }
  .whoP{
    text-align: center;
    font-size:.36rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(215,51,44,1);
    line-height:.4rem;
  }
  .whotip2{
    display: inline-block;
    width: .5rem;
    height: .28rem;
    background: url(../../assets/images/share9.png) no-repeat;
    background-size: 100% 100%;
    margin-left: .16rem;
  }
  .whotip1{
    display: inline-block;
    width: .5rem;
    height: .28rem;
    background: url(../../assets/images/share9.png) no-repeat;
    background-size: 100% 100%;
    margin-right: .16rem;
  }
  .whoPh{
    width:6.86rem;
    height:4rem;
    padding-top: .46rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px .24rem 0px rgba(133,6,1,0.16);
    border-radius:6px;
    -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  margin: .32rem auto 0 ;
  }
  .whoLSW{
    width:6.86rem;
    background:rgba(255,255,255,1);
    box-sizing: border-box;
    padding: .46rem .32rem 0 .32rem;
    box-shadow:0px 0px .24rem 0px rgba(133,6,1,0.16);
    border-radius:6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    margin: .32rem auto 0 ;
    img{
      width: 6.22rem;
    }
  }
.span {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    top: .05rem;
}
.xieyip{
  text-align: center;
  line-height: .22rem;
}
.xieyi{
  font-size: .24rem;
  margin-left: .2rem;
}
.xieyi i{
  font-size: .24rem;
  color: #546D92;
}
.Checkbox {
    position: absolute;
    visibility: hidden;
}
.Checkbox+label {
    position:absolute;
    width: 16px;
    height: 16px;
    border: 1px solid #999999;
    border-radius: 50%;
    background-color:#ffffff;
}
.Checkbox:checked+label:after {
    content: "";
    color: red;
    position: absolute;
    left: 2px;
    top:2px;
    width: 9px;
    height: 4px;
    border: 2px solid red;
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(-45deg);
    -ms-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
}
  .sumbit{
    width:5.6rem;
    height:.88rem;
    background:linear-gradient(90deg,rgba(246,82,75,1),rgba(233,53,47,1));
    box-shadow:0px .08rem .12rem 0px rgba(229,14,14,0.28);
    border-radius:.44rem;
    font-size:.32rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: .88rem;
    margin: 0 auto .1rem;
    cursor: pointer;
  }
  .codeBtn{
    width: 2rem !important;
    height: .88rem !important;
    background:linear-gradient(90deg,rgba(103,99,99,1),rgba(58,55,55,1))!important;
    border-radius:0px .44rem .44rem 0px !important;
    font-size: .28rem !important;
    line-height: .9rem !important;
    text-align: center !important;
    color: #ffffff !important;
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
    cursor: pointer;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
  }
  .formDiv .passInput{
    width: 3.12rem !important;
    height: .88rem !important;
    background:rgba(247,247,247,1);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: .44rem 0 0 .44rem;
    padding-left: .44rem;
  }
  .formDiv{
    width:5.5rem;
    height: .88rem;
    background:rgba(247,247,247,1);
    border-radius:.44rem;
    margin: 0 auto;
    position: relative;
  }
  .label{
    height: .3rem;
    width: 100%;
    font-size: .24rem;
    color:rgba(255,255,255,1);
    text-align: center;
  }
  #plus-per-content{
    background: url(../../assets/images/pershare.jpg) no-repeat;
    background-color: #EB4741;
    background-size: 100%;
    min-height: 100%;
    padding-top: 1.2rem;
    padding-bottom: .5rem;
  }
  .label p .left{
    display: inline-block;
    width: .48rem;
    height: 1px;
    background:rgba(255,255,255,1);
    margin-bottom: 0.08rem;
  }
  .restatus1{
    width:6.86rem;
    height:5.08rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 24px 0px rgba(133,6,1,0.16);
    border-radius:6px;
    margin: 4.8rem auto 0!important;
  }
  .restatus1 .status1 {
    height: 4.6rem;
    padding-top: .48rem;
  }
  .restatus1 .status2 {
    height: 4.6rem;
    padding-top: .48rem;
  }
  .restatus1 form {
    height: 100%;
    width: 100%;
  }
  .restatus1 form .phoneInput{
    display: block;
    width: 5.12rem;
    height:.88rem;
    background:rgba(247,247,247,1);
    border-radius:.44rem;
    margin: 0 auto 0;
    padding-left: .48rem;
  }
  .form-action{
    width: 5.6rem;
    height:1.36rem;
    margin: 0 auto !important;
  }
  .phoneBox input~.form-action-clear {
    opacity: 0;
    right: .2rem;
}
.passBox input~.form-action-clear {
    opacity: 0;
    right: 2rem;
}
  .error{
    color: red;
    font-size: .24rem;
    padding-left: .4rem;
    position: absolute;
    left: 0;
    top: .95rem !important;
  }
}
</style>
