/*
 * Copyright (c) 2005-2017.  FPX and/or its affiliates. All rights reserved.
 * Use, Copy is subject to authorized license.
 */

(function ($) {
    //定义全局变量用于保存点击左侧菜单选中项
    var sessionStorage = window.sessionStorage || {};

    //左侧菜单高亮选中
    $(".sidebar-menu").on("click", ".treeview-menu li", function () {
        var pathName = $(this).find("a").attr("href");    //取得当前选中项的href
        sessionStorage.setItem("pathName", pathName);   //保存在sessionStorage中
    });


    window.onload = function () {
        var pathName = sessionStorage.pathName;
        if (pathName) {
            $('.sidebar-menu').find('li.leafnode > a').each(function () {
                var $this = $(this);
                var href = $this.attr('href');
                if (pathName.indexOf(href) >= 0) {
                    $this.closest('li').addClass('active').siblings().removeClass('active');
                    $this.closest('li.treeview').addClass('active').siblings().removeClass('active');
                }
            });
        }
    }
    COMMON = window.COMMON || {};

    COMMON.getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    };

    //扩展Date的format方法
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    /**
     *转换日期对象为日期字符串
     * @param date 日期对象
     * @param isFull 是否为完整的日期数据,
     *               为true时, 格式如"2000-03-05 01:05:04"
     *               为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */
    function getSmpFormatDate(date, isFull) {
        var pattern = "";
        if (isFull == true || isFull == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        } else {
            pattern = "yyyy-MM-dd";
        }
        return getFormatDate(date, pattern);
    }

    /**
     *转换当前日期对象为日期字符串
     * @param date 日期对象
     * @param isFull 是否为完整的日期数据,
     *               为true时, 格式如"2000-03-05 01:05:04"
     *               为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */

    function getSmpFormatNowDate(isFull) {
        return getSmpFormatDate(new Date(), isFull);
    }

    /**
     *转换long值为日期字符串
     * @param l long值
     * @param isFull 是否为完整的日期数据,
     *               为true时, 格式如"2000-03-05 01:05:04"
     *               为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */

    function getSmpFormatDateByLong(l, isFull) {
        return getSmpFormatDate(new Date(l), isFull);
    }

    /**
     *转换long值为日期字符串
     * @param l long值
     * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
     * @return 符合要求的日期字符串
     */

    COMMON.LONGDATE = function (l, pattern) {
        return getFormatDate(new Date(l), pattern);
    }

    /**
     *转换日期对象为日期字符串
     * @param l long值
     * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
     * @return 符合要求的日期字符串
     */
    function getFormatDate(date, pattern) {
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return date.format(pattern);
    }


})(jQuery);
