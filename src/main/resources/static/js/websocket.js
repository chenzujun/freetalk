/*
 * Copyright (c) 2005-2018.  FPX and/or its affiliates. All rights reserved.
 * Use, Copy is subject to authorized license.
 */

(function (window) {

    var socket_url = 'ws://127.0.0.1:9187/AgentServcie?AppKey=000001';
    var websocket = window.websocket = {

        //发送信息打印
        send: function (message, callback) {
            this.message = message;
            this.callback = callback;

            if (!this.socket) {
                this.socket = this.createWebsocket(message.appkey);
                this.bindSocketEvent();
            } else if (this.socket.readyState === 1) {
                var result = this.socket.send(JSON.stringify(message));
            } else {// socket 连接失败
                layer.msg('socket 连接失败', {
                    skin: 'layui-msg-error',
                    closeBtn: 1,
                    time: 2000
                });
            }
        },

        //创建WebSocket
        createWebsocket: function () {
            return new WebSocket(socket_url);
        },

        //为WebSocket绑定事件
        bindSocketEvent: function () {
            var that = this;
            this.socket.onopen = function () {
                that.socket.send(JSON.stringify(that.message));
            };
            this.socket.onmessage = function (event) {
                var data = JSON.parse(event.data);
                if (data.Success == true) {
                    that.callback(data);
                } else {
                    layer.msg(data.Msg, {
                        skin: 'layui-msg-error',
                        closeBtn: 1,
                        time: 2000
                    });
                }
            };
            this.socket.onerror = function (e) {
                layer.msg('socket 连接失败' + e, {
                    skin: 'layui-msg-error',
                    closeBtn: 1,
                    time: 2000
                });
            }
        }
    };

})(window);