
function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()* temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}
var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

var numArr = getArrayItems(array, 12)

for(var j = 0; j < 12; j++){
    $("<img>").attr("src", "img/" + numArr[j] + ".jpg").appendTo($(".users"));
}

//获取链接中的参数
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

//点击获取验证码
var st = false;
$(".code").click(function () {
    var phoneNumber = $(".input1>input").val();
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phoneNumber))) {
        $(".input1>input").focus();
        alert("请填写正确的手机号码");
    }else if(st == false){
        console.log(phoneNumber);
        str = true;
        $.ajax({
            url: $api.getCode,
            type: 'POST',
            data: {
                'tel': phoneNumber
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
            }
        });
        change();
    }
});
var timer;
function change() {
    var t = 59;
    timer = setInterval(function () {
        $(".code").text(t + "秒重发送");
        t--;
        st = true;
        if(t <= 0){
            st = false;
            clearInterval(timer);
            $(".code").text("获取验证码");
        }
    }, 1000);
}

if(!is_weixn()){
    $("#register .content .inputDiv .line").css("left", "64%");
    $("#register .users").css("width", "80%");
    $("#register .users img").css({
        "margin": "0.8rem",
        "width": "5rem"
    });
    console.log("不是微信")
}

$(".btn").click(function () {
    var phoneNumber = $(".input1 input").val();
    var code = $(".input2>input").val();
    //var password = $(".input3>input").val();

    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phoneNumber))) {
        $(".input1>input").focus();
        alert("请填写正确的手机号码");
    // }else if (password.length < 6){
    //     $(".input3>input").focus();
    //     alert("请填写不少于6位密码");
    //     return;
    }else if(!code){
        alert("请输入验证码！");
        return;
    }else {
        $.ajax({
            url: $api.sendInfo,
            type: 'POST',
            data: {
                'user_id': Object_id,
                'user_tel': phoneNumber,
                'captcha': code,
                //'user_password': password
            },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if(result.status === 666){
                    window.location.href = "success.html";
                }else {
                    alert(result.msg);
                }
            }
        });
    }
});