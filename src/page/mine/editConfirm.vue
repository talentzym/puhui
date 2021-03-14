<template>
 <div id="editConfirmView">
   <wxheader :title="'手机'"></wxheader>
   <div class="editConfirm-content">
      <div class="box">
        <h3 class="phlc-yxfont">{{this.mdphone}}</h3>
        <p>您已绑定的手机号</p>
      </div>
      <div class="submit-button phlc-main-button" @click="goToChangePhone()">更改</div>
    </div>
 </div>
</template>

<script>
import wxheader from '@/components/header'
export default {
  data () {
    return {
      phone: this.$route.query.mobile,
      mdphone: this.$route.query.mdmobile
    }
  },
  methods: {
    goToChangePhone () {
      this.$router.push({
        path: 'modifyPhoneNumber',
        query: {
          mobile: this.phone,
          mdphone: this.mdphone
        }
      })
    }
  },
  components: {
    wxheader
  }
}
</script>

<style lang="less">
#editConfirmView{
  .editConfirm-content{
    position: absolute;
    top: 0.88rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 0.5rem 0.4rem;
    text-align: center;
    h3{
      font-size: 0.40rem;
    }
    p{
      font-size: 0.24rem;
      color: #444;
      padding-top: 0.1rem;
    }
    .phlc-main-button{
      margin-top: 1.5rem
    }
  }
}
</style>
