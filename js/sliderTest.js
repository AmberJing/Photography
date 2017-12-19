/*
	轮播
 */
var slide_container = $('.slide-container');	// 获取轮播容器
var imgHeight = slide_container.find('img').height();	// 获取图片的高度和宽度
var imgWidth = slide_container.find('img').width();
var imgCount = slide_container.find('.slide-item').length;	// 计算图片数量
var currentIndex = 0;	//当前索引
var timer = undefined; 	//定时器对象
var offset = 0;
var winWidth = document.body.scrollWidth - 12;      // 取窗口宽度

// console.log(imgWidth);
// 动态添加圆点切换按钮
var btnTemp = '<span class="active"></span>';
for (var i = 1; i < imgCount; i++) {
	btnTemp += '<span></span>';
}
slide_container.find('.slide-pagination').append(btnTemp);

/* 初始化*/
slide_container.find(".slide-main").css({
	"width":imgCount * imgWidth*imgCount +"px",
	"transform":"translate3d(0,0,0)"
});

// 圆点按钮点击事件
slide_container.find(".slide-pagination span").click(function() {
	// 关闭已经存在的定时器
	clearInterval(timer);

	// 赋值索引
	currentIndex = $(this).index();
	// 轮播
	slide(currentIndex);

	//开启新的定时器
	timer = setInterval("slideAnimation()", 4000);
	
});

function slide(currentIndex){
	
	// console.log(currentIndex);
	// 设置当前按钮背景色
	slide_container.find(".slide-pagination span").removeClass('active');
	slide_container.find(".slide-pagination span").eq(currentIndex).addClass('active');
	
	// 显示当前图片

	slide_container.find(".slide-main").css({
		"transform":"translate3d(-"+ imgWidth*currentIndex +"px,0,0)",
		"transition-duration": '1000ms'
	});
	//	transition-duration: speed+'ms';
	// transform: translate3d(-（div.width()）, 0px, 0px);


}

// 左箭头点击切换
slide_container.find('.slide-btn-prev').click(function(){

	currentIndex --;

	//如果超过第一张，设置到最后一张
	if (currentIndex < 0) {
		currentIndex = imgCount - 1;
	}

	slide_container.find(".slide-pagination span").eq(currentIndex).click();
})
// 右箭头点击切换
slide_container.find('.slide-btn-next').click(function(){

	currentIndex ++ ;

	//如果超过最后一张，设置到第一张
	if (currentIndex >= imgCount) {
		currentIndex = 0;
	}
	slide_container.find(".slide-pagination span").eq(currentIndex).click();
})
//设置循环定时器
timer = setInterval("slideAnimation()", 4000);

function slideAnimation() {
	currentIndex ++;
	if (currentIndex == imgCount) {
		//如果图片播放到最后一张，那么index的值恢复为0
		currentIndex = 0;
	}

	slide(currentIndex);
}

