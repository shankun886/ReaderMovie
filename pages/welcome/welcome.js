Page({
  onTap:function(event){
    // wx.redirectTo({
    //   //沒回退功能使用
    //   url: '../posts/posts'
    // })
    // wx.navigateTo({
    //   //有回退功能使用
    //  url: '../posts/posts',
    // })
    wx.switchTab({
      url: "../posts/posts"
    });
  },
 
})