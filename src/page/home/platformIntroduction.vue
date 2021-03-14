<template>
 <div id="platform-introduction-view" class="plus-screen-view">
   <scrollHeader :scrollHeadText = "textMsg"></scrollHeader>
   <div class="project-introduce-content plus-screen-content">
     <div class="phlc-novice-header">
       <img src="../../assets/images/platform-introduction-header.png" class="platform-introduction-header"/>
        <section class="platform-introduction">
					<img src="../../assets/images/platform-introduction-logo.png" class="platform-introduction-logo"/>
					<p style="text-align: justify;">普惠理财（www.puhuilicai.com） 隶属于硅谷厚朴（北京）金融信息服务有限公司，硅谷厚朴成立于2014年8月，实缴资本5000万元，注册于北京市石景山区，硅谷厚朴（北京）金融信息服务有限公司是厚朴金融旗下的综合互联网金融服务商。</p>
				</section>
        <section class="company-information">
					<h2 class="platform-introduction-title platform-introduction-titleL">从业机构信息</h2>
					<dl>
						<dt>公司全称：</dt>
						<dd>硅谷厚朴（北京）金融信息服务有限公司</dd>
					</dl>
					<dl>
						<dt>成立日期：</dt>
						<dd>2014-08-04</dd>
					</dl>
					<dl>
						<dt>经营状态：</dt>
						<dd>开业</dd>
					</dl>
					<dl>
						<dt>法定代表人：</dt>
						<dd>李书文</dd>
					</dl>
					<dl>
						<dt>经营范围：</dt>
						<dd>金融信息服务(未经前...
							<span class="more" v-on:click="goAgencyImfo()">更多</span>
						</dd>
					</dl>
				</section>
        <section class="advantage-of-platform">
					<h2 class="platform-introduction-title">平台优势</h2>
					<ul>
						<li v-for = "(item, key) in advantageData" :key="key">
							<img :src="item.images"/>
							<h3>{{item.title}}</h3>
							<p>{{item.content1}}</p>
							<p>{{item.content2}}</p>
						</li>
					</ul>
				</section>
        <section>
					<h2 class="platform-introduction-title">银行存管</h2>
          <div class="newBankImg1 Gallery">
            <img src="../../assets/images/advantage-of-platform-bank-depository.png" class="bank-depository-img" preview preview-text="银行管存"/>
          </div>
				</section>
        <section>
					<h2 class="platform-introduction-title">资质证书</h2>
					<swiper :options="swiperOption">
            <swiper-slide>
              <img src="../../assets/images/platform-introduction-1.png" preview preview-text="营业执照"/>
              <p>营业执照</p>
            </swiper-slide>
            <swiper-slide>
              <img src="../../assets/images/platform-introduction-2.png" preview preview-text="组织机构代码证"/>
              <p>组织机构代码证</p>
            </swiper-slide>
            <swiper-slide>
              <img src="../../assets/images/platform-introduction-3.png" preview preview-text="监管部门批文"/>
              <p>监管部门批文</p>
            </swiper-slide>
            <swiper-slide>
              <img src="../../assets/images/platform-introduction-4.png" preview preview-text="北京市互联网金融行业协会"/>
              <p>北京市互联网金融行业协会</p>
            </swiper-slide>
            <swiper-slide>
              <img src="../../assets/images/platform-introduction-5.png" preview preview-text="行业荣誉"/>
              <p>行业荣誉</p>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</section>
        <section class="management-team">
					<h2 class="platform-introduction-title">管理团队</h2>
					<router-link class="linkbox" v-for = "(p, key) in teamData" :data-here="key" :key="key" :to="'/managementDetail/'+key">
						<dt>
							<img :src="p.pic"/>
						</dt>
						<dd>
							<p>{{p.name}}</p>
							<p>{{p.position}}</p>
							<p>{{p.introduce}}</p>
							<span class="more">更多</span>
						</dd>
					</router-link>
				</section>
        <section>
					<h2 class="platform-introduction-title">组织结构</h2>
					<img src="../../assets/images/organization-chart.png" class="organization-chart-img" preview preview-text="组织结构"/>
				</section>
        <section class="contact-us">
					<h2 class="platform-introduction-title">联系我们</h2>
					<dl>
						<dt>
							<img src="../../assets/images/contact-us-tel.png"/>
						</dt>
						<dd>
							<p>电话客服(工作日9:00-19:00)：</p>
							<p>400-8989-189</p>
							<span><a :href="'tel:' + 4008989189" style="color:#E6382C">呼叫</a></span>
						</dd>
					</dl>
					<dl>
						<dt>
							<img src="../../assets/images/contact-us-address.png"/>
						</dt>
						<dd>
							<p>公司地址：</p>
							<p>北京市东城区安德里北街25号</p>
							<span @click="doCopy('北京市东城区安德里北街25号')">复制</span>
						</dd>
					</dl>
				</section>
     </div>
   </div>
 </div>
</template>

<script>
import 'mescroll.js/mescroll.min.css'
import scrollHeader from '@/components/scrollHeader'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
var advantageDatas = [{
  'images': require('../../assets/images/advantage-of-platform-1.png'),
  'title': '模式创新',
  'content1': '“互联网+供应链金融”创',
  'content2': '新模式—I2AR'
}, {
  'images': require('../../assets/images/advantage-of-platform-2.png'),
  'title': '新网存管',
  'content1': '2017.7.12上线新网银行',
  'content2': '资金直接存管模式'
}, {
  'images': require('../../assets/images/advantage-of-platform-3.png'),
  'title': '信息公开',
  'content1': '运营数据，合作伙伴',
  'content2': '信息全程公开'
}, {
  'images': require('../../assets/images/advantage-of-platform-4.png'),
  'title': '项目透明',
  'content1': '公司背景和贸易合作',
  'content2': '无遮掩公示'
}, {
  'images': require('../../assets/images/advantage-of-platform-5.png'),
  'title': '风控健全',
  'content1': '公司背景和贸易合作',
  'content2': '多级风险评价模型'
}, {
  'images': require('../../assets/images/advantage-of-platform-6.png'),
  'title': '运营稳健',
  'content1': '不竞速、不跟风、慢慢来',
  'content2': '做自己'
}]
var teamDatas = [{
  'pic': require('../../assets/images/lsw.png'),
  'name': '李书文',
  'position': '董事长兼总经理',
  'introduce': '北大光华工商管理硕士学位、香港理工大学经济管理学博士...'
}, {
  'pic': require('../../assets/images/cmj.png'),
  'name': '崔明俊',
  'position': 'CEO',
  'introduce': '多年互联网领域从业经验，国内较早的商超B2C先行者...'
}, {
  'pic': require('../../assets/images/th.png'),
  'name': '唐欢',
  'position': '首席技术官',
  'introduce': '河北农业大学工程硕士，高级软件设计师。曾先后就职于...'
}, {
  'pic': require('../../assets/images/yx.png'),
  'name': '袁鑫',
  'position': '首席创新官',
  'introduce': '从事互联网行业５年之久，致力服务的每个产品的“产品设计...'
}]
export default {
  data () {
    return {
      advantageData: advantageDatas,
      teamData: teamDatas,
      swiperOption: {
        notNextTick: true,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      serviceFlag: true,
      textMsg: '普惠理财是谁'
    }
  },
  components: {
    swiper,
    swiperSlide,
    scrollHeader
  },
  methods: {
    goAgencyImfo () {
      this.$router.push({path: '/agencyInformation'})
    },
    handleScroll () {
      let scrollTop = document.body.scrollTop
      this.scroll = scrollTop
    },
    callService () {
      this.serviceFlag = false
      localStorage.setItem('layerShow', false)
      this.$layer.dialog({
        content: "<div class='phlc-layer'>" +
          "<h1 class='phlc-yxfont' style='text-align:center!important;margin-bottom:0.4rem;'>400 8989 189<h1>" +
          "<p class='phlc-text-align-left callSister'>服务时间：9:00-19:00(工作日)</p>" +
          "<p class='phlc-text-align-left callSister'>请于服务时间拨打客服电话，我们将竭诚为您服务~</p>" +
          '</div>',
        shadeClose: false,
        btn: ['取消', '呼叫']
      }).then((res) => {
        if (res === 0) {
          this.serviceFlag = true
          localStorage.setItem('layerShow', true)
        } else {
          localStorage.setItem('layerShow', true)
        }
      })
    },
    doCopy (val) {
      var asd = this.$layer
      this.$copyText(val).then(function (e) {
        asd.toast('复制成功')
      }, function (e) {
        asd.toast('复制失败')
      })
    }
  }
}
</script>

<style lang="less">
@import 'swiper/dist/css/swiper.css';
@import url("../../assets/style/home/platformIntroduction.less");
</style>
