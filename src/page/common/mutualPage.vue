<template>
<div id="mutual-view">
  <wxheader :title="this.$route.query.title ? this.$route.query.title : ''"></wxheader>
  <router-view></router-view>
</div>
</template>

<script>
import wxheader from '@/components/header'
export default{
  data () {
    return {

    }
  },
  components: {
    wxheader
  },
  mounted () {}
}
</script>

<style>
  iframe{
    position: absolute;
    top: 0.88rem;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
