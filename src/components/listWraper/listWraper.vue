<template>
  <div>
    <div v-show="showMenu" class="nav-wrapper" ref="navWrapper">
    	<ul class="nav-list" ref="navList">
    		<li 
    			class="list list-item" 
    			v-for="item in categoryList"
    			@click="getList(item.value)"
    			:class="{'active': currentCategoty === item.value}"
    		>
    		  {{item.name}}
    		</li>
    	</ul>
    </div>
    <div class="content-wrapper">
    	<ul class="content-list" v-if="list">
    		<li class="list-wrapper" v-for="item in list">
    			<div class="list-item" v-show="item.type==0">
    				<h2 class="title">{{item.title}}</h2>
    				<a href="#" class="big">
    					<img class="big-picture" :src="item.picture" alt="图片">
    				</a>
    				<span class="user">{{item.user}}</span>
    				<span class="time">{{item.time}}</span>
    			</div>
    			<div class="list-item" v-show="item.type==1">
    				<h2 class="title">{{item.title}}</h2>
    				<div class="small-list">
    					<a href="#" class="small" v-for="picture in item.picture">
	    					<img class="small-picture" :src="picture" alt="图片">
	    				</a>
    				</div>
    				<span class="user">{{item.user}}</span>
    				<span class="time">{{item.time}}</span>
    			</div>
    			<div class="list-item" v-show="item.type==2">
    				<h2 class="title">{{item.title}}</h2>
    				<a href="#" class="big">
    					<img class="big-picture" :src="item.picture" alt="图片">
    					<i :class="item.icon" class="iconfont"></i>
    				</a>
    				<span class="user">{{item.user}}</span>
    				<span class="time">{{item.time}}</span>
    			</div>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
var ERROR_OK=0
export default {
	data() {
		return {
			list:[],
			currentCategoty: '',
			categoryList: [],
			showMenu: false,
		}
	},
	created() {
		this.getCategoryList()
		this.bindScroll()
	},
	methods:{
		_initNavs() {
			let navList=60;
			let margin=4;
			let left=14
			let width=(navList+margin)*7-margin+left;
			this.$refs.navList.style.width=width+'px';
			this.$nextTick(()=>{
				if (!this.scroll) {
					this.scroll=new BScroll(this.$refs.navWrapper,{
						scrollX:true,
						eventPassthrough:'vertical',
					})
				}else{
					this.scroll.refresh();
				}
			});
		},
		bindScroll() {
			document.addEventListener('scroll', (e) => {
				var scrollTop = document.body.scrollTop
				this.showMenu = scrollTop>=210
			}, false)
		},
		getCategoryList(){
			this.$http.get('/api/category').then((response)=>{
				response=response.body;
				if (response.errno==ERROR_OK) {
					this.categoryList=response.data;
					this.getList(this.categoryList[0].value)
				};
			})
		},
		getList(category) {
			this.$http.get('/api/list', {
				params:{category}
			}).then((response)=>{
				response=response.body;
				if (response.errno==ERROR_OK) {
					this.list=response.data;
					this.currentCategoty=category
					this._initNavs();
				};
			})
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.nav-wrapper
	position: fixed
	top: 0
	background-color: #fff
	z-index: 100
	width:100%
	height:45px
	overflow:hidden
	white-space:nowrap
	border-bottom:1px solid #eee
	.nav-list
		font-size:0
		.list
			display:inline-block
			width:60px
			border-sizing:border-box
			margin-right:4px
			height:43px
			line-height:43px
			text-align:center
			&:first-child
				margin-left:14px
			&:last-child
				margin-right:0
		.list-item
			display:inline-block
			width:60px
			font-size:18px
			color:#333
			&.active
				color:#38f
				border-bottom:2px solid #38f
.content-wrapper
	border-top:1px solid #eee
	.content-list
		margin:0 12px
		.list-wrapper
			width:100%
			border-bottom:1px solid #eee
			.list-item
				font-size:0
				.title
					font-size:18px
					line-height:26px
					color:#333
					margin:8px 0 4px
				.big
					display:block
					position:relative
					.big-picture
						vertical:top
						width:100%
						height:auto
					.icon-16
						display:inline-block
						width:48px
						height:48px
						font-size:48px
						position:absolute
						top:50%
						left:50%
						margin:-24px 0 0 -24px
						color:#fff
				.user,.time
					display:inline-block
					height:38px
					line-height:38px
					font-size:13px
					color:#999
				.user
					margin-right:8px
				.small-list
					.small
						margin-right:1px
						&:last-child
							margin-right:0
						.small-picture
							vertical-align:top
							width:33%
							height:auto
							display:inline-block
							
</style>
