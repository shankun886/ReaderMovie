var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{}
  },
  //获取数据2种api：RESTFUL API 大部分数据json，什么都可以返回
  //SOAP xml
  onLoad: function (e) {
    //+"?start=0&count=3"   豆瓣API截取前三条数据
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"+"?start=4&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250"+"?start=6&count=3";
    this.getMovieListData(inTheatersUrl,"inTheaters");
    this.getMovieListData(comingSoonUrl,"comingSoon");
    this.getMovieListData(top250Url,"top250");
  },
  getMovieListData: function (url,settedKey) {
    var that = this; 
    wx.request({
      url: url,
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值之前的版本有坑，json不行换成任意内容都行
      },
      success: function (res) {
        //console.log(res);
        that.processDoubanData(res.data,settedKey);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  processDoubanData: function (moviesDouban,settedKey){
    var movies = [];
    for (var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0,6)+"...";
      }
      var temp = {
        title:title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.converToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
    //动态绑定三个列表的值。对readyData的3个属性赋值
    var readyData = {};
    //readyData[settedKey] = movies;
    //解决movie-list-template.wxml下通过movies绑定inTheaters  comingSoon  top250三个不同值
    readyData[settedKey] = {
      movies: movies
    };
    this.setData(readyData);
    console.log(this.data);
  }
    //    wx.request({
    //      url: 'http://t.yushu.im/v2/movie/top250',
    //      header: {
    //        'content-type': 'application/json' // 默认值之前的版本有坑，json不行换成任意内容都行
    //      },
    //      data:{},
    //      method:"GET", //OPTIONS,GET,POST,HEAD,PUT,DELETE,TRACE,CONNECT
    //      success: function (res) {
    //        console.log(res)
    //      }
    //    })
    //  
  }) 