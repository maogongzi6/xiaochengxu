
if(typeof(SCHOOL) == "undefined"){
  var SCHOOL = {CD_WENLI: 0 /*成都文理学院*/, TEST1: -1/*test1*/, TEST2: -2/*test2*/}
}

if(typeof(ORDER_TYPE) == "undefined") {
  var ORDER_TYPE = {LESSON: 0/*随堂辅导*/, PICKUP: 1/*代取*/, HOMEWORK: 2/*课后辅导*/}
}

if(typeof(LESSON_TYPE) == "undefined") {
  var LESSON_TYPE = {COMMON: 0/*公共课*/, SPECIAL: 1/*专业课*/, SPORTS: 2/*体育课*/};
}

if(typeof(LESSON_STATE) == "undefined") {
  var LESSON_STATE = {CHECK: 0/*水课/签到*/, TASK: 1/*可能做题签到*/, TEST: 2/*可能小测试*/, OTHERS: 10/*其他*/}
}

if(typeof(SEX) == "undefined") {
  var SEX = {MAN: 0/*男*/, WOMAN: 1/*女*/, NO_LIMIT: 2/*不限*/}
}

export {SCHOOL,ORDER_TYPE, LESSON_TYPE, LESSON_STATE, SEX}