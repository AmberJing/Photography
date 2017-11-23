$(document).ready(function() {


	// 获得导航条对象
	var navObj = $('#floatNav');

	// 导航条高度
	var navHeight = navObj.outerHeight();
	// 导航条相对于网页原点位置
	var navPos = navObj.offset().top;

	/* 滑下 */
	$('#scrollDown').click(function () {
		$('html, body').animate({scrollTop: $('.section.aboutus').offset().top}, 800);
	});

	/* 
		滚动条事件
	*/
	$(window).scroll(function(){

		// 滚动条卷曲的大小
		var sTop = $(window).scrollTop();

		/* 导航条吸附顶部效果 */
		if( sTop >= navPos ){
			if(!navObj.hasClass('fixed')){//此if判断会让browser不反复触发程序，造成闪烁效果，提高效率
				navObj.addClass('fixed');
				// banner下方空出原始导航的高度，保证导航fixed时下方元素不会上移，造成偏差
				$('.key-visual').css({"margin-bottom":"67px"});
			}
					
		}else{
			if(navObj.hasClass('fixed')){
				navObj.removeClass('fixed');
				$('.key-visual').css({"margin-bottom":"0px"});
			}
			
		}

		/* 导航条高亮函数 */
		function highLight(target){
			$('.float-nav li').removeClass('on');
			$(target).addClass('on');
		}

		/*滚动条监听导航高亮*/
		// 获得对象
		var intro = $("#sec-aboutus"),
			usage = $("#sec-whyus"),
			product = $("#sec-product");
			ourteam = $("#sec-ourteam");
			partner = $("#sec-partner");

		// 获得区块坐标范围
		var introPos = {
			start: intro.offset().top - navHeight,
			end: intro.offset().top + intro.outerHeight() - navHeight
		},
		usagePos = {
			start: usage.offset().top - navHeight,
			end: usage.offset().top + usage.outerHeight() - navHeight
		},
		product = {
			start: product.offset().top - navHeight,
			end: product.offset().top + product.outerHeight() - navHeight
		},
		ourteam = {
			start: ourteam.offset().top - navHeight,
			end: ourteam.offset().top + ourteam.outerHeight() - navHeight
		},
		partner = {
			start: partner.offset().top - navHeight,
			end: partner.offset().top + partner.outerHeight() - navHeight
		};

		// 滚动到相应位置
		if( sTop >= introPos.start && sTop < introPos.end ){
			highLight('.sec-aboutus');		
		}else if( sTop >= usagePos.start && sTop < usagePos.end ){
			highLight('.sec-whyus');
		}else if( sTop >= product.start && sTop < product.end ){
			highLight('.sec-product');
		}else if( sTop >= ourteam.start && sTop < ourteam.end ){
			highLight('.sec-ourteam');
		}else if( sTop >= partner.start && sTop < partner.end ){
			highLight('.sec-partner');
		}else{
			$('.float-nav li').removeClass('on');
		}
	})


	/*
		导航链接点击滑动到锚点
	*/
	$('.float-nav a').click(function(){

		// 获得对应区域相对于网页原点的距离
		var offsetTop = $(this.hash).offset().top;
		// 实际滚动的距离(空出导航条高度)
		var  realTop = offsetTop - navHeight + 7;

		$("html,body").animate({scrollTop:realTop},800);

		return false;
	})

});	