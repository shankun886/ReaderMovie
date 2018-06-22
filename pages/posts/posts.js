var postData =  require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    //小程序总是会读取ata对象来做数据绑定，这个动作称为动作a
    //而这个动作a额执行，是在onload事件执行之后发生的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //无效this.data.posts_key = postData.postList
    //如果在onload中执行异步操作，而在异步操作里面对data.posts_key直接赋值，这个是无效的，必须在这个异步操作里调用this.setData才有效
    this.setData({
      //会将posts_key: postData.postList这个键值添加到data中
      posts_key: postData.postList
    });
  },
  onPostTap:function(event){
    //html中定义的data-postId，打断点会发现全部转换成小写
    //Event 框架给的事件对象  currentTarget当前鼠标点击的组件，对应到这里绑定事件的view，dataset 所有自定义数据的集合
    var postid = event.currentTarget.dataset.postid;
    //console.log(postid);
    wx.navigateTo({
      //postId这个参数自定义
      url: 'post-detail/post-detail?id='+postid,
    })
  },
  onSwiperItemTap:function(e){
    var postid = e.currentTarget.dataset.postid;
    wx.navigateTo({
      //postId这个参数自定义
      url: 'post-detail/post-detail?id=' + postid,
    })
  },
  onSwiperTap:function(e){
    //target:指的是当前点击的组件,這裡指的是image
    //currentTarget：指的是事件捕获的组件，這裡指的是swiper組件
    var postid = e.target.dataset.postid;
    wx.navigateTo({
      //postId这个参数自定义
      url: 'post-detail/post-detail?id=' + postid,
    })
  }
})