var postsData = require('../../../data/posts-data.js')
Page({
  onLoad:function(option){
    //传的参数在option里，postId对应父级中url中的参数  这里做的是将在父级中自定义的data-postId相对应的dom与模拟的后台数据中的postId对应起来
    var postId = option.postId;
    //console.log(postId);
    //console.log(postsData);
    var postData = postsData.postList[postId];
    //console.log(postData);
    //没用this.data.postData = postData;
    this.setData({
      postData: postData
    })
  }
})