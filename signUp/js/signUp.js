
var userId;
var tradePlatform;
function getUserId(userid, trade_platform) {
    userId = userid;
    tradePlatform = trade_platform;
    if(!userId){
        alert("请先登录!");
    }
}

//课程Id
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var Request = new Object();
Request = GetRequest();
var courseId;
courseId = Request['course_id'];

//测试数据
// userId = 'DD89EE5AFEACC19E28BD4A9C2DCB3AD6';
// tradePlatform = 'Android';
// courseId = '1';

//获取信息
function getUserInfo() {
    var pro = $("#pro").val();
    var city = $("#city").val();
    var area = $("#area").val();
    var userAdd = pro + city + area;
    var data = {
        shopName: $(".shopName>input").val(),
        userName: $(".userName>input").val(),
        userLink: $(".userLink>input").val(),
        userAdd: userAdd,
        userNumber: $(".userNumber>input").val(),
        userTeacher: $(".userTeacher>input").val()
    };
    return data;
}

$(".userAdd select").click(function () {
    var phoneNumber = $(".userLink>input").val();
    if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(phoneNumber))) {
        $(".userLink>input").focus();
        alert("请填写正确的手机号码");
    }
});

$(".button").click(function () {
    var data = getUserInfo();
    if(data.shopName && data.userName && data.userLink && data.userAdd && data.userNumber){
        $(".pay").css("display", "block");
        $(".zhe").css("display", "block");
    }else {
        alert("请输写完整信息");
    }
});

function post(shopName, userName, userLink, userAdd, userNumber, userTeacher,tradeType) {
    $.ajax({
        url: $api.sendInfo,
        type: 'POST',
        data: {
            user_id: this.userId,
            course_under_id: this.courseId,
            shop_name: shopName,
            link_name: userName,
            link_phone: userLink,
            link_address: userAdd,
            person_num: userNumber,
            tutor_name: userTeacher,
            order_platform: this.tradePlatform,
            pay_type: tradeType
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            $(".pay").css("display", "none");
            var strJson = JSON.stringify(result.data);
            console.log(strJson);
            console.log(tradePlatform);
            linkAPP(strJson, tradeType, tradePlatform);
        },
        error: function (result) {

        }
    });
}

//与原生交互
function linkAPP(strJson, appType, trade_platform) {
    $("#box>.wait").css("display", "none");
    if (trade_platform == 'Android') {
        if(appType == 'wx_APP'){
            window.toWeChatPay.toWeChatPay(strJson);
        }else if(appType == 'alipay_APP'){
            window.toAliPay.toAliPay(strJson);
        }
    } else if (trade_platform == 'iOS') {
        if(appType == 'wx_APP'){
            window.webkit.messageHandlers.toWeChatPay.postMessage(strJson);
        }else if(appType == 'alipay_APP'){
            window.webkit.messageHandlers.toAliPay.postMessage(strJson);
        }
    }
}

$(".weXin .payType").click(function () {
    $(this).attr("src", "img/zhifufangshi_yigouxuan_icon@2x.png");
    var data = getUserInfo();
    //微信
    var tradeType = 'wx_APP';
    $("#box>.zhe").css("display", "none");
    $("#box>.wait").css("display", "block");
    $(".pay").css("display", "none");
    post(data.shopName, data.userName, data.userLink, data.userAdd, data.userNumber, data.userTeacher,tradeType);

});


$(".ali>.payType").click(function () {
    $(this).attr("src", "img/zhifufangshi_yigouxuan_icon@2x.png");
    var data = getUserInfo();
    //支付宝
    var tradeType = 'alipay_APP';
    $("#box>.zhe").css("display", "none");
    $("#box>.wait").css("display", "block");
    $(".pay").css("display", "none");
    post(data.shopName, data.userName, data.userLink, data.userAdd, data.userNumber, data.userTeacher,tradeType);
});


