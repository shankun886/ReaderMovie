function converToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}
function http(url,callBack) {
  wx.request({
    url: url,
    method: "GET",
    header: {
      'content-type': '' // 默认值之前的版本有坑，json不行换成任意内容都行
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function () {
      console.log("fail");
    }
  })
}
module.exports = {
      converToStarsArray: converToStarsArray,
      http: http
    }