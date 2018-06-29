var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data: {
    isPlayingMusic: false,
  },
  onLoad: function (option) {
    //传的参数在option里，postId对应父级中url中的参数  这里做的是将在父级中自定义的data-postId相对应的dom与模拟的后台数据中的postId对应起来
    var postId = option.id;
    this.setData({
      currentPostid: postId,
    });
    //console.log(postsData);
   // var postData = postsData.postList[postId];
    //console.log(postData);
    //没用this.data.postData = postData;
    this.setData({
      postData: postsData.postList[postId],
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
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      //this.data.isPlayingMusic = true;
      this.setData({
        isPlayingMusic:true,
      })
    }
    this.setMusicMonitor();
  },
  //
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  onColletionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    //通过借助data：{}从onload中获取当前文章的postId
    var postCollected = postsCollected[this.data.currentPostid];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostid] = postCollected;
    this.showToast(postCollected, postsCollected);


  },
  showModal: function (postCollected, postsCollected) {
    var that = this;
    wx.showModal({
      title: '这是模态框标题',
      content: postCollected ? "收藏该文章？" : "取消收藏该文章",
      confirmText: '确认',
      cancelText: " 取消",
      showCancel: 'true',
      confirmColor: '#405f80',
      cancelColor: "red",
      success: function (res) {
        if (res.confirm) {
          //更新文章是否收藏
          wx.setStorageSync("posts_collected", postsCollected);
          //更新数据绑定b变量,从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  showToast: function (postCollected, postsCollected) {
    wx.setStorageSync("posts_collected", postsCollected);
    //更新数据绑定b变量,从而实现切换图片
    this.setData({
      collected: postCollected
    })
    
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      icon: 'success',
      duration: 1000
    })
  },
  onShareTap: function (event) {
    var itemsList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ"
    ]
    wx.showActionSheet({
      itemList: itemsList,
      itemColor: "#405f80",
      success: function (res) {
        
        //res.cancel用户是不是点了取消     res.tapIndex数组元素序号，从0开始
        wx.showModal({
          title: '用户' + itemsList[res.tapIndex],
          content: "用户是否取消?" + res.cancel + '现在无法实现分享功能，什么时候支持呢',
        })
      }
    })
  },
  onMusicTap: function (event) {

    var postData = postsData.postList[this.data.currentPostid];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else {
      wx.playBackgroundAudio({
        // dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        // title: 'dassa',
        // coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }

})