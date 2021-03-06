var app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    mode:"aspectFill"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase+"/v2/movie/subject/" + movieId;
    util.http(url, this.processDoubanData)
  },
  processDoubanData:function(data){
    //console.log(data);
    if(!data){
      return;
    }
    var director = {
      avatar:"",
      name:"",
      id:""
    }
    if(data.directors[0]!=null){
      if (data.directors[0].avatars!=null){
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg:data.images?data.images.large:"",
      country:data.countries[0],
      title:data.title,
      original_title: data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      generes:data.genres.join("、"),
      stars: util.converToStarsArray(data.rating.stars),
      score:data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie
    })
    //console.log(this.data.movie);
  },
  viewMoviePostImg:function(e){
    var src = e.currentTarget.dataset.src;
    wx.previewImage({   //预览图片
      urls: [src],//需要预览的图片http链接列表
      //current: src,//当前显示图片的http链接
    })
  }

  
})