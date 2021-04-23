import {SCHOOL,ORDER_TYPE, LESSON_TYPE, LESSON_STATE, SEX} from "./../enum/order_enum.js";

if(typeof(schoolNameArr) == "undefined") {
  var schoolNameArr = [{name: "成都文理学院", enumValue: SCHOOL.CD_WENLI}, 
  {name: "test1", enumValue: SCHOOL.TEST1}, 
  {name: "test2", enumValue: SCHOOL.TEST2}];
}

if(typeof(orderTypeName) == "undefined") {
  var orderTypeName = [{name: "随堂辅导", enumValue: ORDER_TYPE.LESSON}, 
  {name: "代取", enumValue: ORDER_TYPE.PICKUP}, 
  {name: "课后辅导", enumValue: ORDER_TYPE.HOMEWORK}];
}

if(typeof(lessonTypeName) == "undefined") {
  var lessonTypeName = [{name: "公共课", enumValue: LESSON_TYPE.COMMON}, 
  {name: "专业课", enumValue: LESSON_TYPE.SPECIAL}, 
  {name: "体育课", enumValue: LESSON_TYPE.SPORTS}];
}

if(typeof(lessonStateName) == "undefined") {
  var lessonStateName = [{name: "水课/点名", enumValue: LESSON_STATE.CHECK}, 
  {name: "可能做题签到", enumValue: LESSON_STATE.TASK}, 
  {name: "可能小测试", enumValue: LESSON_STATE.TEST},
  {name: "其他", enumValue: LESSON_STATE.OTHERS}];
}

if(typeof(sexName) == "undefined") {
  var sexName = [{name: "男", enumValue: SEX.MAN},
  {name: "女", enumValue: SEX.WOMAN},
  {name: "不限", enumValue: SEX.NO_LIMIT}]
}

export {schoolNameArr, orderTypeName, lessonTypeName, lessonStateName, sexName};
