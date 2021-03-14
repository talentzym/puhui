<template>
  <div id="yeepay-view">
    <form id="yeepay" name="yeepay" action="" method="post" target="_self">
      <input type="hidden" id="serviceName" name="serviceName" value=""/>
      <input type="hidden" id="service" name="service" value=""/>
      <input type="hidden" id="platformNo" name="platformNo" value=""/>
      <input type="hidden" id="reqData" name="reqData" value=""/>
      <input type="hidden" id="keySerial" name="keySerial" value=""/>
      <input type="hidden" id="sign" name="sign" value=""/>
      <input type="hidden" id="requestNo" name="requestNo" value=""/>
    </form>
    <div class="loading">
      <div class="loadbg"></div>
        <div class="loadcon">
          <p><img src="../../assets/images/loading.gif" width="20" height="20" />页面加载中,请等待...</p>
        </div>
    </div>
  </div>
</template>

<script>
export default{
  mounted () {
    var cgtData = this.$route.query.data.cgtData
    var yeepayForm = document.forms['yeepay']
    yeepayForm.action = cgtData.action
    yeepayForm.serviceName.value = cgtData.serviceName
    yeepayForm.service.value = cgtData.service
    yeepayForm.platformNo.value = cgtData.platformNo
    yeepayForm.reqData.value = cgtData.reqData
    yeepayForm.keySerial.value = cgtData.keySerial
    yeepayForm.requestNo.value = cgtData.requestNo
    yeepayForm.sign.value = cgtData.sign
    document.forms['yeepay'].submit()
  }
}
</script>

<style>
.loading{width:100%; height:100%;}
.loadbg{position:fixed; left:0; top:0; background:#000; opacity:0.5; filter:alpha(opacity=50); width:100%; height:100%;}
.loadcon{width:90%; height:60px; background:#fff; -webkit-border-radius:6px; -moz-border-radius:6px; border-radius:6px; position:absolute;top:50%;left:5%; margin-top:-30px; font-size:1em;  z-index:23;}
.loadcon p{line-height:24px; padding-top:15px; padding-left:20px;font-size: 16px;}
.loadcon img{vertical-align:middle; padding-right:5px;display: inline-block;}
</style>
