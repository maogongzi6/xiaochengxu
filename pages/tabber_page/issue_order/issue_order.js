// pages/issue_order/issue_order.js
import {getFormatDate, getFormatTime, createOrder} from "./issue_util";
import {schoolNameArr, orderTypeName, lessonTypeName, lessonStateName, sexName} from "./../../../values/name_arr.js";

Page({

  /**
   * 页面的初始数据
   */
  myState: {
    haveDate: false,
    haveStartTime: false,
    haveEndTime: false,
  }, 
  data: {
    schoolArray: schoolNameArr,
    schoolIndex: 0,
    orderType: orderTypeName,
    orderTypeIndex: -1,
    lesson: {
      lessonType: lessonTypeName,
      lessonTypeIndex: -1,
      lessonState: lessonStateName,
      lessonStateIndex: -1,
      sexRequired: sexName,
      sexRequiredIndex: -1,
      date: "点击选择上课日期",
      nowDate: null,
      theLatestDate: null,
      startTime: "选择开始时间",
      endTime: "选择结束时间",
      nowTime: null,
      },
    customizePrice: false,
  },

  formSubmit: function (e) {
    var message = createOrder(e.detail.value, this.data,this.myState);
    if (message.err) {
      wx.showToast({
        title: 'ERROR' + message.reason,
      });
    }
    else if (message.mistake) {
      wx.showToast({
        title: message.reason,
      });    
    }
    else {

    }
  },

  bindSchoolPicker: function (e) {
    this.setData({schoolIndex: e.detail.value});
  },

  bindDatePicker: function (e) {
    this.myState.haveDate = true;
    this.setData({"lesson.date": e.detail.value});
  },

  bindStartTimePicker: function (e) {
    this.myState.haveStartTime = true;
    this.setData({"lesson.startTime": e.detail.value});
  },

  bindEndTimePicker: function (e) {
    this.myState.haveEndTime = true;
    this.setData({"lesson.endTime": e.detail.value});
  },

  sexRequiredChoose: function (e) {
    var idx = e.currentTarget.dataset.index;
    if (idx==this.data.lesson.sexRequiredIndex) return;
    this.setData({"lesson.sexRequiredIndex": idx});
  },


  orderTypeChoose: function (e) {
    var idx = e.currentTarget.dataset.index;
    if (idx==this.data.orderTypeIndex) return;
    this.setData({orderTypeIndex: idx});
  },

  lessonTypeChoose: function (e) {
    var idx = e.currentTarget.dataset.index;
    if (idx==this.data.lesson.lessonTypeIndex) return;
    this.setData({"lesson.lessonTypeIndex": idx});
  },

  lessonStateChoose: function (e) {
    var idx = e.currentTarget.dataset.index;
    if (idx==this.data.lesson.lessonStateIndex) return;
    this.setData({"lesson.lessonStateIndex": idx});
  },

  bindPriceSlider: function (e) {

  },

  priceCustomizeChange: function (e) {
    var state = e.detail.value;
    if (state!=this.data.lesson.customizePrice) {
      this.setData({"lesson.customizePrice": state});
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var date = new Date();
    var formatedDate = getFormatDate(date);
    var formatedDateEnd = (parseInt(formatedDate.substring(0,4))+1)+formatedDate.substring(4,);
    var formatedTime = getFormatTime(date);
    this.setData({"lesson.nowTime": formatedTime});
    this.setData({"lesson.nowDate": formatedDate});
    this.setData({"lesson.theLatestDate": formatedDateEnd});
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

  }
})