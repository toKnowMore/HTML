/**
 * API
 */
const host = 'https://snippet.yuzhilai.com';
//const host1 = 'http://www.yuzhilai.com';
//const host2 = "http://snippet.nat123.net";
const context = '/yuzhilai_plus_1.2.2';
const content = '/yuzhilaiWx';

const $api = {
    course_details: host + context + '/details/course2.do',//课程
    event_details: host + context + '/details/event.do',
    //专辑
    album_details: host + context + '/details/album2.do',

    jsSdk: host + content + '/user/jsSdkConfig.do',

    download: "http://android.myapp.com/myapp/detail.htm?apkName=com.sharker&ADTAG=mobile"
};

function formatSeconds(s) {
    var t;
    if(s > 0) {
        var timelength;
        var hour = Math.floor(s / 3600);
        if(hour < 10) {
            hour = '0' + hour;
        }
        var min = Math.floor((s - hour * 3600) / 60);
        if(min < 10) {
            min = "0" + min;
        }
        var sec = parseInt((s - hour * 3600) % 60);
        if(sec < 10) {
            sec = "0" + sec;
        }
        if(hour < 1) {
            timelength = min + ":" + sec;
        } else {
            timelength = hour + ":" + min + ":" + sec;
        }
        if(s > 0) {
            return timelength;
        }
    }
    return t;
}


