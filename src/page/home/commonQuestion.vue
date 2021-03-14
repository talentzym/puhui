<template>
 <div id="commonQuestion">
   <wxheader :title="'银行资金管存常见问题'"></wxheader>
   <div class="common-question">
			<ul>
				<li class="letter">
					<p class="question">Q: 银行存管上线后 , 提现会有什么影响？</p>
					<p class="answer">A:&nbsp;&nbsp;用户资金由新网银行存管，只有用户本人才能操作账户上的资金，从根本上杜绝了用户资金被挪用的潜在风险。</p>
				</li>
				<li  class="letter">
					<p class="question">Q: 银行存管上线后 , 用户需要什么操作？</p>
					<p class="answer">A:&nbsp;&nbsp;新注册用户需要在注册的时候开通银行账户，老用户则需要进行激活后才能进行正常的充值、投资、提现等操作。</p>
				</li>
				<li  class="letter">
					<p class="question">Q: 银行存管上线后 , 提现会有什么影响？</p>
					<p class="answer">A:&nbsp;&nbsp;新网银行会在收到申请的当日受理，下一个工作日到账；遇到双休日、国家法定节假日、到账日期将顺延。</p>
				</li>
				<li  class="letter">
					<p class="question">Q: 银行存管上线后 , 有哪些银行卡支持绑定？</p>
					<p class="answer">A:&nbsp;&nbsp;支持17家银行进行绑卡：交通银行、中国银行、中国农业银行、中国工商银行、中国建设银行、中国邮政储蓄银行、招商银行、平安银行、中信银行、华夏银行、中国民生银行、广发银行、浦发银行、兴业银行、中国光大银行、上海银行、北京银行。</p>
				</li>
			</ul>
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
  }
}
</script>

<style lang="less">
.common-question{
  position: absolute;
  top: 0.88rem;
  left: 0;
  right: 0;
  overflow: auto;
  ul {
    background: #fff;
    height: 100%;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    margin-top: 0.2rem;
    padding: 0.2rem 0.3rem;
    .letter{
      text-align: justify;
    }
    li{
      padding: 0 0.02rem;
      margin-left: 0.2rem;
      margin-top: 0.3rem;
      .question{
        font-size: 0.32rem!important;
        font-weight: 500;
        color: #222222;
        font-family:sans-serif !important;
      }
      .answer{
        font-size: 0.26rem;
        letter-spacing: 0.02rem;
        line-height: 0.5rem;
        margin-top: 0.2rem;
        color: #666666;
      }
    }
  }
}
</style>
