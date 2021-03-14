<template>
  <div id="authenticationInformation-view" class="plus-screen-view">
    <wxheader :isToggle="true"></wxheader>
    <div class="plus-screen-content">
      <div class="plus-screen-scroll">
        <div class="phlc-newbankStatus-header">
          <p class="novice-header-tip">于2017.07.14上线</p>
          <router-link to="/knowNewbank" tag="p" class="novice-header-tip2">
            <span>什么是银行存管？</span>
            <span class="novice-header-tip2Accrow"></span>
          </router-link>
        </div>
        <p class="novice-header-tip3"></p>
        <ul class="newbankStatus-C">
          <li class="realName clearfix goshiming">
            <div class="realNameImg fl"><img src="../../assets/images/phlc-newbankStatus3.png"/></div>
            <div class="fl realNamemessage">
              <p class="realNametip1 phlc-first-black-color">实名认证
                <span class="realNametip11 realNameTxt">已实名</span>
              </p>
              <p class="realNametip2 phlc-fourth-black-color">完善实名认证，资金账户更安全</p>
            </div>
            <span class="realNameStatus fr realNameStatusTip gorealname" id="goRealNameInfo" v-on:click="realName()">去实名</span>
          </li>
          <li class="realName clearfix">
            <span class="realNameImg fl"><img src="../../assets/images/phlc-newbankStatus3.png"/></span>
            <span class="fl realNamemessage">
              <p class="realNametip1 phlc-first-black-color">绑定银行卡
                <span class="realNametip11 bankCard">已绑定</span>
              </p>
              <p class="realNametip2 phlc-fourth-black-color">绑定银行卡，充值提现更便利</p>
            </span>
            <span class="realNameStatus fr realNameStatusTip banknumber" id="goRealNameInfo" v-on:click="bindBank()">去绑定</span>
            <!--<span class="realNameStatus fr" onclick="jumpToBankView()"><i class="realNameStatusTip banknumber">去绑定</i><i class="realNameStatusTipAcc"></i></span>-->
          </li>
          <li class="realName clearfix borderno">
            <span class="realNameImg fl"><img src="../../assets/images/phlc-newbankStatus3.png"/></span>
            <span class="fl realNamemessage" id="ceping">
              <p class="realNametip1 phlc-first-black-color">风险评测
                <i class="realNametip11 ceping" >已评测</i>
              </p>
              <p class="realNametip2 phlc-fourth-black-color">测评后，普小二更了解您哦</p>
            </span>
            <span class="realNameStatus fr realNameStatusTip goceping" id="goceping">去测评</span>
            <!--<span class="realNameStatus fr" id="goceping"><i class="realNameStatusTip goceping">去测评</i><i class="realNameStatusTipAcc"></i></span>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import wxheader from '@/components/header'
export default{
  data () {
    return {
      data: {}
    }
  },
  components: {
    wxheader
  },
  methods: {
    getcustUserInfo () {
      this.axios({
        url: this.HOST + '/web-server/account/v1/custUserInfo',
        method: 'GET',
        params: {},
        data: {},
        timeout: 5000
      }).then((res) => {
        
        if (res.data.code) { //请求成功
          this.data = res.data.data
          if(this.data.code === 1111) { //未登录
            this.$route.push({
              path: '/login'
            })
            goLogin('../account/newbankStatus.html')
          } else if (this.data.code === 1) {
//          if(data.data.custUserInfo.mobile) { //是否绑定手机
//            mobileStatus = 1;
//          } else {
//            mobileStatus = 0;
//          };
//          idCard = data.data.realNameInfo.idCard
            if (this.data.activeMsg !== 'AUTH_BANK') {
              $('.realNameTxt').show()
              var realName =  this.data.realNameInfo.realName.substr(this.data.realNameInfo.realName.length - 1, 1)
              $('.gorealname').text('(**' + realName + ')')
              $('.gorealname').addClass('color666')
            }else{
              $('.realNameTxt').hide()
              $('.gorealname').removeClass('color666')
            }
//          if(data.data.activeMsg == "1") { //验证成功
//            newBankStatus = "2";
//          } else if(data.data.activeMsg == "AUTH_BANK"){//未开通  
//            newBankStatus = "0";
//          }else if(data.data.activeMsg == "AUTH_ACTIVE_USER") {//未激活
//            newBankStatus = "1";
//          };
            if (this.data.bankMsg === 1) {//已绑卡
              $('.bankCard').show()
              $('.banknumber').text('(尾号' + this.data.bankInfo.bankNo.substr(-4)+ ')')
              $('.banknumber').addClass('color666')
//            BankStatus = "1";
            } else {
              $('.bankCard').hide()
//            BankStatus = "0";
            }
            if (!this.data.custUserInfo.riskLevel) {
              $('.ceping').hide();
//            cepingStatus = "1";
            } else {
//            cepingStatus = "0";
              $('.ceping').show()
              $('.goceping').addClass("color666")
              $('.goceping').text(this.data.custUserInfo.riskLevel)
            }
          }
        }
      })
    },
    realName () {
      var realNameTxt = $(".gorealname").text();
      if(realNameTxt == '去实名'){
        alert('去实名认证')
//      mui.openWindow({
//        url: "../user/bankDepository.html",
//        id: "bankDepository.html",
//        extras: {
//          type: "2"
//        },
//        createNew: true
//      })
      }else{
        alert('去实名认证结果页')
//      var realType = '**' + realName;
//      mui.openWindow({
//        url: "realName.html",
//        id: "realName.html",
//        extras: {
//          realName: realType,
//          idCard: idCard
//        },
//        createNew: true
//      })
      }
    },
    bindBank () {
      var bankText = $('#set-bank').text()
      var mobileText = $('#set-realNameInfo').text()
//    if (this.data.custUserInfo.mobile) {
//      if (this.data.activeMsg === 'AUTH_BANK') {
          this.$layer.open({
            content: '<div class="phlc-layer">' +
              '<div class="phlc-vCode-mask-center" style="line-height:0.8rem;text-align:center;">您暂未开通银行存管</div>' +
              '</div>',
            btn: ['立即开通', ' 再看看 ']
          })
          /*layer.open({
            content:"<div class='phlc-layer'>" +
              "<img src='../../img/project-bankcunguan-window-bg.png' style='width:1.82rem;margin:0 auto;'/>"+
              "<div class='phlc-vCode-mask-center' style='line-height:0.8rem;text-align:center;'>您暂未开通银行存管</div>" +
              "</div>",
            btn: ['立即开通', '再看看'],
            yes: function(index) {
              mui.openWindow({
                url: "../user/bankDepository.html",
                id: "bankDepository.html",
                extras: {
                  type: "2"
                },
                createNew: true
              })
              layer.close(index);
            }
          })*/
//      } else if(newBankStatus == "1"){//未激活
//        $("#lightBack").show();
//        $("#mask-box").show();
//      } else {
//        if(BankStatus == "0"){
//          mui.openWindow({
//            url: "../account/binding-bank.html",
//            id: "binding-bank.html",
//            extras: {},
//            createNew: true
//          })
//        }else{
//          mui.openWindow({
//            url: "../account/bank.html",
//            id: "bank.html",
//            extras: {},
//            createNew: true
//          })
//        }
//        
//      }
//    }else{
//      layer.open({
//        content:"<div class='phlc-layer'>" +
//          "<img src='../../img/project-tel-window-bg.png' style='width:1.82rem;margin:0 auto;'/>"+
//          "<div class='phlc-vCode-mask-center' style='line-height:0.8rem;text-align:center;'>您暂未绑定手机号，无法绑定银行卡</div>" +
//          "</div>" ,
//        btn: ['立即绑定', '再看看'],
//        yes: function(index) {
//          mui.openWindow({
//            url: "../user/bindPhoneNumber.html",
//            id: "bindPhoneNumber.html",
//            extras: {
//              type: "2"
//            },
//            createNew: true
//          })
//          layer.close(index);
//        }
//      });
//    }
    }
  },
  mounted () {
    this.getcustUserInfo()
  }
}
</script>

<style lang="less">
#authenticationInformation-view{
  .plus-screen-content{
    top: 0;
    .plus-screen-scroll{
      padding: 0;
    }
  }
  .phlc-newbankStatus-header{
    width: 7.5rem;
    height: 4.4rem;
    margin: 0 auto;
    background: url(../../assets/images/phlc-newbankStatus1.png) no-repeat;
    background-size: 100% 100%;
    font-size: 0.36rem;
    z-index: 1;
    padding: 2.8rem 0.4rem 0rem 0.4rem;
    box-sizing: border-box;
    position: relative;
    top: 0;
  }
  body{
    background: #f8f8f9;
  }
  .newbankStatus-C{
    margin: 0 auto;
    width: 7.5rem;
  }
  .novice-header-tip{
    text-align: center;
    font-size: .24rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(240,243,254,1);
    opacity:0.8;
  }
  .novice-header-tip2{
    width:2.8rem;
    height:.48rem;
    margin: .3rem auto 0;
    background:#3557c4;
    line-height: .48rem;
    color: #ffffff;
    font-size: .24rem;
    text-align: center;
    border-radius: .24rem;
    -webkit-border-radius: .24rem;
    -moz-border-radius: .24rem; 
    position: relative; 
  }
  .novice-header-tip2 .novice-header-tip2Accrow{
    width:.1rem;
    height:.18rem;
    background: url(../../assets/images/phlc-newbankStatus2.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: .15rem;
    right: .27rem;
  }
  .phlc-login-back{
    display: block;
    position: absolute;
    left: .09rem;
    top: .7rem;
    width: .8rem;
    height: .8rem;
  }
  .novice-header-tip3{
    width: 7.5rem;
    height: .2rem;
    background: #f8f8f9;
  }
  .phlc-login-back img{
    display: block;
    width: .18rem;
    height: .34rem;
    margin: .23rem 0 0 .31rem;
  }
  .newbankStatus-C{
    
  }
  .realName{
    width: 7.5rem;
    height: 1.56rem;
    border: .02rem solid #f5f5f5;
    padding: 0 .4rem;
    background: #ffffff;
    box-sizing: border-box;
    position: relative;
  }
  .realNameImg{
    display: block;
    width:.64rem;
    height:.52rem;
    margin-top: .52rem;
  }
  .realNameImg img{
    width:100%;
    height:100%;
  }
  .realNametip1{
    font-size: .3rem;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0.34rem;
  }
  .realNametip2{
    width: 100%;
    font-size: .24rem;
    margin-top: 0.1rem;
    position: absolute;
    left: 0;
    bottom: 0.34rem;
  }
  .realNamemessage{
    margin-left: 0.24rem;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 1.04rem;
    right: 0;
    top: 0;
    height: 100%;
  }
  .realNameStatusTip{
    color: #E88A21;
    font-size: .26rem;
    padding-right: .36rem;
    background: url(../../assets/images/phlc-newbankStatus6.png) no-repeat 100% 96%;
    background-size: 0.12rem;
  }
  .realNameStatus{
    position: relative;
    padding-top: .6rem;
    
  }
  .realNametip11{
    display: inline-block;
    display: none;
    background:linear-gradient(135deg,rgba(255,109,44,1),rgba(245,58,58,1));
    background: -moz-linear-gradient(135deg,rgba(255,109,44,1),rgba(245,58,58,1));
    /* Safari 4-5, Chrome 1-9 */
    /* -webkit-gradient(,  [, ]?,  [, ]? [, ]*) */
    background: -webkit-gradient(135deg,rgba(255,109,44,1),rgba(245,58,58,1));
    /* Safari 5.1+, Chrome 10+ */
    background: -webkit-linear-gradient(135deg,rgba(255,109,44,1),rgba(245,58,58,1));
    /* Opera 11.10+ */
    background: -o-linear-gradient(135deg,rgba(255,109,44,1),rgba(245,58,58,1));
    font-size:.18rem;
    line-height: .28rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    border-radius:.02rem;
    -webkit-border-radius:.02rem;
    -moz-border-radius:.02rem;
    padding: 0rem .07rem;
    margin-top: .1rem;
    margin-left: .16rem;
  }
  .borderno{
    border: 0 !important;
  }
  .color666{
    color: #666666 !important;
  }
  /*新网开始*/
  .mask-box {
    display: none;
     z-index: 1005;
     left: 50%;
     margin: -2.8rem 0 0 -3rem;
     position: fixed;
     top: 40%;
     width: 6rem;
     height: 6.42rem;
     background: url(../../assets/images/phlc-mine-mask-bg.png) no-repeat;
     background-size: 100% 100%;
     border-radius: .26rem;
    -webkit-border-radius: .26rem;
    -moz-border-radius: .26rem;
   }
    #lightBack {
      display: none;
     position: absolute;
     top: 0%;
     left: 0%;
     width: 100%;
     background-color: black;
     z-index: 1001;
     -moz-opacity: 0.4;
     opacity: .40;
     filter: alpha(opacity=40);
   }
   .mask-box-top{
    width: 6rem;
    height: 1.76rem;
    padding: .76rem .6rem .56rem .6rem;
   }
   .mask-box-top .new-tip-top-left img{
    width: 2.8rem;
    height: .38rem;
   }
   .mask-box-top .new-tip-top-right img{
    width: 1.74rem;
    height: .48rem;
    margin-top:-.05rem;
   }
  .mask-box-top .new-tip-top-center{
    display: inline-block;
    width: .04rem;
    height: .36rem;
    background-color:#F0EBEB;
    margin-left: .12rem;
  }
  .mask-box .mask-cont{
    width: 6rem;
    height: 4.68rem;
    padding-top: .44rem;
  }
  .mask-box .mask-cont .mask-cont-tip{
    color: #555555;
    font-size: .28rem;
    text-align: center;
    line-height: .36rem;
  }
  .mask-box .mask-cont .mask-cont-img img{
    margin: .24rem auto 0;
    width: 4.24rem;
    height: .36rem;
  }
  .mask-box .mask-cont .mask-cont-b{
    font-size: .24rem;
    color: #555555;
    margin-top: .36rem;
    text-align: center;
  }
  .mask-now-up{
    width: 4.86rem;
    height: .9rem;
    color: #ffffff;
    font-size: .36rem;
    text-align: center;
    line-height: .9rem;
    border-radius: .46rem;
    -webkit-border-radius: .46rem;
    -moz-border-radius: .46rem;
    margin: 1.16rem auto 0;
  }
  .mask-cont .mask-cha{
    background: #FFFFFF;
    width: .68rem;
    height: .68rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    position: absolute;
    bottom: -2rem;
    left: 2.58rem;
    z-index: 1005;
  }
  .mask-cont .mask-cha img{
    display: block;
    width: .3rem;
    height: .32rem;
    margin: .16rem auto 0;
  }
  .layui-m-layer0 .layui-m-layersection .layui-m-layerchild{
    width: 6rem;
    /*height: 3.08rem;*/
  }
  .layui-m-layerchild .layui-m-layercont{
    /*height: 2.08rem;*/
    line-height: 1.04rem;
    text-align: left;
  }
  .layui-m-layerchild .layui-m-layercont .content{
    line-height: .46rem;
  }
  .layui-m-layer0 .layui-m-layersection .layui-m-layerchild{
    width: 6rem;
    /*height: 3.08rem;*/
  }
  .layui-m-layerchild .layui-m-layercont{
    /*height: 2.08rem;*/
    line-height: 1.04rem;
    text-align: left;
  }
  .layui-m-layerchild .layui-m-layercont .content{
    line-height: .46rem;
  }
}
</style>