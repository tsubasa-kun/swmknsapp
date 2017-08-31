/**
 * Created by xiekun on 2017/4/12 0012.
 */

export default {
    TEST_ID: '',//测试账号
    SET_DEFAULT_ROLE: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/setDefaultRole.do',//设置用户角色
    GET_ZD_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getZDInfo.do',//字典接口
    GET_STU_SUCCESS_POOR_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getStuSuccessPoorInfo.do',//查询成功申请的困难生
    GET_STU_APPLY_POOR_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getStuApplyPoorInfo.do',//查询学生当前批次的申请信息
    GET_STUDENT_APPLY_LOG: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getStuApplyLogInfo.do',//获取申请记录的审核日志
    GET_POOR_SET_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getPoorSetInfo.do',//获取困难生申请设置信息
    GET_POOR_PASS_COUNT: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getPoorPassCount.do',//获取设置学年已成功申请记录数
    GET_STUDENT_FAMILY_MEMBER: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getStuFamMemberInfo.do',//查询学生家庭成员
    ADD_STUDENT_FAMILY_MEMBER: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/newStuFamMemberInfo.do',//新增学生家庭成员
    MODIFY_STUDENT_FAMILY_MEMBER: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/modifyStuFamMemberInfo.do',//修改学生家庭成员
    DELETE_STUDENT_FAMILY_MEMBER: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/deleteStuFamMemberInfo.do',//删除学生家庭成员
    GET_STUDENT_FAMILY_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getStuFamliyInfo.do',//查询家庭情况
    GET_STUDENT_AWARD_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getStuAwardInfo.do',//已获资助情况
    GET_FAMILY_CONCAT_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getStuFamConcatInfo.do',//查询家庭联系信息
    MODIFY_FAMILY_CONCAT_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/modifyStuFamConcatInfo.do',//修改家庭联系信息
    GET_CIVILIAN_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/getStuCivilianInfo.do',//查询学生民政信息
    SAVE_CIVILIAN_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/saveStuCivilianInfo.do',//保存学生民政信息
    SAVE_STUDENT_APPLY_INFO: WEBPACK_CONIFG_HOST + '/sys/knsapp/MobilePoorStuApply/saveStudentApplyInfo.do'//提交学生申请信息
}
