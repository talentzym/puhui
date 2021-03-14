<template>
	<div id="index-view">
		<router-view></router-view>
		<wxFooter></wxFooter>
	</div>
</template>

<script>
import wxFooter from '@/components/wxFooter'
export default {
  name: 'index',
  components: {
    wxFooter
  }
}
</script>

<style>
</style>
