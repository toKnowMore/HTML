var userId;
var tradePlatform;
function getUserId(userid, trade_platform) {
    userId = userid;
    tradePlatform = trade_platform;
    if(!userId){
        alert("请先登录!");
    }
}

var goodId;
(function () {
    $.ajax({
        url: $api.getBookInfo,
        type: 'POST',
        data: {
            'merchandise_id': '1'
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            var res = result.data;
            $(".header>img").attr("src", res.img_mimus);

            $(".header .book_name p").text(res.merchandise_title);

            var price = res.merchandise_price / 100;
            $(".header .book_price .price span").text(price);
            $(".header .person_desc").text(res.merchandise_subtitle);

            console.log(typeof result.status);
            if(result.status === 800){
                $(".header .book_price .storeSpan").text(0);
                $(".submit").unbind("click");
                alert("您来晚一步,书籍已卖完");
            }else {
                $(".header .book_price .storeSpan").text(res.total);
            }

            $(".header .book_price .sTextSpan").text(res.sold);

            goodId = res.merchandise_id;
        },
        error: function (result) {
            console.log(result);
        }
    });
})();

//点击购买
$(".submit").click(function () {
    var username = $(".userName>input").val();
    var data = getInfo();
    var pro = $("#pro").val();
    var city = $("#city").val();
    var area = $("#area").val();
    var street = $(".userTalk>textarea").val();
    if(username && pro && city && area && data.phoneNumber && street){
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(data.phoneNumber))) {
            alert("请填写正确的手机号码");
        }else {
            $(".pay").css("display", "block");

            $(".zhe").css("display", "block");
        }
    }else {
        alert("请输入完整信息后购买");
    }
});

$('#distpicker1').distpicker({
    province: '省',
    city: '市',
    district: '区'
});

//检测手机号是否正确
$(".userAdd select").focus(function () {
    var phoneNumber = $(".userLink>input").val();
    if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(phoneNumber))) {
        $(".userLink>input").focus();
        alert("请填写正确的手机号码");
    }
});


//选择支付方式
function getInfo(){
    var pro = $("#pro").val();
    var city = $("#city").val();
    var area = $("#area").val();
    var street = $(".userTalk>textarea").val();
    var user_id = this.userId;
    //var user_id= 'e588d0e625f84e5fbf9b89984c34589a';

    var trade_platform = this.tradePlatform;
    //var trade_platform = 'Android';

    var username = $(".userName>input").val();
    var phoneNumber = $(".userLink>input").val();

    var data = {
        username: username,
        phoneNumber: phoneNumber,
        address: pro + city + area + street,
        //商品id
        goodsId: this.goodId,
        userId: user_id,
        trade_platform: trade_platform
    };
    return data;
}


//支付信息
function post(username,address,phoneNumber,userId,goodsId,appType,trade_platform) {
    $.ajax({
        url: $api.sendInfo,
        type: 'POST',
        data: {
            user_id: userId,
            merchandise_id: goodsId,
            delivery_addr: address,
            contact_name: username,
            contact_tel: phoneNumber,
            trade_type: appType,
            trade_platform: trade_platform
        },
        dataType: "json",
        success: function (result) {
            console.log(result.data);
            var strJson = JSON.stringify(result.data);
            $(".pay").css("display", "none");
            console.log(strJson);
            console.log(appType,trade_platform);

            linkAPP(strJson, appType, trade_platform);
        },
        error: function (result) {
            console.log(result);
        }
    });
}

//与原生交互
function linkAPP(strJson, appType, trade_platform) {
    $("#bookDetails>.zhe").css("display", "none");
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
    var data = getInfo();
    //微信
    var trade_type = 'wx_APP';
    $("#bookDetails>.zhe").css("display", "none");
    post(data.username,data.address,data.phoneNumber,data.userId,data.goodsId,trade_type,data.trade_platform);
    $("#bookDetails>.wa").css("display", "block");
});

$(".ali .payType").click(function () {
    $(this).attr("src", "img/zhifufangshi_yigouxuan_icon@2x.png");
    var data = getInfo();
    //支付宝
    var trade_type = 'alipay_APP';
    $("#bookDetails>.zhe").css("display", "none");
    post(data.username,data.address,data.phoneNumber,data.userId,data.goodsId,trade_type,data.trade_platform);
    $("#bookDetails>.wa").css("display", "block");
});