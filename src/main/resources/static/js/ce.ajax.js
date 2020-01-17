/*
 * Copyright (c) 2005-2018.  FPX and/or its affiliates. All rights reserved.
 * Use, Copy is subject to authorized license.
 */

$(function () {
    /**
     * CE.ajax
     *
     * 根据现有业务改写 ajax 方法：
     * 1、接收数据默认为 json，返回 html 时需要另外指定(便于后端确定返回 json 或者 html)
     * 2、禁用 ajax 的 success/error/complete 方法，提倡使用 derferred 的 done/fail/then
     */
    CE.ajax = function (url, options) {
        // 默认设置
        var defaultOption = {
            dataType: 'json',			// 默认服务器返回的数据类型为 json，如果返回 html 则需要进行设置
            autoUnblockUI: true,		// 自动去遮罩(使用 $.when 的时候应设置为 false)
            errorHandler: true,			// 对返回 ResposeMessage 出现Error时，进行处理
            failHandler: true,			// 对请求异常时，进行处理
            cache: false,
            beforeSend: function () {
                createLoading();//ajax请求之前，创建loading层
            },
            complete: function () {
                destroyLoading();//ajax请求之后,无论是成功还是失败，都要销毁loading层
            }
        };

        // url 可为空
        if (typeof url === 'object') {
            options = url;
            url = undefined;
        }

        options = options || {};

        // 限制使用 success/error/complete
        if ($.isFunction(options.success)) {
            throw new Error('Please use done of Deferred');
        }

        if ($.isFunction(options.error)) {
            throw new Error('Please use fail of Deferred');
        }

        if ($.isFunction(options.complete)) {
            throw new Error('Please use always of Deferred');
        }

        options.url = url || options.url;

        // 如果是 json 对象，则更改默认发送内容类型
        var param = options.data;
        var contentType = options.contentType;
        if (!contentType && (typeof param === 'object' || typeof param === 'array')) {
            defaultOption.contentType = 'application/json; charset=utf-8';
            options.data = JSON.stringify(param);
        }

        // 用户定义参数覆盖默认设置
        var opt = $.extend({}, defaultOption, options);

        // 进行方法的拦截处理
        var ajax = $.ajax(opt)
            .always(function () {
                // 如果存在遮罩的方法，则去除遮罩
                if (opt.autoUnblockUI && CE.unblockUI) {
                    CE.unblockUI();
                }
            }).done(function (data, textStatus, jqXHR) {
                try {
                    //通过XMLHttpRequest取得响应头，sessionstatus，  
                    var sessionstatus = jqXHR.getResponseHeader("sessionstatus");
                    if (sessionstatus == "timeout") {
                        var redirectURL = jqXHR.getResponseHeader("redirectURL");
                        // 如果超时跳转指定的页面
                        window.location = redirectURL;
                    }
                } catch (e) {
                    console.log(e);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                // 异常时，统一提供系统异常的提示，如果是中断请求则不用进行提示(比如 ajax 刷新页面)
                //对于返回的消息格式解析不了不弹框提示，主要针对401，session过期
                if ((jqXHR.readyState >= 2) && (opt.failHandler) && ('parsererror' !== textStatus) && (jqXHR.status !== 404)) {
                    alert('抱歉！出错啦。请稍后重试。');
                    // CE.TipError({
                    // 	title:'提示',
                    // 	text: '抱歉！出错啦。'
                    // });
                }
            }).done(function (data, textStatus, jqXHR) {
                // 异常时，统一提供系统异常的提示
                if (opt.errorHandler && data.hasError) {
                    alert('请求出错。错误代码：' + data.message);
                    // CE.TipError({
                    // 	title: '提示',
                    // 	text: data.failureString
                    // });
                }
            });

        return ajax;
    };

    /**
     * CE.post/CE.get
     * 根据改写的 ajax 方法重写 post 和 get
     */
    $.each(["get", "post"], function (i, method) {
        CE[method] = function (url, data, callback, type) {
            if ($.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return CE.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data
            }).done(callback);
        };
    });

    /**
     * loadHTML 的改写
     * data 可以为空，也就是无参数时，直接调用 CE.loadHTML(url, callback)
     */
    CE.loadHTML = function (url, data, callback) {
        if ($.isFunction(data)) {
            callback = data;
            data = undefined;
        }

        return CE.ajax({
            'type': 'POST',
            'url': url,
            'data': data,
            'dataType': 'html'
        }).done(callback || $.noop());
    };

    /**
     *  把表单序列化为 json 对象
     */
    CE.formToJson = function (form) {
        var $form = form.jquery ? form : $(form);

        var array = $form.serializeArray();

        return formArrayToJson(array);
    };

    var formArrayToJson = function (arr) {
        var listReg = /\[\d{1,3}\]$/ig;
        var bracketReg = /\[\d{1,3}\]/i;
        var realObj = {};

        $.each(arr, function (index, ele) {
            var pName = '';
            var value = '';
            if (typeof ele == "string") {
                pName = ele;
                value = ele;
            }
            if (typeof ele == "object") {
                pName = ele.name;
                value = ele.value;
            }

            //名称是否包含"."
            var pointPos = pName.indexOf(".");
            if (pointPos >= 0 && !pName.match(/\.$/)) {
                var objsArray = pName.split(".");
                iterateObj(realObj, objsArray, value);
            } else {
                //如果最后元素也是已[1]结尾，则认为是string数组。
                if (this.name.match(listReg)) {
                    //如果匹配含有favor[1]类似名称，则表示下级是数组
                    var thisName = this.name.replace(bracketReg, "");

                    if (!realObj[thisName]) {
                        realObj[thisName] = [];
                    }
                    realObj[thisName].push(this.value || '');
                } else {
                    //如果是拆分的名称数组中最后一个元素，则认为是对象的属性，不再拆分。
                    // modify:huanggh 2013-03-27 对应 checkbox，存在同一个 name，需要自动封装成数组
                    if (realObj[this.name]) {
                        if ($.isArray(realObj[this.name])) {
                            realObj[this.name].push(this.value);
                        } else {
                            realObj[this.name] = [realObj[this.name], this.value];
                        }
                    } else {
                        realObj[this.name] = this.value || '';
                    }
                }
            }
        });
        return realObj;
    };

    var iterateObj = function (obj, objsArray, pageValue) {
        //寻找使用[0].abc模式的名称，这种属性需要组成list形式
        var listReg = /\[\d{1,3}\]$/ig;
        var bracketReg = /\[\d{1,3}\]/i;

        var arrLen = objsArray.length;
        $.each(objsArray, function (i, v) {
            if (i < arrLen - 1) {
                var nextEleName = objsArray[i + 1];
                var ele = {};
                if (nextEleName.match(listReg)) {
                    nextEleName = nextEleName.replace(bracketReg, "");
                }
                ele[nextEleName] = {};

                if (v.match(listReg)) {
                    var idxStr = v.match(listReg)[0].replace(/\[/ig, "").replace(/\]/ig, "");
                    var idx = parseInt(idxStr);
                    //如果匹配含有favor[1]类似名称，则表示下级是数组
                    v = v.replace(bracketReg, "");
                    if (obj[v]) {
                        if (obj[v][idx]) {
                            ele[nextEleName] = obj[v][idx];
                        } else {
                            obj[v][idx] = ele[nextEleName];
                        }
                    } else {
                        obj[v] = [];
                        obj[v][idx] = ele[nextEleName];
                    }
                } else {
                    if (!obj[v]) {
                        obj[v] = ele[nextEleName];
                    } else {
                        ele[nextEleName] = obj[v];
                    }
                }
                objsArray.shift();
                ele[nextEleName] = iterateObj(ele[nextEleName], objsArray, pageValue);
                return false;
            } else {
                //如果最后元素也是已[1]结尾，则认为是string数组。
                if (v.match(listReg)) {
                    //如果匹配含有favor[1]类似名称，则表示下级是数组
                    v = v.replace(bracketReg, "");
                    if (!obj[v]) {
                        obj[v] = [];
                    }
                    obj[v].push(pageValue || '');
                } else {
                    //如果是拆分的名称数组中最后一个元素，则认为是对象的属性，不再拆分。
                    // modify:huanggh 2013-03-27 对应 checkbox，存在同一个 name，需要自动封装成数组
                    if (obj[v]) {
                        if ($.isArray(obj[v])) {
                            obj[v].push(pageValue);
                        } else {
                            obj[v] = [obj[v], pageValue];
                        }
                    } else {
                        obj[v] = pageValue || '';
                    }
                }
                return false;
            }
        });

        return obj;
    };

    //创建loading层
    var createLoading = function () {
        if ($(".loadbg").length < 1) {
            var str = '<div class="loadbg" class="background"><div class="progressBar"></div></div>';
            $("body").append(str);
        }
    };

    //销毁loading层
    var destroyLoading = function () {
        $(".loadbg").remove();
    };
});