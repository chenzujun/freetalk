$(function () {
    // 加载UED-框架模块
    window.UED_FRAME.init({
        'isPreSetting': true,
        'clientName': '调度系统', // 客户端系统-名称（必传）
        'clientHomeUrl': null, // 客户端系统-主页地址
        'clientId': 'xJ8n3HAXZNFsbRj1', // 权限系统-客户端ID（必传）
        'userId': USER_ID,//USER_ID, // 当前登录用户的ID（必传）
        'contextPath': CTX, // 客户端系统-上下文路径
        'logoutUrl': '/logout',  // 客户端系统-cas退出地址(必传)
        'isInternational': false, // 客户端系统是否需要支持国家化(如果菜单需要支持国家化，那么请在权限系统中，配置好相应的菜单国际码，然后再通知组件站点配置对应的国际化资源信息)  默认值：false
        'isLoadHeader': true, //是否加载头部 默认值：true
        'isLoadMenu': true, //是否加载左菜单 默认值：true
        'menuMap': {} //某个页面的访问地址 高亮定位左菜单的关系映射，比如： /test/b.html 定位左菜单需要高亮定位到 /test/a.html的位置， 映射关系配置如下:{'/test/b.html':'/test/a.html'}
    });
});