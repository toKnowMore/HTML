function getConfig(url, name, desc, imgUrl, link) {

    $.ajax({
        url: $api.jsSdk,
        async: false,
        type: 'POST',
        data: {
            url: url
        },
        dataType: "json",
        success: function (result) {
            wx.config({
                debug: false,
                appId: result.data.appId,
                timestamp: result.data.timestamp,
                nonceStr: result.data.noncestr,
                signature: result.data.signature,
                jsApiList: [
                    //朋友圈
                    'onMenuShareTimeline',
                    'onMenuShareQZone',
                    //分享给朋友
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });

            wx.ready(function () {
                console.log(1);
                wx.checkJsApi({
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareQZone',
                        //分享给朋友
                        'onMenuShareAppMessage',
                        'onMenuShareQQ'
                    ],
                    success: function (res) {
                        console.log(res);
                    },
                    error: function (res) {
                        console.log(res);
                    }
                });

                // 分享给朋友
                wx.onMenuShareAppMessage({
                    title: name,
                    desc: desc,
                    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    link: link,
                    imgUrl: imgUrl,
                    type: '',
                    dataUrl: '',
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户确认分享后执行的回调函数
                    }
                });
                // 分享到朋友圈
                wx.onMenuShareTimeline({
                    title: name,
                    link: link,
                    imgUrl: imgUrl,
                    success: function () {
                        // 用户确认分享后执行的回调函数

                    }, cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                // 分享到QQ
                wx.onMenuShareQQ({
                    title: name,
                    link: link,
                    imgUrl: imgUrl,
                    desc: desc,
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                // 分享到QQ空间
                wx.onMenuShareQZone({
                    title: name,
                    link: link,
                    imgUrl: imgUrl,
                    desc: desc,
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        },
        error: function (result) {
            console.log(result);
        }
    });
}