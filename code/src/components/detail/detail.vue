<template>
  <div class="item" ref="itemWrap">
    <div class="wrap">
    	<div class="return">
	    	<i class="iconfont icon-fanhui" @click="goBack()"></i>
	    	<i class="iconfont icon-dian" @click="show()"></i>
	    </div>
	    <div class="content-wrap" ref="contentWrap">
	      <div class="kind" v-if="detail.type==0||detail.type==1">
	        <div class="passage-wrap">
	        	<h1 class="title">{{detail.title}}</h1>
		      	<div class="author">
		      		<span class="user">{{detail.user}}</span>
		      		<span class="time">{{detail.time}}</span>
		      	</div>
		      	<div class="passage-pic">
		      		<p class="passage" v-if="detail.first">{{detail.first}}</p>
		      		<img :src="detail.p1" ref="P1" alt="图片" class="pic">
		      		<p class="passage" v-if="detail.second">{{detail.second}}</p>
		      		<img :src="detail.p2" ref="P2" alt="图片" class="pic">
		      		<p class="passage" v-if="detail.third">{{detail.third}}</p>
		      		<img src.lazy="detail.p3" ref="P3" alt="图片" class="pic">
		      		<p class="passage" v-if="detail.fourth">{{detail.fourth}}</p>
		      		<img :src="detail.p4" ref="P4" alt="图片" class="pic">
		      	</div>
	        </div>
	      	<div class="relative">
	      		<h2 class="top">相关推荐</h2>
	      		<ul class="bottom">
	      			<li class="recommend" v-for="other in detail.relative">{{other}}</li>
	      		</ul>
	      	</div>
	      </div>
	      <div class="kind" v-if="detail.type==2">
	        <div class="video-wrapper">
	          <div class="video">
	          	<img :xsrc="detail.picture" ref="bigPicture" alt="图片">
	        	  <i class="iconfont icon-16"></i>
	        	  <span class="minute">{{detail.minute}}</span>
	          </div>
	        	<p class="procase">{{detail.procase}}</p>
	        	<h2 class="title">{{detail.title}}</h2>
	        	<span class="number">{{detail.number}}</span>
	        </div>
	        <ul class="relative">
	        	<li class="list" v-for="relative in detail.relative">
	        		<div class="left">
	        			<img :src="relative.img" alt="图片">
	        			<span class="length">05:10</span>
	        			<i class="iconfont icon-bofang"></i>
	        		</div>
	        		<div class="right">
	        			<p class="title">{{relative.title}}</p>
	        			<span class="number">{{relative.number}}</span>
	        		</div>
	        	</li>
	        </ul>
	      </div>    	
	    </div>
    </div>
    <div class="suggest">
    	产品建议及投诉请联系：shoujibaidu@baidu.com
    </div>
    <div class="share" v-show="isShow" @click="hide()">
      <transition-group name="fade" tag="div" duration="1000">
      	<div class="share-list" key="item">
	    		<div class="piclist" v-for="share in shares">
	    			<img :src="share.img" alt="图片" class="pic">
	    			<p class="gap">{{share.name}}</p>
	    		</div>
	    	</div>         	
    	  <div class="cancle" key="item">取消</div>
    	 </transition-group>
    </div>
    <div class="screen" v-show="isShow" @click="hide()"></div>    
  </div>
</template>

<script>
import data from '../../../data.json'
var ERROR_OK=0
export default {
	data() {
		return {
			detail: {},
			isShow:false,
			shares:{}
		}
	},
	created() {
		const id = this.$route.params.id
		const category = this.$route.query.type
		const list = data.list[category]
		list.forEach(item => {
			if(item.id == id) {
				this.detail = item
			}
		})
		this.$nextTick(() => {
			this._delayPicture()
		})
	},
	mounted() {
		this.bindScroll()
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
		show() {
			this.isShow=true;
			this.shares = data.shares
			this.$refs.itemWrap.style.overflow = 'hidden';
		},
		hide() {
			this.isShow=false;
			this.$refs.itemWrap.style.overflow = 'auto';
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
			let bigPicture=this.$refs.bigPicture;
			let P1=this.$refs.P1;
			let P2=this.$refs.P2;
			let P3=this.$refs.P3;
			let P4=this.$refs.P4;
			var arr=[];
			arr.push(P1,P2,P3,P4,bigPicture)
			arr = arr.filter((img) => !!img);
			for (var i = 0; i < arr.length; i++) {
				let bp=arr[i];
				if(document.documentElement.clientHeight+scrollTop>=this._offsetTop(bp)) {
					bp.setAttribute('src',bp.getAttribute('xsrc'))
					bp.setAttribute('height','auto')
				}
			};	
		},
		bindScroll() {
			window.addEventListener('scroll', (e) => {
			  this._delayPicture()			
			}, false);
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.item
	background:#fff
	.wrap
		min-height:100%
		.return
			position:fixed
			top:0
			left:0
			width:100%
			height:44px
			line-height:44px
			padding:0 16px
			box-sizing:border-box
			background:#f8f8f8
			border-bottom:1px solid #d6d6d6
			z-index:20
			.icon-fanhui
				float:left
				font-size:20px
				color:#333
			.icon-dian	
				float:right		
				font-size:20px
				color:#333
		.content-wrap
			padding-bottom:64px
			.passage-wrap
				padding:10px 14px 16px
				box-sizing:border-box
				background:#f5f5f5
				padding-top: 60px;
				.title
					font-size:22px
					font-weight:bold
					line-height:1.3
					color:#333
				.author
					font-size:0
					margin-top:9px
					.user,.time
						font-size:13px
						color:#999
						margin-right:16px
				.passage-pic
					.passage
						margin:20px 0 0
						font-size:20px
						color:#333
						line-height:1.5
					.pic
						display:block
						width:100%
						height:auto
						min-height:200px
						margin-top:20px
			.relative
				background:#fff
				padding:0 16px
				.top
					position:relative
					height:44px
					font-size:16px
					line-height:44px
					color:#999
					border-bottom:1px solid #e6e6e6
					&:after
						position:absolute
						content:""
						height:1px
						width:64px
						background:#38f
						left:0
						top:100%
				.bottom
					.recommend
						height:47px
						line-height:47px
						font-size:18px
						color:#333
						overflow:hidden
						white-space:nowrap
						text-overflow:ellipsis
						border-bottom:1px solid #f0f0f0
			.video-wrapper
				background:#f5f5f5
				padding:44px 0 10px 0
				.video
					font-size:0
					position:relative
					img
						width:100%
						height:auto
					.icon-16
						font-size:64px
						position:absolute
						top:50%
						left:50%
						margin:-32px 0 0 -32px
						color:#fff
					.minute
						font-size:16px
						position:absolute
						right:5%
						bottom:5%
						color:#fff
				.procase
					width:100%
					height:36px
					font-size:14px
					color:#fff
					background:#3c76ff
					text-align:center
					line-height:36px
				.title
					width:100%
					padding:12px 15px 0px
					box-sizing:border-box
					font-size:16px
					color:#333
					line-height:1.6
					font-weight:bold
				.number
					display:inline-block
					font-size:12px
					color:#999
					margin-left:13px
			.relative
				margin-top:10px
				.list
					display:flex
					width:100%
					box-sizing:border-box
					padding:6px 0 10px
					border-bottom:1px solid #eaeaea
					.left
						position:relative
						flex:0 0 96px
						width:96px
						img
							width:100%
							height:82px
						.length
							display:inline-block
							width:60px
							height:20px
							line-height:20px
							box-sizing:border-box
							background:rgba(0,0,0,0.4)
							border-radius:10px
							position:absolute
							padding-left:20px
							right:6%
							bottom:15%
							font-size:12px
							color:#fff
						.icon-bofang
							font-size:12px
							color:#fff
							position:absolute
							right:49%
							bottom:21%
					.right
						flex:1
						margin-left:14px
						.title
							font-size:16px
							line-height:1.4
							color:#333
						.number
							display:inline-block
							font-size:12px
							color:#999
							margin-top:8px
	.suggest
		position:relative
		margin:-64px auto 0 auto
		height:64px
		line-height:64px
		text-align:center
		background:#eee
		clear:both
		font-size:12px
		color:#999
	.share
		position:fixed
		left:0
		bottom:0
		width:100%
		z-index:2000
		.fade-enter-active,.fade-leave-active
			transition:all 0.3s linear
		.fade-enter,.fade-leave-active
			transition:all 0.3s linear
		.share-list
			display:flex
			background:#f1f1f1
			padding:10px
			box-sizing:border-box
			border-bottom:1px solid #dfdfdf
		.piclist
			flex:1
			display:inline-block
			text-align:center
			.gap
				font-size:10px
				color:#666
				margin-top:8px
				line-height:1
			.pic
				display:inline-block
				max-width:60px
				background:#fff
				border-radius:50%
				@media only screen and (max-width:320px)
					max-width:40px
		.cancle
			width:100%
			height:48px
			line-height:48px
			background:#f8f8f8
			font-size:16px
			text-align:center
			color:#333
	.screen
		position:fixed
		top:0
		left:0
		opacity:1
		width:100%
		height:100%
		background:rgba(0,0,0,0.5)
		z-index:1000
</style>
