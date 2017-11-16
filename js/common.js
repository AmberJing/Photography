window.onload = function(){

	var returnTop = document.getElementById('returnTop');	//返回顶部图标

	var loginLink = document.getElementById('loginLink');	//登录按钮
	var loginObj = document.getElementById('login');	//获得登录界面对象

	var login_content = document.getElementsByClassName('login_content')[0];	//登录内容区
	var zhuce_content = document.getElementsByClassName('zhuce_content')[0];	//注册内容区


	var loginDelBtn = document.getElementById('login').getElementsByClassName('del')[0];	//登录界面关闭按钮
	var zhuceDelBtn = document.getElementById('login').getElementsByClassName('del')[1];	//注册界面关闭按钮
	var zhuceBtn = document.getElementsByClassName('zhuce')[0];	//注册按钮


	var clientWidth = document.documentElement.clientWidth;	//文档可视区宽度
	var clientHeight = document.documentElement.clientHeight;	//文档可视区宽度

	var scrollTopIndex = 0; //滚动条滚出的高度索引
	var flag = true;	//当前是否有定时器正在进行
	var timerId;	//定时器全局变量

	// 滚动条滚动事件监听
	window.onscroll = function(e){
		e = e || window.event;
		var scrollTop = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
		
		// 如果滚动条滚出超过一屏
		if(scrollTop >= clientHeight){
			returnTop.style.position = 'fixed';
			returnTop.style.display = 'block';
		} else if(scrollTop <= 0){
			returnTop.style.position = 'absolute';
			returnTop.style.display = 'none';
		}
	}
	
	// 点击回到顶部图标事件
	returnTop.onclick = function(){
	
		var step1 = 50;
		var step2;
		console.log(document.body.scrollTop);
		var timerId3 = setInterval(function(){
	
			var scrollTop = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
			console.log(scrollTop);
			var returnTopValue = parseInt(returnTop.style.top);
	
			
			if(scrollTop <= clientHeight){
	
				clearInterval(timerId3);
	
				returnTop.style.position = 'absolute';
				returnTopValue = parseInt(returnTop.style.top);
				returnTop.style.top = returnTopValue + clientHeight + 'px';
	
				// returnTop.style.top = 650 + clientHeight + 'px';
				returnTopValue = parseInt(returnTop.style.top);
				step2 = parseInt(returnTopValue/30);
				step1 = parseInt(scrollTop/30);
	
				var i = 1;
	
				var timerId4 = setInterval(function(){
					console.log(timerId4);
					i ++;
					// returnTop.style.top = 650 + clientHeight - i*step2 + 'px';
					returnTop.style.top = returnTopValue - i*step2 + 'px';
					$(window).scrollTop(scrollTop - i*step1);
	
					if(document.body.scrollTop <= 0){
						returnTop.style.display = 'none';
						returnTop.style.position = 'fixed';
						returnTop.style.top = '650px';
						clearInterval(timerId4);
						return;
					}
				},1);
	
			}
	
			window.scrollTo(0,scrollTop - step1);
			returnTop.style.top = returnTopValue - step1/10 + 'px';
		},5);
	
	}
	
	// 点击登录按钮，显示登录界面
	loginLink.onclick = function(){
		loginLink.className = 'highlight';
		loginObj.style.display = 'block';
		login_content.style.display = 'block';
		zhuce_content.style.display = 'none';
	}

	// 点击登陆界面中的隐藏按钮，关闭登录界面
	loginDelBtn.onclick = function(){
		loginObj.style.display = 'none';
		loginLink.className = '';
	}

	// 点击登陆界面中的隐藏按钮，关闭登录界面
	zhuceDelBtn.onclick = function(){
		loginObj.style.display = 'none';
		loginLink.className = '';
	}

	// 点击注册事件
	zhuceBtn.onclick = function(){
		login_content.style.display = 'none';
		zhuce_content.style.display = 'block';
	}


}