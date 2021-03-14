<template>
  <div id="project-introduction-view" class="plus-screen-view">
    <wxheader :title="'项目介绍'" :isToggle="true"></wxheader>
    <div class="plus-screen-content project-introduce-content mescroll">
      <div class="plus-screen-scroll">
        <h3>3大项目介绍</h3>
        <p>专注于以大型国企、央企、上市公司的应付账款， 中小微企业应收账款为核心资产</p>
        <ul>
          <li>
            <div>
              <img src="../../assets/images/project-introduce-1.png"/>
            </div>
            <div>
              <h3>核心保</h3>
              <p>上市企业、国企、央企的供应商的应收账款  </p>
              <p>合作客户：北京建工、葛洲坝集团、中国风电总公司等</p>
            </div>
          </li>
          <li>
            <div>
              <img src="../../assets/images/project-introduce-2.png"/>
            </div>
            <div>
              <h3>零供保</h3>
              <p>零售商超、百货大楼、卖场等其供应商的应收账款</p>
              <p>合作客户：华润万家、永辉超市等</p>
            </div>
          </li>
          <li>
            <div>
              <img src="../../assets/images/project-introduce-3.png"/>
            </div>
            <div>
              <h3>承信保</h3>
              <p>平台创新推出以借款人持有的央企、国企、上市公司等企业签发并承兑的商业承兑汇票为还款保障的金融产品。</p>
            </div>
          </li>
          <!--<li>
            <div>
              <img src="../../assets/images/project-introduce-4.png"/>
            </div>
            <div>
              <h3>环境保</h3>
              <p>厚朴金融通过战略合作伙伴，向再生资源环保型企业提供的手续简便、流程高效的专属融资产品</p>
            </div>
          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
import $ from 'jquery'
import 'mescroll.js/mescroll.min.css'
export default{
  components: {
    wxheader
  },
  mounted () {
    var scrollHeight = $('.project-introduce-content > div').outerHeight(true) - window.screen.height
    scrollHeight = scrollHeight >= 150 ? 150 : scrollHeight
    $('.project-introduce-content').on('scroll', function (e) {
      var percent = Math.abs($(this).children().offset().top) / scrollHeight
      $('header').css({'background': 'rgba(255,255,255,' + percent + ')', 'box-shadow': '.02rem .02rem 0.15rem rgba(204,204,204,' + percent + ')', 'color': 'rgba(0,0,0,' + percent + ')'})
      var rgb = Math.round(255 * (1 - percent)) <= 116 ? 116 : Math.round(255 * (1 - percent))
      $('header .iconfont').css('color', 'rgb(' + rgb + ',' + rgb + ',' + rgb + ')')
    })
  }
}
</script>

<style lang="less">
#project-introduction-view{
  img{
    width:100%;
  }
  .plus-screen-scroll{
    padding: 0;
  }
  .project-introduce-content{
    position: absolute;
    top: 0.01rem;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    >div{
      width: 100%;
      background: url(../../assets/images/project-introduce.png) no-repeat;
      background-size: 100%;
      padding-top: 4rem;
      >h3{
        text-align: center;
        font-size: 0.4rem;
        color: #fff;
        position: absolute;
        left: 0;
        top: 1.3rem;
        width: 100%;
      }
      >p{
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 2.1rem;
        margin: 0 0.4rem;
      }
      ul{
        border-radius: 0.2rem 0.2rem 0 0;
        background: #fff;
        padding:0 0.5rem;
        li{
          height: 3rem;
          padding-top: 0.75rem;
          display: flex;
          border-bottom: 1px solid #eee;
          &:nth-child(2), &:nth-child(4){
            flex-direction:row-reverse;
          }
          div:first-child{
            width: 2.4rem;
            img{
              width: 1.68rem;
              margin: 0 auto;
            }
          }
          div:last-child{
            width: 4.1rem;
          }
        }
      }
    }
    h3{
      color: #444;
      font-size: 0.36rem;
      line-height: 0.5rem;
    }
    p{
      color: #444;
      font-size: 0.26rem;
      line-height: 0.4rem;
    }
  }
}

</style>
