var postsData = require('../../../data/posts-data.js')
Page({
  data:{

  },
  onLoad: function (option) {
    //传的参数在option里，postId对应父级中url中的参数  这里做的是将在父级中自定义的data-postId相对应的dom与模拟的后台数据中的postId对应起来
    var postId = option.postId;
    this.data.currentPostid = postId;
    //console.log(postId);
    //console.log(postsData);
    var postData = postsData.postList[postId];
    //console.log(postData);
    //没用this.data.postData = postData;
    this.setData({
      postData: postData
    });
    //缓存
    //同步
    //wx.setStorageSync("收藏", "已收藏")
    //value也可以是对象wx.setStorageSync("收藏", {game:"lol",author:"wechat"})
    //异步wx.setStorage({
    //  key: '',
    //  data: '',
    //}),
    //var posts_collected = {
    //  1: "true",  假设缓存以这种形式存放i 号文章的缓存与否的状态
     // 2: "false",
     // 3: "true",
   // }
    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected){
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected',postsCollected);
    }
  },
  onColletionTap: function(event){
    var postsCollected = wx.getStorageSync('posts_collected');
    //通过借助data：{}从onload中获取当前文章的postId
    var postCollected = postsCollected[this.data.currentPostid];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostid] = postCollected;
    //更新文章是否收藏
    wx.setStorageSync("posts_collected", postsCollected);
    //更新数据绑定b变量,从而实现切换图片
    this.setData({
      collected: postCollected
    })
  }

 
   
})