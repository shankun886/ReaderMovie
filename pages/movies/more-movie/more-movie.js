// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    movies:{},
    navigateTitle:"",
    totalCount:0,
    requsetUrl:"",
    isEmpty:true
  },
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      navigateTitle: category
    });
    var dataUrl = "";
    //console.log(category);
    switch (category) {
      case "正在热映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.setData({
      requsetUrl: dataUrl,
    })
    util.http(dataUrl, this.processDoubanData);
  },
   onMovieTap:function(e){
    var movieId = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id='+movieId
    })
  },
  onReachBottom: function(e){
    var nextUrl = this.data.requsetUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading()
  },
  onPullDownRefresh:function(e){
    var refreshUrl = this.data.requsetUrl + "?start=0&count=20";
    this.setData({
      movies:{},
      isEmpty:true,
      totalCount:0
    })
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  
  },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.converToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
    var totalMovies = {}; 
    //如果要绑定新加载的数据，需要同旧有的数据合并在一起
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies,
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onReady: function (e) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }

})