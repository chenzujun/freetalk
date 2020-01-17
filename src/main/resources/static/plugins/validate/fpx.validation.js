/**
 * 验证框架消息中文化
 */
jQuery.extend(jQuery.validator.messages, {
    required: "必选字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: jQuery.validator.format("字符串的长度不能超过{0}个字符"),
    minlength: jQuery.validator.format("字符串的长度不能少于 {0}个字符"),
    rangelength: jQuery.validator.format("请输入一个长度介于{0}和 {1}之间的字符串"),
    range: jQuery.validator.format("请输入一个介于{0}和{1}之间的值"),
    max: jQuery.validator.format("请输入一个最大为{0}的值"),
    min: jQuery.validator.format("请输入一个最小为{0}的值")
});


/**
 * crator: huanggh 2014-03-24
 * 使用气泡显示错误提示内容
 */
$(function () {
    if ($.validator) {
        // 错误信息缓存常量名
        var FIELDMSG = 'ce-field-msg';

        // 有错误则显示错误内容
        var showErrorTip = function (element) {
            var $e = element.jquery ? element : $(element);
            var $target = $e;
            var errorMsg = $e.data(FIELDMSG);

            // 调整选择框错误显示的位置
            if ($e.is('select.ce-s2-rendered')) {
                $target = $e.prev('div.ce-s2-rendered');
            }

            // 重设表单校验，使用 validation.resetForm 后，无法销毁 FIELDMSG，故如果没有错误样式也不进行提示
            if ($e.hasClass('ce-valid-error') && !!errorMsg) {
                CE.TipValidation({
                    text: errorMsg,
                    element: $e,
                    position: "top-right",
                    target: $target
                });
            }
        };

        // 对 select2 进行校验
        $('body').on('select2-focus', 'select.ce-s2-rendered.ce-valid-error', function (e) {
            // 获得焦点时，有错误则显示错误提示
            showErrorTip(this);
        }).on('select2-blur', 'select.ce-s2-rendered.ce-valid-error', function (e) {
            var $e = $(this);

            // 销毁气泡
            CE.TipDestroy($e);
        }).on('change', 'form select.ce-s2-rendered', function (e) {
            var $this = $(this);

            $this.valid();

            $this.trigger('select2-focus');
        });

        $.validator.setDefaults({
            /**
             *  使用 qtip2 气泡提示
             *  有错误的，输入框变成红色，获得焦点时，气泡提示；失去焦点时，气泡销毁
             */
            errorPlacement: function (error, element) {
                var $e = $(element);
                var errorMsg = error.html();

                $e.data(FIELDMSG, errorMsg);
            },
            errorClass: 'ce-valid-error',
            success: function (label, element) {
                var $e = $(element);

                // 移除错误内容
                $e.removeData(FIELDMSG);

                // 销毁气泡
                CE.TipDestroy($e);
            },
            onfocusin: function (element, event) {
                // 获得焦点时，有错误则显示错误提示
                showErrorTip(element);
            },
            onfocusout: function (element, event) {
                var $e = $(element);

                // 失去焦点时，进行校验，错误或者正确有相应的方法更改边框
                var validSuccess = $e.valid();

                // 销毁气泡
                CE.TipDestroy($e);
            },
            onkeyup: function (element, event) {
                // 键盘按起时，有错误则显示错误提示
                var $e = $(element);
                $e.valid();
                showErrorTip(element);
            }
        });

        // 身份证号码验证
        /*$.validator.addMethod("isIdCardNo", function(value, element) {
            //return this.optional(element) || isIdCardNo(value);
            debugger;
            return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
        }, "请正确输入您的身份证号码");   */


        //过滤特殊字符
        $.validator.addMethod("isSpecialCharacters", function (value, element) {
//			var specialCharacters = /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@#$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,19}$/; 
            var specialCharacters = /^[^`~!@#\$%^&\*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@#$%^&()+=|\\\][\]\{\}:;'\,.<>?]*$/;
            return this.optional(element) || (specialCharacters.test(value));
        }, "不允许输入特殊字符！");

        /**
         * 校验最大值
         */
        $.validator.addMethod('checkMaxValue', function (value, element, arg) {
            var inputValue = parseFloat(value)
            var checkValue = parseFloat(arg)
            if (inputValue > checkValue) {
                return false;
            }
            return true;
        }, "超出最大值范围！");


        /**
         * 校验空格
         */
        $.validator.addMethod('checkBlank', function (value, element) {
            if (value.indexOf(" ") >= 0) {
                return false;
            }
            return true;
        }, "内容不能包含空格！");

        /**
         * 小数校验校验
         */
        $.validator.addMethod('positiveNumber', function (value, element, arg) {
            if (!value) {
                return true;
            }

            var reg = new RegExp("^\\d+(\\.\\d{1," + arg + "})?$");
            return reg.test(value);
        }, "请输入数字,且只能保留{0}位小数！");

        /**
         // 手机号码验证
         $.validator.addMethod("isMobile", function(value, element) {
		    var length = value.length;     
		    var mobile = /^((1[0-9]{1})+\d{1,9})$/;     
		    return this.optional(element) || (length == 11 && mobile.test(value));         
		}, "请正确填写您的手机号码");
         */

        // 手机号码验证
        $.validator.addMethod("isMobile", function (value, element) {
            var length = value.length;
            var mobile = /^((1[0-9]{1})+\d{1,9})$/;
            return this.optional(element) || (mobile.test(value));
        }, "请正确填写您的手机号码");

        // 电话号码验证
        $.validator.addMethod("isTel", function (value, element) {
            var tel = /^((\(\d{3,4}\))|\d{3,4})-?[0-9 ]{7,10}$/;//电话号码格式010-12345678
            return this.optional(element) || (tel.test(value));
        }, "请正确填写您的电话号码");

        // 邮政编码验证
        jQuery.validator.addMethod("isZipCode", function (value, element) {
            var tel = /^[0-9]{6}$/;
            return this.optional(element) || (tel.test(value));
        }, "请正确填写您的邮政编码");

        //上传箱唛校验
        jQuery.validator.addMethod("isUploadBox", function (value, element) {
            var num = $("#upload-box").children().length;
            if (num > 1) {
                return true;
            } else {
                return false;
            }
        }, "请上传箱唛");

        // 验证值必须大于特定值(不能等于)
        jQuery.validator.addMethod("gt", function (value, element, param) {
            return value > param;
        }, $.validator.format("输入值必须大于{0}!"));


        /**
         * 只能输入英文、数字和空格
         */
        $.validator.addMethod('onlyLetterNumberSp', function (value, element, arg) {
            if (!value) {
                return true;
            }

            return /^[a-zA-Z0-9\s]+$/.test(value);
        }, "您所输入的内容包含了非法字符(该输入框仅支持英文、数字和空格)");

        /**
         * 只能输入英文、数字
         */
        $.validator.addMethod('onlyLetterNumber', function (value, element, arg) {
            if (!value) {
                return true;
            }
            return /^[a-zA-Z0-9]+$/.test(value);
        }, "您所输入的内容包含了非法字符(该输入框仅支持英文、数字)");

        /**
         * 只能输入英文、数字和横线
         */
        $.validator.addMethod('onlyLetterNumberLine', function (value, element, arg) {
            if (!value) {
                return true;
            }
            return /^[a-zA-Z0-9/-]+$/.test(value);
        }, "您所输入的内容包含了非法字符(该输入框仅支持英文、数字和横线)");

        /**
         * 小数位校验
         */
        $.validator.addMethod('accuracy', function (value, element, arg) {
            if (!value) {
                return true;
            }

            var reg = new RegExp("^\\d+(\.\\d{1," + arg + "})?$");

            return reg.test(value);
        }, "该输入框最多只能保留小数后{0}位");


        $.validator.addMethod('variationSKU', function (value, element, arg) {
            if (!value) {
                return true;
            }
            var i = 0;
            var listingSKU = $('#skuInput').val();
            if (value === listingSKU) {
                i++;
            }
            var $variationGrid = $('#variationGrid');
            if ($variationGrid) {
                $variationGrid.find(".ce-tbody .ce-tr .ce-td .input-sku").each(function () {
                    var currentValue = $(this).val();
                    if (currentValue && currentValue === value) {
                        i++;
                    }
                });
            }
            return i < 2;
        }, "SKU不能重复");


        $.validator.addMethod('listingSKU', function (value, element, arg) {
            if (!value) {
                return true;
            }
            var valid = true;
            var $variationGrid = $('#variationGrid');
            if ($variationGrid && $variationGrid.is(':visible')) {
                $variationGrid.find(".ce-tbody .ce-tr .ce-td .input-sku").each(function () {
                    var currentValue = $(this).val();
                    if (currentValue && currentValue === value) {
                        valid = false;
                    }
                });
            }
            return valid;
        }, "SKU不能重复");

        /**
         * 验证不能重复
         */
        $.validator.addMethod('noEqualTo', function (value, element, arg) {
            if (!value || !$.isArray(arg)) {
                return true;
            }
            for (var i = 0; i < arg.length; i++) {
                if (value == arg[i]) {
                    return false;
                }
            }

            return true;
        }, "不能有重复值");


        /**
         * 验证收货人姓名是否合法
         */
        $.validator.addMethod('legalName', function (value, element, arg) {
            var strFormat = /(?!.*先生.*|.*小姐.*|.*男士.*|.*女士.*|.*太太.*|.*R.*|.*S.*)^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/;
            return this.optional(element) || strFormat.test(value);
        }, "必须是中文字符可以包含·，不包含先生,小姐,女士,男士,R,S");

        /**
         * 不能含先生、小姐、女士、男士
         */
        $.validator.addMethod('legalName2', function (value, element, arg) {
            var strFormat = /(?!.*先生|.*小姐|.*男士|.*女士)^.*$/;
            return this.optional(element) || strFormat.test(value);
        }, " 不能含先生、小姐、男士、女士");

        /*$.validator.addMethod('legalAddr', function(value, element, arg) {
            var strFormat = /(?!.*省.*|.*市.*|.*区.*).{60}|^s*$/g;
            return this.optional(element) || !strFormat.test(value);
        }, "不能含有省，市，区文字，不能超过120个字符");*/

        /**
         * 日期格式
         */
        $.validator.addMethod('dateFormat', function (value, element, arg) {
            var dateFormat = /^([1-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9]) ([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/;
            if (value) {
                if (dateFormat.test(value)) {
                    if ((parseInt(RegExp.$2) < 13) && (0 < parseInt(RegExp.$2)) && (parseInt(RegExp.$3) < 32) && (parseInt(RegExp.$3) > 0)
                        && (parseInt(RegExp.$4) < 24) && (parseInt(RegExp.$5) < 60) && (parseInt(RegExp.$6) < 60)) {
                        return true;
                    }
                }
                return false;
            }
            return true;

        }, "日期格式不正确");

        /**
         * 正整数
         */
        $.validator.addMethod('positiveInteger', function (value, element, params) {
            return this.optional(element) || /^\+?[1-9][0-9]*$/.test(value);
        }, "请填写正整数！");
        /**
         * 正整数, 包括0
         */
        $.validator.addMethod('positiveIntegerIncludeZero', function (value, element, params) {
            return this.optional(element) || /^\+?(0|([1-9][0-9]*))$/.test(value);
        }, "请输入合法正整数(包含0)");

        /**
         * 正整数, 包括0
         */
        $.validator.addMethod('isExcelFile', function (value, element, params) {
            return this.optional(element) || /^.*\.(?:xls|xlsx)$/.test(value);
        }, "请输入excel文件");
        /**
         * 浮点数,整数5位，小数2位
         */
        $.validator.addMethod("decimal", function (value, element, params) {
            if (0 == value) {
                return false;
            }
            var decimal = /^\d{1,5}(\.\d{1,3})?$/;
            return this.optional(element) || decimal.test(value);
        }, "数字范围整数最长5位，小数3位");

        $.validator.addMethod("require_from_group", function (value, element, options) {
            var $fields = $(options[1], element.form),
                $fieldsFirst = $fields.eq(0),
                validator = $fieldsFirst.data("valid_req_grp") ? $fieldsFirst.data("valid_req_grp") : $.extend({}, this),
                isValid = $fields.filter(function () {
                    return validator.elementValue(this);
                }).length >= options[0];

            // Store the cloned validator for future validation
            $fieldsFirst.data("valid_req_grp", validator);

            // If element isn't being validated, run each require_from_group field's validation rules
            if (!$(element).data("being_validated")) {
                $fields.data("being_validated", true);
                $fields.each(function () {
                    validator.element(this);
                });
                $fields.data("being_validated", false);
            }
            return isValid;
        }, $.validator.format("Please fill at least {0} of these fields."));

        $.validator.addMethod('aeVariationStockQty', function (value, element, arg) {
            var total = 0;
            $("#ce-attr-container").find(':text[data-ae-type="ipmSkuStock"]').each(function () {
                total = total + parseInt($(this).val() || 0);
            });
            return total >= 1 && total < 999999;
        }, "总数量必须要在1~999999之间");

    }
});