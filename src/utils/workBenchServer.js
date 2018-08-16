import store from '@/store'
let host;
if (window.location.href.indexOf('localhost') >= 0) {
    host = window._Host.BASE_API + window._Host.BASE_CONTEXT
} else {
    host = '/apis'
}

export const home = {
    getTeachingCarNum:'/car/carInfo/getTeachingCarNum',		//教练车数量
    getCountCoach:'/teaching/eduCoach/getCountCoach',		//教练人数
    getCountTraining:'/teaching/eduCourseTraining/getCountTraining',		//训练场人数
    getStudentCount:'/cert/certServiceInfo/getStudentCount',		//学员人数
    //getNumber:'/system/homepage/getNumbers',
    msgList:'/system/homepage/userMessages',
    readMsg:'/system/homepage/readMessage'
}

export const process = {
    list:'/workflow/api/v1/taskQuery/findApplyListByState',
    types:'/workflow/api/v1/taskQuery/processList'
}
