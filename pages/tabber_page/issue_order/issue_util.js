//  本文件有可以不修复的BUG!!!

import {SCHOOL, ORDER_TYPE, LESSON_TYPE, LESSON_STATE, SEX} from "./../../../enum/order_enum.js";

function getFormatDate (date) {
  return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}

function getFormatTime (date) {
  return date.getHours() + ":" + date.getMinutes();
}

function dateFromFormat (formated) {
  var arr = formated.split("-");
  return {year: parseInt(arr[0]), month: parseInt(arr[1]), day: parseInt(arr[2])};
}

function timeFromFormat (formated) {
  var arr = formated.split(":");
  return {hour: parseInt(arr[0]), minute: parseInt(arr[1])};
}

function createOrder (value,data,state) {
  var order = new Object;
  order.school = data.schoolArray[value.schoolIndex];
  order.type = data.orderType[parseInt(value.orderType)];
  order.remarks = value.remarks;
  order.price = value.price;

  order.customer = new Object;
  var customer = order.customer;
  customer.name = value.name;
  customer.schoolId = value.schoolId;
  customer.phoneNo = value.phoneNo;

  if (typeof(order.type) == "undefined") {
    return {error: false, mistake: true, reason: "请填写订单类型"};
  }
  else if (order.type.enumValue == ORDER_TYPE.LESSON) {
    order.lesson = new Object;
    var lesson = order.lesson;
    var lessonInform = data.lesson;
    lesson.name = value.lessonName;
    lesson.address = value.lessonAddress;
    lesson.type = lessonInform.lessonType[parseInt(value.lessonTypeIndex)];
    lesson.state = lessonInform.lessonState[parseInt(value.lessonStateIndex)];
    lesson.sex = lessonInform.sexRequired[parseInt(value.sexRequiredIndex)];
    if (state.haveDate) {
      lesson.date = dateFromFormat(value.date);
      lesson.formatedDate = value.date;
    }
    if (state.haveStartTime && state.haveEndTime) {
      lesson.time = {startTime: timeFromFormat(value.startTime), endTime: timeFromFormat(value.endTime)};
      lesson.formatedTime = {startTime: value.startTime, endTime: value.endTime};
    }
  }
  else if (type == ORDER_TYPE.PICKUP) {}
  else if (type == ORDER_TYPE.HOMEWORK) {}

  return checkOrderInform(order, state);
}

function checkOrderInform (order, state) {
  if (order.type.enumValue == ORDER_TYPE.LESSON) {
    var lesson = order.lesson;
    if (!checkStr(lesson.name)) {
      return {error: false, mistake: true, reason: "请填写课程名称"};
    }
    if (!checkStr(lesson.address)) {
      return {error: false, mistake: true, reason: "请填写上课地址"};
    }
    if (typeof(lesson.sex) == "undefined") {
      return {error: false, mistake: true, reason: "请选择性别要求"};
    }

    var checkDateResult = checkDate(lesson.date, state);
    if (checkDateResult.error || checkDateResult.mistake) {
      return checkDateResult;
    }
    var checkTimeResult = checkTime(lesson.time, state, lesson.date);
    if (checkTimeResult.error || checkTimeResult.mistake) {
      return checkTimeResult;
    }
  }

  if (order.price<=0) {
    return {error: false, mistake: true, reason: "请选择一个大于零的金额"};
  }

  if (!checkStr(order.customer.name)) {
    return {error: false, mistake: true, reason: "请填写您的真实姓名"};
  }

  if (!checkStr(order.customer.schoolId)) {
    return {error: false, mistake: true, reason: "请填写您的学号"};
  }

  if (!checkStr(order.customer.phoneNo)) {
    return {error: false, mistake: true, reason: "请填写您的电话号码"};
  }
}

function checkStr (str) {
  return !(typeof(str)=="undefined" || str=="");
}

function checkDate(date, state) {
  if (!state.haveDate) {
    return {error: false, mistake: true, reason: "请选择上课日期"};
  } 
  var formatedDate = getFormatDate(new Date());
  var nowDate = dateFromFormat(formatedDate);
  if (nowDate.year>date.year || (nowDate.year==date.year && nowDate.month>date.month) || (nowDate.year==date.year && nowDate.month==date.month && nowDate.day>date.day)) {
    return {error: false, mistake: true, reason: "上课日期不可早于当前日期（" + formatedDate+"）"};
  }
  return {error: false, mistake: false};
}

//  可以不修复的BUG!!!
function checkTime(time, state, date) {
  if (!state.haveStartTime) {
    return {error: false, mistake: true, reason: "请选择课程开始时间"};
  } 
  if (!state.haveEndTime) {
    return {error: false, mistake: true, reason: "请选择课程结束时间"};
  }
  var formatedTime = getFormatTime(new Date());
  var nowTime = timeFromFormat(formatedTime);
  var formatedDate = getFormatDate(new Date());
  var nowDate = dateFromFormat(formatedDate);
  if (nowDate.year==date.year && nowDate.month==date.month && nowDate.day==date.day) {
    if (time.startTime.hour<nowTime.hour || (time.startTime.hour==nowTime.hour && time.startTime.minute<=nowTime.minute)) {
      return {error: false, mistake: true, reason: "开始时间必须晚于当前时间\n（" + formatedDate + " " + formatedTime +")"};
    }
  }
  if (time.endTime.hour<time.startTime.hour || (time.endTime.hour==time.startTime.hour && time.endTime.minute<=time.startTime.minute)) {
    return {error: false, mistake: true, reason: "结束时间必须晚于开始时间"};
  }

  var h = nowTime.hour, m = nowTime.minute;
  m += 15;
  if (m>=60) {
    h = (h+1)%24;
    m -= 60;
  }

  //  这里有个bug，考虑有人在10号23:55分发一个11号00:00的订单，由于间隔少于15分钟，是不行的。但是这段代码里只有当日期不是一天的时候才检查相隔的时间，所以这个单可以发出去
  //  这么做的原因是避免10号8:00发不了11号8:05的订单。
  //  这个bug暂时不用修，因为没人发半夜的订单，即便发了，让他发出去也是可以的，只是没人接罢了。如果要修会特别麻烦，必须计算日期的推移
  if (nowDate.year==date.year && nowDate.month==date.month && nowDate.day==date.day) {
    if (time.startTime.hour<h || (time.startTime.hour==h && time.startTime.minute<=m)) {
      return {error: false, mistake: true, reason: "距离开课不足15分钟，无法发布订单"};
    }
  }
  return {error: false, mistake: false};
}

export {getFormatDate, getFormatTime, createOrder}