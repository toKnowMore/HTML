
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if(url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var Request = new Object();
    Request = GetRequest();
    var Object_id;
    Object_id = Request['user_id'];
    var Object_name;
    Object_name = Request['user_name'];
    var Object_head;
    Object_head = Request['user_head'];

    if(document.images){
        var userImg = document.getElementsByClassName("userImg")[0];
        if(Object_head) {
            userImg.src = Object_head;
        }
    }

    var userName = document.getElementsByClassName("userName")[0];

    if(Object_name){
        userName.innerHTML = Object_name;
    }

    if(!is_weixn()){
        $(".moneyText").css({
            "marginTop": "-0.5rem"
        })
        $("#share .footer").css({
            "marginTop": "6rem",
            "position": "relative",
        });
        $("#share .footer img").css("width", "15%");
        $("#share .footer p").css("fontSize", "150%");
        $("#share .content2 .btn").css("width", "85%");
        $("#share .content1 .leftDiv").css("paddingTop", "0.5rem");
        $("#share .content2 .desc").css("fontSize","1.2rem");
        $("#share .header .userImg").css("marginTop", "6.5rem");
        console.log("不是微信");
    }else {
        console.log("微信")
    }

    var myDate = new Date();
    if(myDate.getMonth() === 2){
        if(myDate.getDate() >= 10 && myDate.getDate() <= 12){
            $(".money>span").text(188);
            $(".rightDiv>p").text("注册成功您既可获得188元店务学习基金");
        }
    }

    var btn = document.getElementsByClassName("btn")[0];
    btn.onclick = function () {
        window.location.href = "register.html?user_id=" + Object_id;
    };







