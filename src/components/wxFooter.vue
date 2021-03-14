<template>
  <div id="wx-footer">
		<router-link to="/home" tag="div" class="home">
			<!--:to="{ path: '/shop/merchants', query:{ id: $route.query.id} }-->
			<p>首页</p>
		</router-link>
		<router-link to="/project" tag="div" class="project">
			<p>项目</p>
		</router-link>
		<router-link to="/discover" tag="div" class="discover">
			<p>发现</p>
		</router-link>
		<router-link to="/mine" tag="div" class="mine">
			<p>我的</p>
		</router-link>
  </div>
</template>

<script>
export default {
  name: 'wxFooter'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#wx-footer{
	width: 7.5rem;
	display: flex;
	font-size: 0.2rem;
	height: 1rem;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0;
	background: #fff;
	color: #999;
	border-top: .01rem solid #dddddd;
	>div{
		flex-grow: 1;
		padding: 0.56rem 0 0.1rem 0;
		text-align: center;
		background-repeat:no-repeat ;
		background-size: 0.4rem;
		background-position: 50% 0.16rem;
		&.router-active{
			color: #e6382c;
		}
		&.home{
			background-image: url(../assets/images/phlc-home-hui.png);
		}
		&.project{
			background-image: url(../assets/images/phlc-project-hui.png);
		}
		&.discover{
			background-image: url(../assets/images/phlc-discover-hui.png);
		}
		&.mine{
			background-image: url(../assets/images/phlc-mine-hui.png);
		}
		&.home.router-active{
			background-image: url(../assets/images/phlc-home-hong.png);
		}
		&.project.router-active{
			background-image: url(../assets/images/phlc-project-hong.png);
		}
		&.discover.router-active{
			background-image: url(../assets/images/phlc-discover-hong.png);
		}
		&.mine.router-active{
			background-image: url(../assets/images/phlc-mine-hong.png);
		}
	}
}
</style>
