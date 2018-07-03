// 2秒之内未能成功打开APP，则跳转到相应的下载页面
setTimeout(function(){
	window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sharker';
}, 2000);