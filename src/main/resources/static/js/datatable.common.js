(function ($, window, undefined) {
    var locale = getCookie("lang");
    locale = !locale || locale == 'null' ? 'zh_CN' : locale;
    console.info(locale)
    if (locale == 'CN' || locale == 'zh' || locale == 'zh_CN') {
        $.extend($.fn.dataTable.defaults, {
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "每页 _MENU_ 项",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "当前显示第 _START_ 至 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoEmpty": "",
                "sInfoFiltered": "",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "加载中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页",
                    "sJump": "跳转"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            autoWidth: false,   // 禁用自动调整列宽
            stripeClasses: ["odd", "even"],// 为奇偶行加上样式，兼容不支持CSS伪类的场合
            searching: false,    // 禁用原生搜索

            ordering: false,
            pageLength: 10,
            processing: true,
            lengthChange: false
        });
        $.fn.dataTable.ext.errMode = function (settings, tn, msg) {
            console.warn(msg);

            UED.Noty.error('表格数据加载失败!');
        }
    } else if (locale == 'en') {
        $.extend($.fn.dataTable.defaults, {
            language: {
                "sProcessing": "Deal...",
                "sLengthMenu": "Each page _MENU_ item",
                "sZeroRecords": "There is no matching result",
                "sInfo": "Currently displayed from _START_ to _END_ item，total _TOTAL_ records",
                "sInfoEmpty": "",
                "sInfoFiltered": "",
                "sInfoPostFix": "",
                "sSearch": "search:",
                "sUrl": "",
                "sEmptyTable": "The data in the table is empty",
                "sLoadingRecords": "Loading...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "Home page",
                    "sPrevious": "Page up",
                    "sNext": "Page down",
                    "sLast": "Last page",
                    "sJump": "Skip"
                },
                "oAria": {
                    "sSortAscending": ": Arrange this column in ascending order",
                    "sSortDescending": ": Arrange this column in descending order"
                }
            },
            autoWidth: false,   // 禁用自动调整列宽
            stripeClasses: ["odd", "even"],// 为奇偶行加上样式，兼容不支持CSS伪类的场合
            searching: false,    // 禁用原生搜索

            ordering: false,
            pageLength: 10,
            processing: true,
            lengthChange: false
        });
        $.fn.dataTable.ext.errMode = function (settings, tn, msg) {
            console.warn(msg);

            UED.Noty.error('Table load failed!');
        }
    }
})(jQuery, window);