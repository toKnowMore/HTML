
$(".submit a").click(function () {
    var area = $(".shopArea>input").val();
    var beds = $(".shopBeds>input").val();
    var shopEmployees = $(".shopEmployees>input").val();
    if(area === '0' || beds === '0' || shopEmployees === '0'){
        alert("数据不能为0");
    }else {
        if(area && beds && shopEmployees){
            console.log(area, beds, shopEmployees);
            sendInfo();

            //放在请求成功回调函数里
            window.location.href = 'share_test.html';
        }else {
            alert("数据不能为空");
        }
    }
});

function sendInfo() {
    $.ajax({
        url:'',
        type: 'POST',
        data: {

        },
        dataType: 'json',
        success: function (result) {

        },
        error: function (result) {

        }
    });
}