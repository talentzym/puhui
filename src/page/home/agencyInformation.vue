<template>
 <div>
   <wxheader :title='"从业机构信息"'></wxheader>
   <div class="detail-content">
     <div>
				<section>
					<h2>工商信息</h2>
					<ul>
						<li>
							<p>公司全称：</p>
							<p>硅谷厚朴（北京）金融信息服务有限公司</p>
						</li>
						<li>
							<p>成立日期：</p>
							<p>2014-08-04</p>
						</li>
						<li>
							<p>经营状态：</p>
							<p>开业</p>
						</li>
						<li>
							<p>法定代表人：</p>
							<p>李书文</p>
						</li>
						<li>
							<p>注册资本：</p>
							<p>5000万元</p>
						</li>
						<li>
							<p>实缴资本：</p>
							<p>5000万元
								<a href="https://www.puhuilicai.com/views/CompanyMessage/law/guigu_houpu_yanzibaogao.pdf" target="_blank">《验资报告》</a>
							</p>
						</li>
						<li>
              <p>注册地址：</p>
              <p>北京市石景山区实兴大街30号院3号楼2层C-0030</p>
            </li>
						<li>
							<p>经营范围：</p>
							<p style="text-align: justify;">金融信息服务（未经前置许可不得开展金融业务）；计算机系统服务；经济贸易咨询；技术推广、技术开发；技术咨询；技术转让。（企业依法自主选择经营项目，开展经营活动；依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动；不得从事本市产业政策禁止和限制类项目的经营活动。）</p>
						</li>
					</ul>
				</section>
				<section>
					<h2>平台信息</h2>
					<ul>
						<li>
							<p>平台名称：</p>
							<p>普惠理财</p>
						</li>
						<li>
							<p>网站或平台地址：</p>
							<p>www.puhuilicai.com
								<a href="javascript:;" class="copy" style="left: 2.72rem;" @click="doCopy('www.puhuilicai.com')"><img src="../../assets/images/copy.png"/></a>
							</p>
						</li>
						<li>
							<p>平台上线运营时间：</p>
							<p>2014年10月08日</p>
						</li>
						<li>
							<p>相应电信业务经营许可信息：</p>
							<p>京ICP备14042685号
								<a href="javascript:;" class="copy" style="left: 2.7rem;" @click="doCopy('京ICP备14042685号')"><img src="../../assets/images/copy.png"/></a>
							</p>
						</li>
						<li>
							<p>微信公众号：</p>
							<p>普惠理财(puhuilicai)
								<a href="javascript:;" class="copy" @click="doCopy('普惠理财')"><img src="../../assets/images/copy.png"/></a>
							</p>
						</li>
						<li>
							<p>移动APP应用：</p>
							<p>普惠理财-新网银行存管版</p>
							<a href="https://www.puhuilicai.com/appdownload" class="newApp">查看</a>
						</li>
						<li>
							<p>当前经营场所：</p>
							<p>北京市西城区安德里北街2号</p>
						</li>
						<li>
							<p>资金存管情况：</p>
							<p>新网银行资金存管
                  <a href="javascript:;" @click="showMore">《存管协议》</a>
							</p>
						</li>
						<li>
							<p>注册协议模板：</p>
							<p>普惠理财用户隐私条款</p>
							<span v-on:click="goOtherPage()">查看</span>
						</li>
					</ul>
				</section>
			</div>
   </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
export default {
  data () {
    return {

    }
  },
  components: {
    wxheader
  },
  methods: {
    goOtherPage () {
      this.$router.push({path: '/provision'})
    },
    doCopy (val) {
      var asd = this.$layer
      this.$copyText(val).then(function (e) {
        asd.toast('复制成功')
      }, function (e) {
        asd.toast('复制失败')
      })
    },
    showMore () {
      this.$preview(
        [
          {
            src: require('../../assets/images/knowNewBank15.png'),
            w: 621,
            h: 866
          },
          {
            src: require('../../assets/images/knowNewBank14.png'),
            w: 621,
            h: 866
          }
        ]
      )
    }
  }
}
</script>

<style lang="less">
.detail-content{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  overflow: auto;
  section{
    border-top: 0.18rem solid #f8f8f9;
    padding: 0.88rem 0.4rem 0.8rem 0.4rem;
    h2{
      font-size: 0.3rem;
      border-left: 0.08rem solid #E6382C;
      padding-left: 0.2rem;
      margin: 0.4rem 0  0.2rem 0;
      height: .26rem;
    }
    ul{
      li{
        margin-top: 0.3rem;
        position: relative;
        p{
          .copy{
            display: inline-block;
            width: 0.88rem;
            height: 0.88rem;
            padding: 0.32rem;
            position: absolute;
            top: -0.2rem;
            left: 2.9rem;
            img{
              width: 0.24rem;
            }
          }
        }
        p:first-child{
          font-size: 0.24rem;
          color: #666;
        }
        p:nth-child(2){
          font-size: 0.3rem;
          color: #222;
          margin-top: 0.1rem;
          position: relative;
        }
        span{
          width: 0.8rem;
          height: 0.36rem;
          line-height: 0.36rem;
          text-align: center;
          border: 1px solid #E6382C;
          border-radius: 0.16rem;
          color: #E6382C;
          font-size: 0.18rem;
          position: absolute;
          right: 0;
          bottom: 0.05rem;
        }
        .newApp{
          width: 0.8rem;
          height: 0.36rem;
          line-height: 0.36rem;
          text-align: center;
          border: 1px solid #E6382C;
          border-radius: 0.16rem;
          color: #E6382C;
          font-size: 0.18rem;
          position: absolute;
          right: 0;
          bottom: 0.05rem;
        }
      }
    }
  }
  section:nth-of-type(2){
    border-top: 0.18rem solid #f8f8f9;
    padding: 0 0.4rem 0.8rem 0.4rem;
  }
}
</style>
