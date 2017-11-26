// function loadData(){
// 	$.ajax({
// 		url:'js/author-data.js',
// 		type:'post',
// 		success:function (data){

// 			var dataAuthor = eval(data); //eval将字符串转成对象数组
// 			var pageCount = dataAuthor.length;
// 			console.log(pageCount);

// 			var pager = new PageList("pagination",{
// 		        curPage:1,
// 		        totalCount:pageCount,
// 		        pageRows:12,
// 		        callback:callbackFuc
// 		    });
// 		    pager.init();
 
// 		}
// 	})
// }
$(function(){
	// loadData();
	var temp = 0;  //当前插入元素的父元素的下标
	var boxIndex = 0;  //box对象数组下标

	var flag = false;	//当前是否有正在运行的定时器

	// 加载更多
	$('#pagination a').click(function(){

		var pageNo = parseInt($(this).text());

		// 没有正在执行的定时器
		if(!flag){

			flag = true;

			setTimeout(loadMore,2000);	//模拟网络延迟效果
		}
	});

	function loadMore(){
			var times = 12; //请求加载的数量
			// 要加载的内容数量
			for(var i = 0; i < times; i ++){

				if(boxIndex >= fluidAuthor.length){
					$('#loading .loading-btn').text('没有内容了').css('background-color','rgba(0,0,0,0.4)');
					$('#loading .loading-btn').unbind('click');
					return;
				}
				if(temp >= 4)
					temp = temp%4;

				// 动态生成一个新的对象，并添加到指定位置 
				var boxObj = '<div class="box">'
							+'  <a class="author-img">'
							+'	  <img src="'+ fluidAuthor[boxIndex].author_img +'" alt="">'
							+'	</a>'
							+'	<a class="author-name">'+ fluidAuthor[boxIndex].author_name +'</a>'
							+'	<div class="tag-box clearfix" >';
							for (var j = 0; j < fluidAuthor[boxIndex].tag_box.length; j++) {
								boxObj += '<span class="tag-item">'+fluidAuthor[boxIndex].tag_box[j]+'</span>';
							}
					boxObj += '	</div>'
							+'	<div class="author-state"" id="item_state">'
							+'	  <span>'+ fluidAuthor[boxIndex].author_state +'</span>'
							+'	</div>'
							+'  <a href="" target="_blank" class="go-more">查看更多</a>'
							+'</div>';
				
				$('#show .show_icon').eq(temp).append(boxObj);
				boxIndex ++; //box对象数组下标
				temp ++;	//当前插入元素的父元素的下标
				$('#loading .loading-btn .loading-img').css('display','none');
			}
			flag = false;
		}


	loadMore(); //放在这里是为了解决函数的预处理问题

	// 滚动监听事件
	$(window).scroll(function(){
		if( $(window).scrollTop() + $(window).height() >= $(document).height()){
			$('#loading .loading-btn').click();
		}
			
	});


	
});