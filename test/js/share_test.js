$(".submit a").click(function () {
    $(".lead").css("display", "block");
});

$(".lead").click(function () {
   $(this).css("display", "none");
});

//getConfig(url, name, desc, imgUrl, link)
var url = window.location.href.split("#")[0];
var link = 'http://api.yuzhilai.com/yuzhilai_html/test/test.html';
var name = '美容店店务测试';
var desc = '多少业绩才健康';
var imgUrl = 'http://api.yuzhilai.com/yuzhilai_html/test/img/logo1.png';
getConfig(url, name, desc, imgUrl, link);