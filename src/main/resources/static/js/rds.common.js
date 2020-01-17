/**
 * var time1 = new Date().Format("yyyy-MM-dd");
 * var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 初始化菜单的显示
 * @param lvlOne 一级菜单 id
 * @param lvlTwo 二级菜单 id
 * @param lvThree 三级菜单 id
 */
var MenuInit = function (lvlOne, lvlTwo, lvThree) {
    var menuUL = $('.sidebar-menu');
    menuUL.find('.active').removeClass('active'); // 先清空选中的一级菜单

    var menuOne = menuUL.find('li[id="' + lvlOne + '"]');
    var menuTwo = menuOne.find('li[id="' + lvlTwo + '"]');
    var menuThree = menuTwo.find('li[id="' + lvThree + '"]');

    menuOne.addClass('active'); // 选中指定的一级菜单
    menuOne.find('.treeview-menu').addClass('menu-open'); // 展开选中的一级菜单
    menuTwo.addClass('active'); // 激活选中的二级菜单
    menuThree.addClass('active'); // 激活选中的三级菜单
};

//初始化输入下拉框
var select2Init = function () {
    $('.select2').select2();
};

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function setCookie(name, value, time, domain, path) {
    var str = name + "=" + encodeURIComponent(value);
    if (time) {
        var date = new Date(time).toGMTString();
        str += ";expires=" + date;
    }
    str = domain ? str + ";domain=" + domain : str;
    str = path ? str + ';path=' + path : str;
    document.cookie = str;

}

//根据所选语言获取对应引用对应国际化js
(function () {
    var str = '';
    if (getCookie("lang") == '') {
        setCookie("lang", 'zh', "", "i4px.com", "/");
    }
    if (getCookie("lang") && getCookie("lang") == 'zh') {
        str += '<script id="urlLange" src="js/i18n/messages_zh_CN.js"></script>';
    } else if (getCookie("lang") && getCookie("lang") == 'en') {
        str += '<script id="urlLange" src="js/i18n/messages_en_US.js"></script>';
    } else {
        str += '<script id="urlLange" src="js/i18n/messages_zh_CN.js"></script>';
    }

    $('body').append(str);

    // 设置ajax请求完成后运行的函数,
    $.ajaxSetup({
        complete: function (ajaxResult, status) {
            // console.log(JSON.stringify(ajaxResult));
            if ("unLogin" == ajaxResult.getResponseHeader("auth-status")) {
                location.reload();
            }
        }
    });
    //设置dataTable 的ajax请求完成后运行的函数,
    $('.dataTable').on('xhr.dt', function (e, settings, json, xhr) {
        // console.log(JSON.stringify(xhr));
        if ("unLogin" == xhr.getResponseHeader("auth-status")) {
            location.reload();
        }
    });
})();