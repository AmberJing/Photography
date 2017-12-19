/*common.js*/
var PGHTOGRAPHY = (function(){
		// 加载Header
		var _loadHeader = function(){
			$.ajax({
		    	url:"index.html", 
		        type: "GET", //静态页用get方法，否则服务器会抛出405错误
		        async: !1,
		        dataType :"html", 
		        async: false,
		        success: function(data){    
		        	var start = data.indexOf('!-- header导航 start --') - 2;
		        	var stop = data.indexOf('!-- header导航 End --') + 18;
		            var result = $.trim(data.substring(start,stop));
		            $("#x-div1").html(result);
		        }
		    });
		}
		// 加载Footer
		var _loadFooter = function(){
			$.ajax({
		    	url:"index.html", 
		        type: "GET", //静态页用get方法，否则服务器会抛出405错误
		        dataType :"html", 
		        async: false,
		        success: function(data){
		        	var start = data.indexOf('!-- footer导航 start --') - 2;
		        	var stop = data.indexOf('!-- footer导航 End --') + 18;
		            var result = $.trim(data.substring(start,stop));
		            $("#x-div2").html(result);
		        }
		    });
		}
		var _init = function(){
			_loadHeader();
			_loadFooter();
		}
		return{
        	init: _init,
    	};
})()

$(function () {	

	//页面初始化加载头尾
	PGHTOGRAPHY.init();

	/* 菜单切换 */
	var urlstr = location.href;

  	var urlstatus=false;

	$(".menu-desktop  a").each(function () {
		//console.log( (urlstr + '/').indexOf($(this).attr('href')) );
	    if ( (urlstr + '/').indexOf($(this).attr('href')) > -1 && $(this).attr('href')!='' ) {

	    	$(this).parent('li').addClass('active'); 
	    	urlstatus = true;

	    } else {

	      $(this).parent('li').removeClass('active');

	    }

	});

  	if (!urlstatus) {$(".menu-desktop a").eq(0).addClass('active'); }

	/* mobile toggle开关菜单*/
	var clickCount = 0;
	$('.menu-mobile .menu-icon').click(function(event) {
		clickCount ++;
		if(clickCount % 2 == 0){
			$('.menu-mobile .menu-box').slideUp('slow');
			$('.mask-section').css({
				"background-color":"rgba(0,0,0,0.8)"
			}).slideUp('slow')

		}else{
			$('.menu-mobile .menu-box').slideDown('slow');
			$('.mask-section').css({
				"background-color":"rgba(0,0,0,0.8)"
			}).slideDown('slow');
		}
		
	});
	//搜索
	$('.search-wrap').click(function(event) {
		$('.search-container').show();
		$('.mask-section').show();
	});
	// 取消搜索
	$('.search-cancel-btn').click(function(event) {
		$('.search-container').hide();
		$('.mask-section').hide();
	});

	// 滚动条事件
	$(window).scroll(function(){

		// 获得滚动条卷去的大小
		var sTop = $(window).scrollTop();

		// 如果滚动条超过200像素，显示回到顶部的按钮
		if (sTop > 200) {
			/*
				注意：做这种动画效果时，确保此元素没有应用css3的transition过渡，否则会冲突
			*/
			$('.sidebar-item-top').slideDown(1000);			
		} else {
			$('.sidebar-item-top').slideUp(1000);
		}
	});

	/*回到顶部*/
	$('.sidebar-item-top').click(function(event) {
		$('html,body').animate({scrollTop:0},1000);
	});

})



