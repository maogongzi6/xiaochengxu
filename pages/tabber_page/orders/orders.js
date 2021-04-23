// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  patchSize: 5,

  refreshTimeout: null,
  loadingTimeout: null,
  refreshOverTimeTimeout: null,

  data: {
    topPos: 0,
    currentTab: 0,
    scrollLeft: 0,
    swiperTabName: ["代取", "随堂辅导", "线下辅导"],
    swiperHeight: 0,
    loading: false,
    hasMore: true,
    isRefresh: false,
    taken: [],
    inClass: [],
    afterClass: [],
    mainList: [],
  },

  getInform: function () {
    var maxNo = 14;
    var nowList = this.data.mainList[this.data.currentTab].list;
    var size = nowList.length;
    var cur = this.data.currentTab;
    var name = this.data.swiperTabName[cur];
    var i = 0;

    for (; i < this.patchSize && size + i < maxNo; ++i) {
      nowList[size + i] = {
        id: '0000' + (size + i),
        title: name,
        src: './../../../src/test.png',
        price: 100 + (size + i)
      };
    }
    var temp = "mainList[" + cur + "].list";
    this.setData({
      [temp]: nowList
    });
    return i;
  },

  clearData: function () {
    var cur = this.data.currentTab;
    this.setData({
      ["mainList[" + cur + "].list"]: []
    });
  },

  changeTab: function (e) {
    this.toTop();
    this.resetState();
    this.clearLoadingTimeout();
    this.clearRefreshTimeout();
    this.clearRefreshOverTimeTimeout();
    var cur = e.detail.current;
    this.data.mainList[cur].list = [];
    this.setData({
      currentTab: cur
    });
    this.getInform();
  },

  switchTab: function (e) {
    this.toTop();
    var cur = e.currentTarget.dataset.index;
    if (cur != this.data.currentTab) {
      this.clearLoadingTimeout();
      this.clearRefreshOverTimeTimeout();
      this.clearRefreshTimeout();
      this.setData({
        currentTab: cur
      });
    }
  },

  handleTap: function (e) {
    var item = e.currentTarget.dataset.item;
    var jsonItem = encodeURIComponent(JSON.stringify(item));
    wx.navigateTo({
      url: '/pages/order_detail/order_detail?obj=' + jsonItem,
    });
  },

  /*
  calculateHeight: function () {
    var cur = this.data.currentTab;
    var itemNum = this.data.mainList[cur].list.length;
    var that = this;
    this.get_wxml(".order-list"+cur, (rects)=> {
      var sum = 0;
      console.log(rects);

      for (let i=0;i<itemNum;++i) {
        sum += rects[i].height;
      }
      console.log(sum);
      that.setData({swiperHeight: sum});
    });
  },

  get_wxml: function (className, callback) {
    wx.createSelectorQuery().selectAll(className).boundingClientRect(callback).exec();
  },
  */

  handleTolower: function (e) {
    if (this.data.loading || !this.data.hasMore) return;
    this.setData({
      loading: true
    });
    var len = this.getInform();

    if (len != this.patchSize) {
      this.setData({
        hasMore: false
      });
    }
    this.setData({
      loading: false
    });
  },

  refresherPulling: function () {
    this.refreshOverTimeTimeout = setTimeout(() => {
      wx.showToast({
        title: '网络问题'
      })
      this.setData({
        isRefresh: false
      });
    }, 3000);
    //test
    this.refreshTimeout = setTimeout(() => {
      this.clearLoadingTimeout();
      this.clearRefreshOverTimeTimeout();
      var cur = this.data.currentTab;
      var temp = "mainList[" + cur + "].list";
      var name = this.data.swiperTabName[cur];
      var list = [{
        id: '-111',
        title: "test  " + name,
        src: './../../../src/test.png',
        price: -1
      }];
      this.setData({
        [temp]: list
      });
      this.resetState();
    }, 1000);
  },

  clearRefreshTimeout: function () {
    console.log(this.refreshTimeout);
    if (this.refreshTimeout != null) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  },
  clearLoadingTimeout: function () {
    if (this.loadingTimeout != null) {
      clearTimeout(this.loadingTimeout);
      this.loadingTimeout = null;
    }
  },
  clearRefreshOverTimeTimeout: function () {
    if (this.refreshOverTimeTimeout != null) {
      clearTimeout(this.refreshOverTimeTimeout);
      this.refreshOverTimeTimeout = null;
    }
  },

  toTop: function () {
    this.setData({topPos: 0});
  },

  resetState: function () {
    this.setData({
      isRefresh: false,
      hasMore: true,
      loading: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = this.data.mainList;
    var that = this;
    list[0] = {
      index: 0,
      list: that.data.taken,
    };
    list[1] = {
      index: 1,
      list: that.data.inClass,
    };
    list[2] = {
      index: 2,
      list: that.data.afterClass,
    };
    this.setData({
      mainList: list
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInform();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})