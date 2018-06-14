Page({
  onTap:function(event){
    wx.redirectTo({
      url: '../posts/posts',
    });
    //wx.navigateTo({
    //  url: '../posts/posts',
    //  success:function(res){
    //    console.log(1);
     // },
     // fail:function(){
      //  console.log(2);
     // },
     // complete:function(){
      //  console.log(3);
     // }
    //})
  },
 
})