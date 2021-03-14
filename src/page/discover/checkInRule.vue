<template>
 <div id="checkInRule-view"  class="plus-screen-view">
   <wxheader :title="'签到规则'"></wxheader>
   <div class="plus-screen-content mescroll">
    <div class="plus-screen-scroll">
      <div class="section-1">
        <p class="title">年度任务</p>
        <p class="text-color-2 marBottom-30">首次签到后365天开启新一轮的签到，用户再次期间签到到达一定时间后，可以领取相应的连续，累计签到任务奖励：</p>
        <p class="text-color-2 marBottom-30">
          1、连续签到7天：奖励1‰加息券<br/>
          2、连续签到15天：奖励2‰加息券<br/>
          3、连续签到30天：奖励20元返现券<br/>
          4、连续签到60天：奖励5‰加息券<br/>
          5、连续签到90天：奖励20元返现券<br/>
          6、连续签到120天：奖励5‰加息券<br/>
          7、连续签到150天：奖励20元返现券<br/>
          8、连续签到180天：奖励5‰加息券<br/>
          9、连续签到210天：奖励20元返现券<br/>
          10、连续签到240天：奖励5‰加息券<br/>
          11、连续签到270天：奖励20元返现券<br/>
          12、连续签到300天：奖励5‰加息券<br/>
          13、连续签到330天：奖励20元返现券<br/>
        </p>
        <p class="text-color-1">如签到中断，则连续签到记录将重新开始计算；奖励自动发放至账户，用户需自行去我的卡券或我的积分查看；</p>
      </div>
      <div class="section-1">
        <p class="title">长期任务</p>
        <p class="text-color-2 marBottom-30">新的签到规则更新后，之前的累计签到有效，并根据累计签到的时长发放相应的奖励</p>
        <p class="text-color-2 marBottom-30">
          1、连续签到满100天：奖励50元返现券<br/>
          2、连续签到满200天：奖励50元返现券<br/>
          3、连续签到满300天：奖励50元返现券<br/>
          4、连续签到满一年即365天：奖励88元返现券<br/>
        </p>
        <p class="text-color-1">如签到中断，则连续签到记录将重新开始计算；奖励自动发放至账户，用户需自行去我的卡券或我的积分查看；</p>
      </div>
      <div class="section-1">
        <p class="title">补签规则说明</p>
        <p class="text-color-2">用户可补签之前一天的漏签信息；</p>
        <p class="text-color-3 marBottom-30">例如，今天为2019年6月15日，用户可补签2019年6月14日的签到信息，但不可补签2019年6月13日的签到信息。</p>
        <p class="text-color-2">单次补签需花费50积分。</p>
      </div>
    </div>
   </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
import 'mescroll.js/mescroll.min.css'
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
#checkInRule-view{
  .plus-screen-content{
    top: 0;
    overflow-x: hidden;
    .plus-screen-scroll{
      padding: 0;
      background-color: #F8F8F9;
      background-size: 100%;
      min-height: 100%;
      padding: 1.6rem 0 0.53rem 0;
      position: relative;
      background: #F8F8F9;
      .section-1{
        padding: 0 .42rem 0 .72rem;
        font-size: .28rem;
        margin-bottom: .6rem;
        .title{
          color: #222222;
          font-size: .32rem;
          font-weight:500;
          position: relative;
          margin-bottom: .37rem;
          &::before{
            content: '';
            position: absolute;
            left: -15px;
            top:8px;
            display: inline-block;
            width:.12rem;
            height:.12rem;
            background:rgba(37,37,37,1);
            transform: rotate(45deg);
          }
        }
        .marBottom-30{
          margin-bottom: .3rem;
        }
        .text-color-1{
          color: #222222;
        }
        .text-color-2{
          color: #444444;
        }
        .text-color-3{
          color: #666666;
        }
      }
    }
  }
}
</style>
