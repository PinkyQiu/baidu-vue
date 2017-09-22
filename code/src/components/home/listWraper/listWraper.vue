<template>
  <div>
	  <div class="main-wrapper">
	  	<div v-show="showMenu" class="nav-wrapper" ref="navWrapper">
	    	<ul class="nav-list" ref="navList" v-if="categoryList">
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
		    		<router-link :to="{ 
		    			path: `detail/${item.id}`, 
		    			query: {type: currentCategoty}, 
		    			params: { id: item.id }
		    		}">
		    			<div class="list-item" v-if="item.type==0">
		    				<h2 class="title">{{item.title}}</h2>
		    				<a href="#" class="big">
		    					<img class="big-picture" ref="bigPicture"  src="./loading.gif" :xsrc="item.picture" alt="图片">
		    				</a>
		    				<span class="user">{{item.user}}</span>
		    				<span class="time">{{item.time}}</span>
		    			</div>
		    			<div class="list-item" v-if="item.type==1">
		    				<h2 class="title">{{item.title}}</h2>
		    				<div class="small-list">
		    					<a href="#" class="small" v-for="picture in item.picture">
			    					<img class="small-picture" ref="bigPicture" src="./loading.gif" :xsrc="picture" alt="图片">
			    				</a>
		    				</div>
		    				<span class="user">{{item.user}}</span>
		    				<span class="time">{{item.time}}</span>
		    			</div>
		    			<div class="list-item" v-if="item.type==2">
		    				<h2 class="title">{{item.title}}</h2>
		    				<a href="#" class="big">
		    					<img class="big-picture" ref="bigPicture" src="./loading.gif" :xsrc="item.picture" alt="图片">
		    					<i :class="item.icon" class="iconfont"></i>
		    				</a>
		    				<span class="user">{{item.user}}</span>
		    				<span class="time">{{item.time}}</span>
		    			</div>
		    		</router-link>
	    		</li>
	    	</ul>
	    </div>
	  </div>    
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import data from '../../../../data.json'
var ERROR_OK=0
export default {
	data() {
		return {
			list:[],
			init: false,
			currentCategoty: '',
			categoryList: [],
			showMenu: false
		}
	},
	created() {
		this.getCategoryList()
		this.bindScroll();
	},
	watch:{
		'showMenu'() {
      this._initNavs();
		}
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
		_offsetTop(element) {
		  var top = element.offsetTop;
		  var parent = element.offsetParent;
		  while (parent != null) {
		    top += parent.offsetTop;
		    parent = parent.offsetParent;
		  }
		  return top;
		},
		_delayPicture() {
			var scrollTop = document.body.scrollTop;
			var bigPicture=this.$refs.bigPicture;
			for (var i = 0; i < bigPicture.length; i++) {
				let bp=bigPicture[i];
				if(document.documentElement.clientHeight+scrollTop>=this._offsetTop(bp)) {
					bp.setAttribute('src',bp.getAttribute('xsrc'))
				}
			};	
		},
		bindScroll() {
			document.addEventListener('scroll', (e) => {
				var scrollTop = document.body.scrollTop
				if(scrollTop >= 210) {
					!this.init && this._initNavs();
					this.init = true
				}
				this.showMenu = scrollTop>=210
				this._delayPicture()
			}, false)
		},
		getCategoryList(){
			this.categoryList=data.category;
			this.getList(this.categoryList[0].value)
		},
		getList(category) {
			this.list=data.list[category];
			this.currentCategoty=category
			this.$nextTick(() => {
				this._delayPicture()
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
