$(function () {
    // 定义CE命名空间
    CE = window.CE || {};

    // FIXME(huanggh 20140805) life 和 persistent 考虑是否合并为 lift，为 0 或者 -1 时，代表不自动消失
    var defaultOptions = {
        // ceTip标题
        title: null,
        // ceTip内容
        text: null,
        // 去掉ceTip默认的三角箭头
        tip: false,
        button: false,
        // 是否启用jQuery UI的样式，以实现Theme Roller，将覆盖默认样式
        widget: false,
        // ceTip在life毫秒后自动消除
        life: 1500,
        // 是否自动消失，该属性设置后将覆盖life属性
        persistent: true,
        // ceTip的风格
        classes: '',
        // ceTip的类型, 0:成功; 1:失败; 2:信息; 该属性将对classes, widget产生覆盖效果
        type: null
    };

    CE.Tip = function (tipOptions) {
        var _tipOptions = $.extend({}, defaultOptions, tipOptions);
        var _privateOptions = {};
        try {
            var x = $(window).width();
            var y = $(window).height();
            if (_tipOptions.type != null) {
                _privateOptions.left = x - 20;
                _privateOptions.top = y - 20;
                _privateOptions.my = 'bottom right';

                switch (_tipOptions.type) {
                    case 0:
                        _tipOptions.classes = 'ce-qtip ce-qtip-success';
                        break;
                    case 1:
                        _tipOptions.classes = 'ce-qtip ce-qtip-error';
                        break;
                    case 2:
                        _tipOptions.classes = 'ce-qtip ce-qtip-info';
                        break;
                    case 3:
                        _tipOptions.classes = 'ce-qtip ce-qtip-warning';
                        break;
                    default:
                        _tipOptions.classes = 'ce-qtip ce-qtip-info';
                }
            }

            var $tip = $('<div class="ce-tip-panel"></div>');

            $tip.qtip({
                content: {
                    text: _tipOptions.text,
                    title: {
                        text: _tipOptions.title || ' ',
                        button: _tipOptions.button
                    }
                },
                style: {
                    tip: _tipOptions.tip,
                    classes: _tipOptions.classes,
                    widget: _tipOptions.widget
                },
                position: {
                    // 指定ceTip箭头出现的位置，它的位置决定了ceTip的位置，所以指定它为center后，再隐藏它可以令它居中
                    my: _privateOptions.my,
                    target: [_privateOptions.left, _privateOptions.top],
                    container: _tipOptions.container || $(document.body)
                },
                show: {
                    event: false,
                    ready: true,
                    effect: function () {
                        $(this).stop(0, 1).animate({
                            height: 'toggle'
                        }, 400, 'swing');
                    },
                    delay: 0,
                    persistent: _tipOptions.persistent
                },
                hide: {
                    event: false,
                    inactive: 3000,
                    effect: function (api) {
                        $(this).stop(0, 1).animate({
                            height: 'toggle'
                        }, 400, 'swing');
                    }
                },
                events: {
                    render: function (event, api) {
                        if (!api.options.show.persistent) {
                            $(this).bind('mouseover mouseout', function (e) {
                                // 自动消失的时间延迟
                                var life = _tipOptions.life;
                                clearTimeout(api.timer);
                                if (e.type !== 'mouseover') {
                                    api.timer = setTimeout(function () {
                                        api.destroy(e);
                                    }, life);
                                }
                            }).triggerHandler('mouseout');
                        }
                    }
                }
            });
        } catch (e) {
            throw new Error('显示提示内容出错！');
        }
    };

    /**
     *  arguments :
     *  1) options
     *  2) title, text, delay
     *
     */
    var _obtainOptionsByArguments = function (title, text, delay) {
        var tipOptions;
        if (typeof title === 'object') {
            return title;
        } else {
            if (typeof title !== 'string') {
                title = '操作提示';
            }
            if (typeof text !== 'string') {
                text = '操作成功';
            }
            var options = {
                title: title,
                text: text
            };
            if ($.isNumeric(delay)) {
                options.life = delay;
            }
            return options;
        }
    };
    // 基于CE.Tip制作的操作成功类型的提示信息
    var successTipOptions = {
        title: null,
        text: null,
        type: 0,
        button: true,
        container: $('#ce-qtip-error-container')
    };
    CE.TipSuccess = function (/* see _obtainOptionsByArguments */) {
        var options = _obtainOptionsByArguments.apply(this, arguments);
        var _tipOptions = $.extend({}, successTipOptions, options);
        CE.Tip(_tipOptions);
    };

    // 基于CE.Tip制作的操作失败类型的提示信息
    var errorTipOptions = {
        title: null,
        text: null,
        type: 1,
        persistent: true,
        button: true,
        container: $('#ce-qtip-error-container')
    };
    CE.TipError = function (/* see _obtainOptionsByArguments */) {
        var options = _obtainOptionsByArguments.apply(this, arguments);
        var _tipOptions = $.extend({}, errorTipOptions, options);
        CE.Tip(_tipOptions);
    };

    // 基于CE.Tip制作的信息类型的提示信息
    var infoTipOptions = {
        title: null,
        text: null,
        life: 2000,
        type: 2,
        button: true,
        container: $('#ce-qtip-error-container')
    };
    CE.TipInfo = function (/* see _obtainOptionsByArguments */) {
        var options = _obtainOptionsByArguments.apply(this, arguments);
        var _tipOptions = $.extend({}, infoTipOptions, options);
        CE.Tip(_tipOptions);
    };

    // 基于CE.Tip制作的警告类型的提示信息
    var warningTipOptions = {
        title: null,
        text: null,
        life: 2000,
        type: 3,
        button: true,
        container: $('#ce-qtip-error-container')
    };
    CE.TipWarning = function (/* see _obtainOptionsByArguments */) {
        var options = _obtainOptionsByArguments.apply(this, arguments);
        var _tipOptions = $.extend({}, warningTipOptions, options);
        CE.Tip(_tipOptions);
    };

    // 校验提示信息
    CE.TipValidation = function (options) {
        var id = options.id;
        var text = options.text;
        var target = options.target || element;
        var element = options.element;
        var position = options.position;
        var tipPosition = {
            my: "left center",
            at: "center right",
            target: target
        };

        if (position == "top") {
            tipPosition = {
                my: "bottom left",
                at: "top right",
                target: target
            };
        }

        if (position == "top-right") {
            tipPosition = {
                my: "bottom right",
                at: "top right",
                target: target
            };
        }

        element.qtip({
            id: id,									// 设置 ID，方便进行销毁
            show: true,								// 默认显示
            hide: false,							// 默认不隐藏
            overwrite: false,						// 手工销毁，无需自动删除上一次的提示
            position: tipPosition,					// 气泡位置
            style: {								// 气泡主题样式
                classes: "qtip-bootstrap"
            },
            content: text							// 提示内容
        });
    };

    CE.TipDestroy = function (element) {
        element.qtip('destroy');
    };

    CE.TipReposition = function (element) {
        element.qtip('reposition');
    };

});