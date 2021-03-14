<template>
	<div id="project-view" class="plus-screen-view">
		<header class="phlc-porject-list-nav phlc-first-black">
      <div class="nav fl">直投</div>
      <div class="nav-img fr">
        <router-link :to="{path: '/projectIntroduction'}" tag="span" class="phlc-cursor-pointer phlc-project-list-top-left"><img src="../../assets/images/phlc-project-list-top-left.png"/></router-link>
        <router-link :to="{path: '/calculator'}" tag="span" class="phlc-cursor-pointer phlc-project-list-top-right"><img src="../../assets/images/phlc-project-list-top-right.png"/></router-link>
      </div>
    </header>
    <div class="plus-screen-content">
      <div class="mescroll" id="project-mescroll">
        <div class="plus-screen-scroll" id="project-scroll">
          <section v-on:click="routerLink('/projectDetail', {id: item.id})" class="project-list-section" v-for="(item, $index) in projectData" v-bind:key="$index">
            <p class="phlc-second-black-color project-list-section-tip">
              <span class="namel">{{ item.proName.split("：")[0] ? item.proName.split("：")[0] : '' }}</span>：
              <span class="namer">{{ item.proName.split("：")[1] ? item.proName.split("：")[1] : '' }}</span>
            </p>
            <p class="project-list-describe clearfix">
              <span class="describe-left fl phlc-fourth-black-color">{{ new Date(item.interestEndDate).format('yyyy-MM-dd') }}计息结束</span>
              <span class="describe-center fl phlc-fourth-black-color">风险等级{{ item.proLevel }}</span>
              <span class="describe-right fl progress-box" id="home-progress">
                <span class="progress-box-span phlc-red-normal" v-bind:class=" item.parlars " v-bind:style="{width: item.status === 3 ? item.process + '%' : '100%'}">
                  <i class="progress" id="home-progress2">{{ item.loanProgress }}</i>
                </span>
                <i class="progress" id="home-progress2">{{ item.loanProgress }}</i>
              </span>
            </p>
            <div class="projects-list-cont clearfix">
              <div class="projects-list-contL fl">
                <p class="math-rate phlc-red-normal-color clearfix phlc-yxfont">
                  <span class="fl"><i id="home-rate">{{ item.rate  }}</i></span>
                  <span class="plus-interest fl" v-show="item.addRate">+<i class="interest-value">{{ item.addRate }}</i></span>
                </p>
                <p>借款利率(%)</p>
              </div>
              <div class="projects-list-contC fl">
                <p class="date-math phlc-yxfont">{{ item.deadLine }}</p>
                <p>借款期限(天)</p>
              </div>
              <div class="projects-list-contR fl">
                <p class="lend-amount phlc-yxfont" id="project-financeAmount">{{ fmoney(item.canBidAmount,2) }}</p>
                <p class="company">可出借金额(元)</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import MeScroll from 'mescroll.js'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default {
  name: 'project',
  data () {
    return {
      toTopIcon: require('../../assets/images/phlc-project-fiexd.png'),
      isDown: false,
      projectData: []
    }
  },
  mounted () {
    this.$nextTick(this.$_init())
  },
  activated () {
    if (this.mescroll) {
      this.mescroll.triggerDownScroll()
    }
  },
  methods: {
    $_init () {
      this.mescroll = new MeScroll('project-mescroll', {
        down: {
          callback: this.$_downCallback,
          auto: true
        },
        up: {
          callback: this.$_upCallback,
          isBounce: false,
          noMoreSize: 1,
          htmlNodata: '<p class="upwarp-nodata">到底啦，没有更多啦~</p>',
          toTop: {
            warpId: 'project-mescroll',
            src: this.toTopIcon,
            html: null,
            offset: 1000,
            warpClass: 'mescroll-totop',
            showClass: 'mescroll-fade-in',
            hideClass: 'mescroll-fade-out',
            duration: 300,
            supportTap: false,
            btnClick: null
          },
          onScroll: function (mescroll, y, isUp) {
            if (y) {
              $('header').addClass('header-shadow')
            } else {
              $('header').removeClass('header-shadow')
            }
          }
        }
      })
    },
    $_downCallback () {
      this.isDown = true
      this.mescroll.resetUpScroll(true)
    },
    $_upCallback (page) {
      this.axios({
        url: this.HOST + '/web-server/loanLoanInfo/v1/getLoanList',
        method: 'GET',
        params: {
          page: page.num,
          rows: page.size,
          appModel: 'no'
        },
        data: {},
        timeout: this.axiosTimeout
      }).then((res) => {
        if (this.isDown) {
          this.projectData = []
          this.isDown = false
        }
        for (let i in res.data.data.list) {
          switch (res.data.data.list[i].status) {
            case 3:
              res.data.data.list[i].parlars = ''
              res.data.data.list[i].loanProgress = '进度' + res.data.data.list[i].process + '%'
              break
            case 4:
              res.data.data.list[i].parlars = 'color-orgin'
              res.data.data.list[i].loanProgress = '已满标'
              break
            case 6:
              res.data.data.list[i].parlars = 'color-green'
              res.data.data.list[i].loanProgress = '还款中'
              break
            case 7:
              res.data.data.list[i].parlars = 'color-gray'
              res.data.data.list[i].loanProgress = '已完成'
              break
          }
        }
        this.projectData = this.projectData.concat(res.data.data.list)
        this.mescroll.endSuccess()
        this.mescroll.endBySize(this.projectData.length, res.data.data.total)
      }).catch((err) => {
        if (err) {
          this.mescroll.endErr()
        }
      })
    }
  }
}
</script>

<style lang="less">
#project-view{
  .plus-screen-content{
    bottom: 1rem;
    .plus-screen-scroll{
      padding: 0;
    }
  }
  .phlc-porject-list-nav {
    position: absolute;
    top: 0rem;
    height: 0.88rem;
    right: 0;
    font-size: .3rem;
    left: 0;
    text-align: center;
    background-color: #fff;
    padding-left: .4rem;
    z-index: 5;
    overflow: hidden;
    .nav{
      color: #ef402e;
      font-weight: bold;
      font-size: .42rem;
      line-height: 0.88rem;
    }
    .nav-img {
      width: 2.2rem;
      height: 100%;
      position: relative;
      .phlc-project-list-top-right, .phlc-project-list-top-left{
        display: block;
        width: .42rem;
        position: absolute;
        bottom: .22rem;
        right: 1.2rem;
        &.phlc-project-list-top-right{
          right: 0.4rem;
        }
        img{
          width: 100%;
        }
      }
    }
  }
  .project-list-section {
    width: 7.5rem;
    margin: 0 auto;
    height: 3.2rem;
    padding: .55rem .4rem 0;
    background-color: #fff;
    border-bottom: .02rem solid #F8F8F9;
    box-sizing: border-box;
  }
  .project-list-section-tip {
    font-size: .3rem;
    position: relative;
    left: -.15rem;
    width: 6.7rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .project-list-describe {
    margin-top: .26rem;
    .color-red {
      background-color: #e6382c;
      color: #fff;
    }
    .color-gray {
      background-color: #D3D3D3;
      color: #fff;
    }
    .color-orgin {
      background: #FFAF14 !important;
      color: #fff !important;
    }
    .color-green {
      background: #04C228 !important;
      color: #fff !important;
    }
    .describe-left {
      display: block;
      background-color: #f9f9f9;
      font-size: .2rem;
      height: .38rem;
      line-height: .4rem;
      margin-right: .2rem;
      text-align: center;
      padding: 0 0.2rem;
    }
    .describe-center {
      display: block;
      background-color: #f9f9f9;
      font-size: .2rem;
      height: .38rem;
      line-height: .4rem;
      margin-right: .2rem;
      text-align: center;
      padding: 0 0.2rem;
    }
    .describe-right {
      display: block;
      width: 1.26rem;
      height: .38rem;
      border-radius: .04rem;
      -webkit-border-radius: .04rem;
      -moz-border-radius: .04rem;
      background-color: #fcebe9;
      text-align: center;
      position: relative;
      font-size: .2rem;
      color: #e6382c;
    }
    .describe-rightT {
      display: inline-block;
      width: 1.26rem;
      height: .38rem;
      border-radius: .04rem;
      -webkit-border-radius: .04rem;
      -moz-border-radius: .04rem;
      text-align: center;
      background: #000000;
      font-size: .2rem;
      color: #fff;
    }
  }
  .progress {
    position: absolute;
    left: .63rem;
    top: 50%;
     transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);    /* for Chrome || Safari */
      -moz-transform:  translate(-50%, -50%);       /* for Firefox */
       -ms-transform:  translate(-50%, -50%);  /* for IE */
      -o-transform:  translate(-50%, -50%);        /* for Opera */
    white-space: nowrap;
  }
  .progress-box-span {
    display: block;
    position: absolute;
    height: 100%;
    width: 0;
    color: white;
    overflow: hidden;
    z-index: 10;
    border-radius: .04rem;
    -webkit-border-radius: .04rem;
    -moz-border-radius: .04rem;
    max-width: 1.26rem;
  }
  .projects-list-cont {
    text-align: left;
    margin-top: .3rem !important;
    div p:nth-of-type(2) {
      margin-top: .1rem;
      font-size: .24rem !important;
    }
    .math-rate {
      font-size: .48rem;
    }
    .projects-list-contL {
      width: 2.24rem;
      position: relative;
      top: -0.13rem;
      .math-rate {
        font-size: .48rem;
        color: #E6382C;
        padding: 0;
      }
    }
    .projects-list-contC {
      width: 2.24rem;
      height: .88rem;
      .date-math {
        font-size: .36rem;
        color: #444444;
      }
    }
    .projects-list-contR {
      width: 2.2rem;
      .lend-amount {
        font-size: .36rem;
        color: #444444;
      }
    }
  }
  .plus-interest {
    display: inline-block;
    height: .38rem;
    padding: 0rem .09rem;
    line-height: .34rem;
    color: #FFF;
    font-size: .3rem;
    border-radius: .04rem;
    -webkit-border-radius: .04rem;
    -moz-border-radius: .04rem;
    margin-left: .04rem;
    background: url(../../assets/images/phlc-project-pingxing.png) no-repeat;
    background-size: 100% 100%;
    margin-top: .12rem;
    .interest-value {
      padding: 0;
      height: 100%;
    }
  }
  .display-none {
    display: none;
  }
}

</style>
