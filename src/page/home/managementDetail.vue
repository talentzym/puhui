<template>
  <div id="detail-view" class="plus-screen-view">
    <wxheader :title='"管理团队"'></wxheader>
    <div class="detail-content plus-screen-content">
      <div class="phlc-novice-header plus-screen-scroll" v-html="this.content">

      </div>
    </div>
  </div>
</template>

<script>
import 'mescroll.js/mescroll.min.css'
import wxheader from '@/components/header'
export default {
  data () {
    return {
      paramId: this.$route.params.key,
      content: '',
      portrait: '',
      imgUrl: ''
    }
  },
  components: {
    wxheader
  },
  mounted: function () {
    if (this.paramId === '0') {
      this.imgUrl = require('../../assets/images/lsw.png')
      this.content = `<img src="${this.imgUrl}"/>
<h2>李书文</h2>
<p class="font-size-28 phlc-text-align-center phlc-marginT-30">董事长兼总经理</p>
<p>北大光华工商管理硕士学位、香港理工大学经济管理学博士。历任华润集团华润励致西南区总经理、四川中润产业控股有限公司董事长、硅谷天堂资产管理集团董事总经理等。</p>
<p>曾获得2007年央视“赢在中国”全国总冠军、2008年全国杰出总经理“金鼎奖”、2009年全国十大杰出青年创业者、2010年中国十大出借人等荣誉。</p>
<p>并任中国人民大学、中国农业大学等多所高校的客座教授。著有《创业者笔记》、《冠军之门》、《创业论语》、《逆袭者》、《创业密码解读：人、团队、出借》、《商业保理理论与实务》等。</p>
<p>李书文是普惠理财创始人。1970年出生的他拥有多年的供应链金融一线实践经验，以及丰富的实业从业及企业管理经验。</p>
<p>在创办普惠理财曾担任华润集团华润励致西南区总经理，负责华润励致西南区的全面管理工作。之后又创办了四川中润产业控股有限公司，并担任董事长一职，创造了办公家具行业成立三年销售额超亿元的创业神话。后又投身于股权投资行列，担任国内资深PE机构－硅谷天堂董事总经理，成为国内“PE+上市公司”模式的主要推动者之一，同时还兼任君和厚朴、硅谷厚朴两个基金公司的董事长。2013年创办了厚朴金融，成为中国供应链金融领域第一波涉猎者，通过多年创新实践、潜心研究，将厚朴金融打造成为中国供应链金融领域一张具有影响力的行业名片。</p>
<p>李书文曾以优异的成绩获得北京大学光华管理学院工商管理硕士学位，以及香港理工大学管理学博士学位。并且多年来坚持每年出版一本专著，目前已经出版了包括《创业者笔记》、《冠军之门》、《创业论语》、《逆袭者》、《创业密码》、《商业保理理论与实务》、《商业保理》、《熵：一种新的创业方法论》等在内的多本专著，这其中半数以上成为供不应求的热门畅销书。</p>
<p>李书文参加了2007年央视举办的大型创业节目《赢在中国》，在16万全球华人精英中夺得全国总冠军，并赢得了由马云、柳传志、史玉柱等在内的国内最著名企业家投资的1000万元创业基金。李书文热衷商业教育，作为中国人民大学商学院客座教授、中国农业大学商学院客座教授，他独创的“创业九阴真经”的创业教学模块，为同学们提供了丰富多彩的《创业管理》课程指导，同时每年担任6位及以上硕士研究生导师。李书文热爱烹饪，京城闻名的“厚朴食堂”、“金山三随斋”成为他每周接待朋友、切磋厨艺的必去之处。李书文对于诗词亦有独特偏爱，被誉为金融界最会做饭的诗人之美号，他的《四十岁之后》、《我和你只有方向》、《致创业者》等诗篇成为国内供应链金融行业耳熟能详的佳作。</p>`
    } else if (this.paramId === '1') {
      this.imgUrl = require('../../assets/images/cmj.png')
      this.content = `<img src="${this.imgUrl}"/>
<h2>崔明俊</h2>
<p class="font-size-28 phlc-text-align-center phlc-marginT-30">CEO</p>
<p>多年互联网领域从业经验，国内较早的商超B2C先行者。丰富的互联网及集团公司信息化管理经验。</p>
<p>曾任滨地集团信息技术经理、中润集团CTO，厚朴金融信息部总监，普惠理财首席技术官（CTO）。坚信充分利用信息技术是企业高速成长的快捷方式。</p>
<p>崔明俊是普惠理财创始团队成员、普惠理财的最早发起人之一。他早年是一名电商B2C创业者，创业遇挫后的很长一段时间先后在多家企业全面负责信息化建设工作，在这个领域拥有超过10年的丰富经验，他坚信充分利用信息技术是企业高速成长的快捷方式。</p>
<p>同时他还是一名极客，是以创新和技术为生命意义的人，对互联网新事物始终保持强烈的好奇心和异乎寻常的热爱，同时对一切他眼中的“落后”有近乎偏执的抵触，比如他在公司内部拒绝使用电子邮件和微信进行办公协作，因为在他看来这种碎片化和低效的方式是对时间的不尊重。</p>`
    } else if (this.paramId === '2') {
      this.imgUrl = require('../../assets/images/th.png')
      this.content = `<img src="${this.imgUrl}"/>
<h2>唐欢</h2>
<p class="font-size-28 phlc-text-align-center phlc-marginT-30">首席技术官</p>
<p>河北农业大学工程硕士，高级软件设计师。曾先后就职于维尔达集团、北京金创中博等综合性平台，参与政府机构、高等教学机构的企业级信息系统开发与实施。</p>
<p>唐欢拥有5年以上的技术经验，范围从学校的各种应用程序，到B2P网上借贷平台。酷爱球类运动，如排球、羽毛球...午饭过后喜欢上公司附近公园散步。唐欢拥有计算机硕士学位和软件设计中级职称。出生在山水甲天下的桂林，居住在文化底蕴深厚的北京。</p>`
    } else if (this.paramId === '3') {
      this.imgUrl = require('../../assets/images/yx.png')
      this.content = `<img src="${this.imgUrl}"/>
<h2>袁鑫</h2>
<p class="font-size-28 phlc-text-align-center phlc-marginT-30">首席创新官</p>
<p>从事互联网行业５年之久，致力服务的每个产品的“产品设计、用户体验”工作。曾服务的产品包括电商、智能硬件、融资租赁、互联网金融等；天生具有双重星座（水瓶座和处女座）；工作之内，同事都称呼他为“像素眼”，对新鲜事物的好奇和研究更是体现了“水瓶男”；工作之外他还是一个德扑和运动爱好者。</p>`
    }
  }
}
</script>

<style lang="less">
#detail-view{
  width: 7.5rem;
  .detail-content{
    background: #fff;
    overflow-x: hidden;
    padding-top: 1rem;
    text-align: justify;
    img{
      width: 2.4rem;
      margin: 0.3rem auto;
      border-radius: 50%;
    }
    .phlc-text-align-center {
      text-align: center;
    }
    .phlc-marginT-30{
      margin-top: 0.3rem;
    }
    h2{
      text-align: center;
      font-size: 0.36rem;
    }
    p{
      font-size: 0.3rem;
      color: #444;
      line-height: 0.5rem;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
