/**
 * Created by haams on 2017-08-12.
 */
var express = require("express");
var router = express.Router();
var Fcm = require("fcm-node");
var serverKey = "AAAAkNmJaXU:APA91bE0QYvaSD-yXIR0BfYETtD9WRfve90kgAn9LP5LZtEOW0n5hwOVOs2oP9bc5tcHD9czK_oUl3lKYC0AVuPxj432LQJry7Q4kGOfrEv1G5KUmuy_WgF5Yev4hDYuUvX1B9t9hnIq";

var fcm = new Fcm(serverKey);

module.exports = function (router,path, callback) {
    var message = {
        "to": "cKSgvj1FDN4:APA91bHeBUZ4sWsHGYrslyFU2lowTt4115fxXvQkaIAoTdo8C0sMZQ0j4lVfkUqtEXksHo5IPlKhQfS8vSftCmcQ60xm8ZIARTxhL9_DXIpWPbmoOR6J_szIU1odcRrjL3dJBv5iu5jl",
        "notification": {
            "body": "사용자의 맥박 상태가 고르지 못합니다. 빠른 조치를 위해 앱을 실행 시켜 주세요.",
            "title": "위험 상황 입니다!!"
        },
        "data": {
            "name": "haams",
            "body": "great!"
        }
    };

    router.post("/push/message", function (req, res, next) {
        fcm.send(message, function (err, response) {
            if (err) console.log("메세지 전송 실패");
            else console.log("메세지 전송 성공");
        })
    });

};

