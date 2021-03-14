<template>
  <div id="share-window" v-on:click="close()">
    <img src="../assets/images/rage.png"/>
    <p>请点击右上角将它发</p>
    <p>送给指定的朋友或者</p>
    <p>朋友圈</p>
  </div>
</template>

<script>
import $ from 'jquery'
export default{
  data () {
    return {
      shareFlag: false
    }
  },
  methods: {
    close () {
      $('#share-window').hide()
    }
  }
}
</script>

<style lang="less">
#share-window{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: .56rem;
  text-align: center;
  z-index: 1000;
  display: none;
  >img{
    display: inline-block;
    width: 2.3rem;
    margin-left: 5.2rem;
  }
}
</style>
