$(function(){
	var temp = 0;  //当前插入元素的父元素的下标
	var boxIndex = 0;  //box对象数组下标

	var flag = false;	//当前是否有正在运行的定时器

	// 加载更多
	$('#loading .btn').click(function(){

		// 没有正在执行的定时器
		if(!flag){

			$('#loading .btn .img').css('display','block');

			flag = true;

			setTimeout(loadMore,2000);	//模拟网络延迟效果
		}
	});

	function loadMore(){
			var times = 12; //请求加载的数量
		
			// 要加载的内容数量
			for(var i = 0; i < times; i ++){

				if(boxIndex >= fluid.length){
					$('#loading .btn').text('没有内容了').css('background-color','rgba(0,0,0,0.4)');
					$('#loading .btn').unbind('click');
					return;
				}

				if(temp >= 4)
					temp = temp%4;

				// 动态生成一个新的对象，并添加到指定位置 
				var boxObj = '<div class="box"><a class="item_img"><img src="'+ fluid[boxIndex].item_img +'"  width="285px" alt=""><div class="dialog"><h2>'+ fluid[boxIndex].dialog_txt +'</h2><span>'+ fluid[boxIndex].dialog_span +'</span></div></a><div class="item_author"><img class="author_img" src="'+ fluid[boxIndex].head +'" width="50px" alt=""><h4>'+ fluid[boxIndex].name +'</h4><span>'+ fluid[boxIndex].state +'</span></div><div class="item_state" id="item_state" style="display:none;"><span>'+ fluid[boxIndex].author_state +'</span></div></div>';
				$('#show .show_icon').eq(temp).append(boxObj);
				boxIndex ++; //box对象数组下标
				temp ++;	//当前插入元素的父元素的下标
				$('#loading .btn .img').css('display','none');
			}
			flag = false;
		}


	loadMore(); //放在这里是为了解决函数的预处理问题

	// 滚动监听事件
	$(window).scroll(function(){
		if( $(window).scrollTop() + $(window).height() >= $(document).height()){
			$('#loading .btn').click();
		}
			
	});


	// 点击图片大图显示
	$('.show_icon').on('click','.box .item_img',function(){
		$('.imgDialog').css('display','block');
		$('.imgDialog .bg').attr('src',$(this).find('img').attr('src'));
		$('.imgDialog .img').attr('src',$(this).find('img').attr('src'));
	});

	// 点击模态层取消显示
	$('body').on('click','.imgDialog',function(){
		$(this).css('display','none');
	});
	
	
});