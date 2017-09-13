<template>
  <div id="header" v-show="showHeader">
    <div class="header-message clearfix">
      <div class="left-weather">
        <i class="iconfont icon-xiayu"></i>
        <span class="temperature">29°</span>
        <div class="weather-status">
        	<p class="location">深圳</p>
        	<p class="date">19&nbsp;优</p>
        	<i class="iconfont icon-jiantouxia"></i>
        </div>
      </div>
      <div class="right-login">
        <i class="iconfont icon-unie64d"></i>
      </div>
    </div>
    <div class="header-logo">
    	<div class="logo">
    		<img src="https://m.baidu.com/static/index/plus/plus_logo.png" alt="百度一下你就知道">
    	</div>
    	<div class="search">
    	  <div class="search-wrap">
    	  	<input type="text" class="text">
    	  	<div class="voice-wrap">
    	  		<i class="iconfont icon-voiceicon"></i>
    	  		<i class="iconfont icon-xiala"></i>
    	  	</div>
    	  </div>	
    		<button type="submit" class="submit">百度一下</button>
    	</div>
    </div>
    <div class="header-nav" ref="headerNav">
    	<ul class="nav-list" ref="navList">
    		<li class="list-item" ref="listItem" v-for="(item,index) in header">
    			<i class="iconfont" :class="header[index].logo"></i>
    			<p class="desrc">{{header[index].name}}</p>
    		</li>
    	</ul>
    	<div class="dot-list">
    		<span class="dot" :class="{'active':change}">.</span>
    	  <span class="dot" :class="{'active':!change}">.</span>
    	</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
var ERROR_OK=0
export default {
	data() {
		return {
			header:{},
      showHeader:true,
			change:true
		}
	},
	created() {
		this.$http.get('/api/header').then((response)=>{
			response=response.body;
			if (response.errno==ERROR_OK) {
				this.header=response.data;
				this._initNavs();
			};
		})
	},
	methods:{
		_initNavs() {
			let navList=54;
			let padding=3;
			let width=(navList+padding)*this.header.length-padding;
			this.$refs.navList.style.width=width+'px';
			this.$nextTick(()=>{
				if (!this.scroll) {
					this.scroll=new BScroll(this.$refs.headerNav,{
						scrollX:true,
						eventPassthrough:'vertical',
					})
				}else{
					this.scroll.refresh();
				}
			});
		},
    bindScroll() {
      document.addEventListener('scroll',(e)=>{
        var scrollTop=document.body.scrollTop;
        this.showHeader=scrollTop<210
      })
    }
	}  
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#header
  width:100%
  height:256px
  background-color:#f1f1f1
  padding:0 14px
  box-sizing:border-box
  .header-message
    width:100%
    height:35px
    margin-bottom:9px
    .left-weather
    	float:left
    	font-size:0px
    	.icon-xiayu
    		font-size:28px
    		color:#b7babe 
    	.temperature
    		font-size:28px
    		color:#999
    		padding-left:4px
    	.weather-status
    		display:inline-block
    		margin:4px 0 0 4px
    		height:35px
    		.location,.date,.icon-jiantouxia
    			font-size:10px
    			color:#999
    			height:12px
    			line-height:12px
    		.date
    			display:inline-block
    			margin-right:4px
    .right-login
      float:right
      line-height:35px
    	.icon-unie64d
    		font-size:23px
  .header-logo
  	.logo
  		height:57px
  		padding-bottom:17px
  		position:relative
  		img
        position:absolute
        left:50%
        width:183px
        height:57px
        max-width:217px
        margin-left:-92px
  	.search
      font-size:0
      display:flex
  		.search-wrap
        position:relative
        height:44px
        flex:1
        box-sizing:border-box
        border:1px solid #d2d2d2
        background-color:#fff
        vertical-align:top
  			.text
          height:42px
          width:100%
          box-sizing:border-box
          padding:7px 40px 7px 6px
          color:#999
          font-size:16px
          overflow:hidden
          white-space:nowrap
  			.voice-wrap
  				position:absolute
  				right:8px
  				top:12px
  				color:#999
  				.icon-voiceicon
  					font-size:18px
  				.icon-xiala
  					font-size:10px
  					margin-left:2px
  		.submit
        width:84px
        height:44px
        line-height:44px
        flex:0 0 84px
        background-color:#38f
        color:#fff
        text-align:center
        font-size:14px
        border:none
  .header-nav
  	padding-top:19px
  	width:100%
  	overflow:hidden
  	white-space:nowrap
  	.nav-list
  		font-size:0
  		.list-item
        display:inline-block
        width:54px
        text-align:center
        height:43px
        padding-right:3px
  			&:last-child
  				padding-right:0px
  			.iconfont
  				font-size:24px
  				color:#999
  			.desrc
  				font-size:14px
  				color:#999
  				margin-top:6px
  	.dot-list
  		font-size:0
  		text-align:center
  		.dot
  			display:inline-block
  			font-size:24px
  			color:#e0e0e0
  			&.active
  				color:#c0c0c0  	 	
</style>

