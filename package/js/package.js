var userId;
var tradePlatform;
function getUserId(userid, trade_platform) {
    userId = userid;
    tradePlatform = trade_platform;
    getStatus(userId);
}

//支付信息
function pay(userId, pay_type, tradePlatform) {
    $.ajax({
        url: $api.pay,
        type: 'POST',
        data: {
            'pay_id': 'HuoJin',
            'user_id': userId,
            'pay_type': pay_type
        },
        dataType: "json",
        success: function (result) {
            var strJson = JSON.stringify(result.data);
            console.log(strJson);
            linkAPP(strJson, pay_type, tradePlatform);
            $("#bookDetails>.wa").css("display", "none");
            $(".zheAli").css("display", "none");
            $(".zheWx").css("display", "none");
            $(".pay").css("display", "none");
            window.location.reload();
        },
        error: function (result) {
            console.log(result);
        }
    });
}

//点击购买
$(".submit").click(function () {

    $(".pay").css("display", "block");

    $(".zhe").css("display", "block");
});

$(".zhe").click(function () {
    $(".pay").css("display", "none");
    $(".zhe").css("display", "none");
    $(".zheAli").css("display", "none");
    $(".zheWx").css("display", "none");
});

//选择支付方式
function getInfo(){
    var user_id = this.userId;
    //var user_id= 'e588d0e625f84e5fbf9b89984c34589a';
    var trade_platform = this.tradePlatform;
    //var trade_platform = 'Android';
    if(!user_id){
        alert("请先登录!");
        window.location.reload();
    }
    var data = {
        userId: user_id,
        trade_platform: trade_platform
    };
    return data;
}

function getStatus(userId) {
    $.ajax({
        url: $api.bought,
        type: 'POST',
        data: {
            user_id: userId,
            album_id: '10'
        },
        dataType: "json",
        success: function (res) {
            if(res.data === 1){
                $(".submit").css("display", "none");
                $(".bought").css("display", "block");
            }
            console.log(res);
        },
        error: function (res) {
            console.log(res);
        }
    });
}

//与原生交互
function linkAPP(strJson, appType, trade_platform) {
    if (trade_platform === 'Android') {
        if(appType === 'wx_APP'){
            window.toWeChatPay.toWeChatPay(strJson);

        }else if(appType === 'alipay_APP'){
            window.toAliPay.toAliPay(strJson);
        }
    } else if (trade_platform === 'iOS') {
        if(appType === 'wx_APP'){
            window.webkit.messageHandlers.toWeChatPay.postMessage(strJson);
        }else if(appType === 'alipay_APP'){
            window.webkit.messageHandlers.toAliPay.postMessage(strJson);
        }
    }
}

$(".weXin .payType").click(function () {
    $(this).attr("src", "img/zhifufangshi_yigouxuan_icon@2x.png");
    $(".zheAli").css("display", "block");
    var data = getInfo();
    //微信
    var app_type = 'wx_APP';
    $("#bookDetails>.zhe").css("display", "none");
    pay(data.userId, app_type,data.trade_platform
    );
    $("#bookDetails>.wa").css("display", "block");
});

$(".ali .payType").click(function () {
    $(this).attr("src", "img/zhifufangshi_yigouxuan_icon@2x.png");
    $(".zheWx").css("display", "block");
    var data = getInfo();
    //支付宝
    var app_type = 'alipay_APP';
    $("#bookDetails>.zhe").css("display", "none");
    pay(data.userId, app_type, data.trade_platform
);
    $("#bookDetails>.wa").css("display", "block");
});