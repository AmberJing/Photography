/*
	轮播
 */
(function($){
  function slider(options){
    this.opts=$.extend({},slider.defaluts,options);//2.这里用来合并对象获得一个新的对象
    this._imgSlider();
  }
  //设置默认值
  slider.defaluts={
    slideContainer:null,
    slideElement:null,
    imgElement:null,
    buttonElement:null,
    leftBtn:null,
    rightBtn:null,
    time:2000
  }
  slider.prototype._imgSlider=function(){

    var opts=this.opts,
        currIndex = 0,
        imgCount = opts.imgElement.length,//图片数量
        imgWidth =  opts.imgElement.width(),//图片宽度
        timeInter = null;

    if(opts.slideElement=='') return;

    // 滑动动画
    function slideAnim(currIndex){
      console.log(imgWidth);
      var offset = imgWidth * currIndex;
      opts.slideElement.css({
          "transform":"translate3d(-"+ offset +"px,0,0)",
          "transition":"800ms"
      });
    }

    function buttonShow(currIndex){
     opts.buttonElement.find('span').siblings().removeClass("active").eq(currIndex).addClass("active");

  }

    /*2.首先左右两个箭头点击:左箭头点击*/
    opts.leftBtn.click(function(){
      // stopAnim();

      currIndex --;
      if(currIndex < 0){
        currIndex = imgCount - 1;
      }
      buttonShow(currIndex);
      slideAnim(currIndex);

      // startAnim();
    })

    /*2.首先左右两个箭头点击：右箭头点击*/
    opts.rightBtn.click(function(){
      // stopAnim();

      currIndex ++;
      if(currIndex >= imgCount){
        currIndex = 0;
      }
      buttonShow(currIndex);
      slideAnim(currIndex);

      // startAnim();
    })

    opts.buttonElement.find('span').click(function(){
	   // stopAnim();
	    console.log($(this).index());
	    // 赋值索引
	    currIndex = $(this).index();
	    buttonShow(currIndex);
	    slideAnim(currIndex);
	    // startAnim();
   })


  }
  //类级别的插件开发，即$.extend()扩展jquery对象本身；1.这里用来扩展方法
  $.extend({
    slider:function(options){
      new slider(options);
    }
  })
})(jQuery)



$.slider({
    slideContainer:$(".slide-container"),
    slideElement:$(".slide-wrapper"),
    imgElement:$(".slide-item"),
    buttonElement:$(".slide-pagination"),
    leftBtn:$(".slide-btn-prev"),
    rightBtn:$(".slide-btn-next"),
    time:2000
})

	/*
		下雨
	*/

	// rainFall();
	// function rainFall() {
	//     setTimeout(function () {
	//         var leftRandom = RandomNumBoth(0,100);
	//         var temp ='<div style="left:'+leftRandom+'%;" class="rain animated xiayu"></div>';
	//         $(".slide-container").append(temp);
	//         rainFall();
	//         if($('.yudi').length>=150){
	//             $('.yudi').remove();
	//         }
	//     },100)
	// }
	// function RandomNumBoth(Min,Max){
	//     var Range = Max - Min;
	//     var Rand = Math.random();
	//     var num = Min + Math.round(Rand * Range); //四舍五入
	//     return num;
	// }



// <script type="application/javascript">
//     /*
//      * Banner 轮播图类
//      */
//     function Banner(config) {
//         this._default = {
//             'list':[],
//             'length':0,
//             'current':0,
//             'timer':undefined,      // 计时器
//             'view':undefined,           // 视图
//             'flick':undefined,      // 圆点选择器
//             'duration':3,               // 切换时间间隔
//             'animation':0.5         // 动画时间
//         };
//         this.config = $.extend(true, this._default, config);// 合并this._default和config(true->深度拷贝)
//         this.init(this.config);
//     }
//     Banner.prototype.init = function(config) {
//         this.animateStyle = 'normal';       // 动画效果 ( 根据动画效果, 不同的方法有不同的实现 )
//         this.direction = 'right';   // 当前滚动方向
//         this.view = this.config.view;
//         this.config.length = this.config.list.length;
//         this.config.flick = this.view ? this.view.find(".bannerStyle_1 .flicking_con > a") : undefined;
//     };
//     // 计算下一个要显示的图片的索引
//     // by: 如果没有传入参数, 则使用配置中的数据this.config.current, 否则使用传入的参数
//     Banner.prototype.nextIndex = function(by) {
//         by === undefined && (by = this.config.current);
//         var next = this.direction == 'right' ? by + 1 : by - 1;
//         next >= this.config.length && (next = 0);
//         next < 0 && (next = this.config.length - 1);
//         return next;
//     };
//     // 跳到指定图片
//     Banner.prototype.animateIndex = function(index) {
//         this.endAnimate();
//         if(index >= 0 && index < this.config.length && this.config.current != index) {
//             if(this.config.current < index) {
//                 this.direction = 'right';
//                 this.config.current = index - 1;
//             } else {
//                 this.direction = 'left';
//                 this.config.current = index + 1;
//             }
//             this.showIndex(this.config.current);
//             this.startAnimate();
//         }
//     };
//     // 向右动画
//     Banner.prototype.startAnimateRight = function() {
//         this.direction = 'right';
//         this.startAnimate();
//     };
//     // 向左动画
//     Banner.prototype.startAnimateLeft = function() {
//         this.direction = 'left';
//         this.startAnimate();
//     };
//     // 结束动画
//     Banner.prototype.endAnimate = function() {
//         if(this.config.timer){
//             clearTimeout(this.config.timer);
//             this.config.timer = undefined;
//         }
//     };

//     Banner.prototype.startAnimate = function() {
//         switch(this.animateStyle) {
//             case 'normal':
//                 // 默认效果
//                 this.endAnimate();
//                 if(this.config.length > 1) {
//                     var prev = this.config.current, next = this.nextIndex(),
//                             end = this.direction == 'right' ? {prev:"-100%", current:"100%"} : {prev:"100%", current:"-100%"};  // 前一个图片和当前图片的最后停留位置
//                     this.config.flick.eq(next).addClass("on").siblings().removeClass("on");
//                     // 执行动画
//                     var banner = this;
//                     this.imgs.eq(prev).stop().animate({"left":end.prev}, this.config.animation, function(){
//                         banner.config.timer = setTimeout(function(){
//                             banner.startAnimate();
//                         },banner.config.duration);
//                     });
//                     this.imgs.eq(next).css({"left":end.current}).stop().animate({"left":"0%"}, this.config.animation);
//                     this.config.current = next;
//                 }
//                 break;
//             case 'rotate-3d':
//                 // 3D旋转效果
//                 this.endAnimate();
//                 this.updateBgImg();
//                 if(this.config.length > 1) {
//                     var prev = this.config.current, next = this.nextIndex();
//                     this.config.flick.eq(next).addClass("on").siblings().removeClass("on");
//                     this.config.current = next;
//                     this.parts.css("transform", "rotateX(" + ((this.direction == 'right' ? ++this.rotate : --this.rotate) * 90) + "deg)");
//                     var banner = this;
//                     this.config.timer = setTimeout(function(){
//                         banner.startAnimate();
//                     },banner.config.duration);
//                 }
//                 break;
//         }
//     };
//     // 指定显示的图片
//     Banner.prototype.showIndex = function(index) {
//         switch(this.animateStyle) {
//             case 'normal':
//                 // 默认效果
//                 this.imgs.eq(index).css("left","0%").siblings(".img-item").css("left","100%");
//                 this.config.flick.eq(index).addClass("on").siblings().removeClass("on");
//                 break;
//             case 'rotate-3d':
//                 // 3D旋转效果
//                 this.updateFaceBottonTopImg(index);
//                 this.config.flick.eq(index).addClass("on").siblings().removeClass("on");
//                 break;
//         }
//     };

//     /*
//      * ********************************************
//      * 3D旋转效果 特有函数 begin
//      */
//     // 每次旋转前都需要更新背部的图片
//     Banner.prototype.updateBgImg = function() {
//         // 计算背部要显示的图片
//         var bg_image_index = this.nextIndex(this.nextIndex());
//         // index: 计算背景图片当前显示在哪个img中( 总共有4个图片, 分别位于正面/底部/背部/顶部, 索引分别为0, 1, 2, 3 )
//         var c, index = (c = (this.rotate + 2) % 4) >= 0 ? c : c + 4;
//         var banner = this;
//         // console.log('第',index,'个面-使用更新为第',bg_image_index,'张图');
//         this.parts && this.parts.each(function () {
//             $(this).find('.img:eq('+index+')').css({'background-image': 'url("'+banner.config.list[bg_image_index]+'")'});
//         });
//     };
//     // 更新正面/顶部/底部的图片
//     // index: 要显示哪张图片
//     // 备注: 因为总共有四个面的图片需要更新, 初始化时, 正面/顶部/底部的图片只需更新一次即可 (背部的图片在每次旋转前都需要更新)
//     Banner.prototype.updateFaceBottonTopImg = function(index) {
//         // face, bottom, top: 计算正面/顶部/底部图片当前显示在哪个img中( 总共有4个图片, 分别位于正面/底部/背部/顶部, 索引分别为0, 1, 2, 3 )
//         var c, face = (c = this.rotate % 4) >= 0 ? c : c + 4, bottom, top;
//         bottom = face + 1; bottom >= this.config.length && (bottom = 0);
//         top = face - 1; top < 0 && (top = this.config.length - 1);
//         var banner = this;
//         this.parts && this.parts.each(function () {
//             // console.log('第',face,'个面-使用更新为第',index,'张图');
//             $(this).find('.img:eq('+face+')').css({'background-image': 'url("'+banner.config.list[index]+'")'});
//             // console.log('第',bottom,'个面-使用更新为第',index < banner.config.length - 1 ? index + 1 : 0,'张图');
//             $(this).find('.img:eq('+bottom+')').css({'background-image': 'url("'+banner.config.list[index < banner.config.length - 1 ? index + 1 : 0]+'")'});
//             // console.log('第',top,'个面-使用更新为第',index > 0 ? index - 1 : banner.config.length - 1,'张图');
//             $(this).find('.img:eq('+top+')').css({'background-image': 'url("'+banner.config.list[index > 0 ? index - 1 : banner.config.length - 1]+'")'});
//         });
//     };
//     // 初始化旋转部分: 设置3d旋转的四个面的图片, index表示默认显示哪张图片
//     Banner.prototype.initImgPart = function(index) {
//         var banner = this;
//         this.parts && this.parts.each(function () {
//             $(this).find('.img').each(function (i) {
//                 var j = 0;
//                 switch (i) {
//                     case 0: j = index; break;   // 正面
//                     case 1: j = index + 1; break;   // 底部
//                     case 2: break;  // 背部
//                     case 3: j = index - 1; break;   // 顶部
//                 }
//                 j >= banner.config.length && (j = 0);
//                 j < 0 && (j = banner.config.length - 1);
//                 $(this).css({'background-image': 'url("'+banner.config.list[j]+'")', 'background-repeat':'no-repeat', 'background-color':'#fff'});
//             });
//         });
//     };
//     // 更新旋转部分: 之所以使用定时器, 是因为无法实时获取模块宽度
//     Banner.prototype.updateImgPart = function() {
//         this.parts && this.parts.each(function(index) {
//             $(this).css({
//                 "left":$(this).width() * index + "px"
//             });
//             $(this).find(".img").css({
//                 "background-position": -$(this).width() * index + "px"
//             });
//         });
//         var banner = this;
//         setTimeout(function () {
//             banner.updateImgPart();
//         }, 800);
//     };
//     /*
//      * 3D旋转效果 特有函数 end
//      * ********************************************
//      */

//     // 图片数据
//     var list_banner_style_01_1504601851022 = [];
//     list_banner_style_01_1504601851022.push('img/upimages/pkgimg/pkgimg/web/banner3.jpg');list_banner_style_01_1504601851022.push('img/upimages/pkgimg/pkgimg/web/banner2.jpg');
//     var banner_banner_style_01_1504601851022;        // 轮播图对象

//     $(function(){
//         // 创建轮播图
//         banner_banner_style_01_1504601851022 = new Banner({
//             'list':list_banner_style_01_1504601851022,
//             'view':$('#banner_style_01_1504601851022'),
//             'duration':parseFloat('5') * 1000,
//             'animation':parseFloat('1') * 1000
//         });
//                 banner_banner_style_01_1504601851022.animateStyle = 'normal';
//         banner_banner_style_01_1504601851022.imgs = banner_banner_style_01_1504601851022.view.find(".bannerStyle_1 .main_image .img-list").children(".img-item");
//         banner_banner_style_01_1504601851022.view.find('a').each(function () {
//             $(this).click(function () {
//                 if(!$(this).attr('href')) {
//                     return false;
//                 }
//             });
//         });
                
//         // 显示指定索引的图片
//         banner_banner_style_01_1504601851022.showIndex(banner_banner_style_01_1504601851022.config.current);

//         // 监听 点击圆点
//         banner_banner_style_01_1504601851022.config.flick.click(function(){
//             banner_banner_style_01_1504601851022.animateIndex($(this).index());
//             return false;
//         });

//         // 监听 鼠标悬浮时
//         banner_banner_style_01_1504601851022.view.hover(
//                 function(){
//                     banner_banner_style_01_1504601851022.endAnimate();
//                     banner_banner_style_01_1504601851022.view.find(".bannerStyle_1 .btn_prev, .bannerStyle_1 .btn_next").fadeIn();
//                 },
//                 function(){
//                     banner_banner_style_01_1504601851022.config.timer = setTimeout(function(){
//                         banner_banner_style_01_1504601851022.startAnimateRight();
//                     },banner_banner_style_01_1504601851022.config.duration);
//                     banner_banner_style_01_1504601851022.view.find(".bannerStyle_1 .btn_prev, .bannerStyle_1 .btn_next").fadeOut()
//                 }
//         );

//         // 监听 点击左右按钮
//         banner_banner_style_01_1504601851022.view.find(".btn_prev").click(function() {
//             banner_banner_style_01_1504601851022.startAnimateLeft();
//         });
//         banner_banner_style_01_1504601851022.view.find(".btn_next").click(function() {
//             banner_banner_style_01_1504601851022.startAnimateRight();
//         });

//         // 监听 触摸事件
//         var touchVal = null;
//         document.addEventListener("touchstart", function(e){
//             if($(e.target).is(banner_banner_style_01_1504601851022.view) || $(e.target).closest("#"+banner_banner_style_01_1504601851022.view.attr("id")).length > 0) {
//                 touchVal = {};
//                 touchVal.downX = e.touches[0].clientX;  // 记录触摸起始位置
//                 // if (e.preventDefault) {
//                 //  e.preventDefault();
//                 // } else {
//                 //  e.returnvalue = false;
//                 // }
//             }
//         }, false);
//         document.addEventListener("touchmove", function(e){
//             if(touchVal && touchVal.downX) {
//                 touchVal.moveX = e.touches[0].clientX - touchVal.downX;     // 计算触摸中的偏移位置
//                 // if (e.preventDefault) {
//                 //  e.preventDefault();
//                 // } else {
//                 //  e.returnvalue = false;
//                 // }
//             }
//         }, false);
//         document.addEventListener("touchend", function(e){
//             if(touchVal && touchVal.moveX){
//                 if(touchVal.moveX > 30){
//                     banner_banner_style_01_1504601851022.startAnimateLeft();             // 触摸生效
//                     if (e.preventDefault) {
//                         e.preventDefault();
//                     } else {
//                         e.returnvalue = false;
//                     }
//                 }else if(touchVal.moveX < -30){
//                     banner_banner_style_01_1504601851022.startAnimateRight();                // 触摸生效
//                     if (e.preventDefault) {
//                         e.preventDefault();
//                     } else {
//                         e.returnvalue = false;
//                     }
//                 }
//             }
//             touchVal = null;
//         }, false);

//         // 运行
//         banner_banner_style_01_1504601851022.config.timer = setTimeout(function(){
//             banner_banner_style_01_1504601851022.startAnimateRight();
//         }, banner_banner_style_01_1504601851022.config.duration);
//     });

// </script>