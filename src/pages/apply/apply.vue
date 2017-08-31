<template>
    <div class="content">
        <span class="apply-label">您需要填写以下信息完成申报</span>

        <div class="conditions-div" @click="turnToDetail('/member')">
            <span class="main-title">家庭成员</span>
            <span class="sub-title">包含您的家庭成员信息</span>
            <span v-if="member_status === true" class="status-text-done">已填写</span>
            <span v-else class="status-text-none">未填写</span>
            <i class="iconfont flag">&#xe79e;</i>
        </div>

        <div class="conditions-div" @click="turnToDetail('/situation')">
            <span class="main-title">家庭情况</span>
            <span class="sub-title">包含您家庭困难类型等信息</span>
            <span v-if="situation_status === true" class="status-text-done">已填写</span>
            <span v-else class="status-text-none">未填写</span>
            <i class="iconfont flag">&#xe79e;</i>
        </div>

        <div class="conditions-div" @click="turnToDetail('/funding')">
            <span class="main-title">已获资助</span>
            <span class="sub-title">您之前所获得的各项资助</span>
            <!--<span v-if="funding_status === true" class="status-text-done">已填写</span>-->
            <!--<span v-else class="status-text-none">未填写</span>-->
            <i class="iconfont flag">&#xe79e;</i>
        </div>

        <div class="conditions-div" @click="turnToDetail('/contactInfo')">
            <span class="main-title">联系信息</span>
            <span class="sub-title">包含您的通讯地址等信息</span>
            <span v-if="contact_status === true" class="status-text-done">已填写</span>
            <span v-else class="status-text-none">未填写</span>
            <i class="iconfont flag">&#xe79e;</i>
        </div>

        <div class="conditions-div" @click="turnToDetail('/civilianInfo')">
            <span class="main-title">民政部门信息</span>
            <span class="sub-title">包含您的民政相关信息</span>
            <span v-if="info_status === true" class="status-text-done">已填写</span>
            <span v-else class="status-text-none">未填写</span>
            <i class="iconfont flag">&#xe79e;</i>
        </div>

        <mt-button class="submit-btn" @click="submit">提交</mt-button>
    </div>
</template>

<style scoped>
    .apply-label {
        display: block;
        font-size: 14PX;
        padding: 10PX 10PX 0PX 10PX;
        color: #92969C;
    }

    .conditions-div {
        position: relative;
        width: 100%;
        margin-top: 10PX;
        padding: 20PX 10PX 20PX 10PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .main-title {
        display: block;
        font-size: 16PX;
        height: 20PX;
    }

    .sub-title {
        display: block;
        font-size: 14PX;
        color: #92969c;
    }

    .status-text-done {
        position: absolute;
        top: 33PX;
        right: 30PX;
        color: #06c1ae;
        font-size: 15PX;
    }

    .status-text-none {
        position: absolute;
        top: 33PX;
        right: 30PX;
        color: #92969c;
        font-size: 15PX;
    }

    .flag {
        position: absolute;
        top: 30PX;
        right: 10PX;
        font-size: 20PX;
        color: #92969c;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 15PX 10PX 10PX 10PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import {Indicator, Button} from 'mint-ui';
    import header from '../../components/header/header.vue';
    import Utils from '../../utils';

    export default {
        components: {
            'v-header': header,
            [Button.name]: Button,
            [Indicator.name]: Indicator
        },
        data() {
            return {
                member_status: false,
                situation_status: false,
                funding_status: true,
                contact_status: false,
                info_status: false,
                submit_api: '',
            }
        },
        methods: {
            turnToDetail: function (path) {
                this.$router.push(path);
            },
            submit: function () {
                if (this.member_status && this.situation_status && this.funding_status && this.contact_status && this.info_status) {
                    Indicator.open();
                    this.$http.get(this.submit_api)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
//                            Utils.methods.showTip(res.datas.msg);
                            if (res.datas.status === '200') {
                                this.$router.go(-1);
                                Utils.methods.showTip('提交完成');
                            } else {
                                Utils.methods.showTip('请求出错');
                            }
                        });
                } else {
                    Utils.methods.showTip('请将信息填写完整');
                }
            }
        },
        created() {
            Indicator.open();

            let situation = sessionStorage.getItem("situation");
            if (situation != null) {
                let params = '?IDENTITY_ID=' + Api.TEST_ID
                    + '&SQKNLX=' + (sessionStorage.getItem("SQKNLX") || '')
                    + '&JTKNLXDM=' + (sessionStorage.getItem("JTKNLXDM") || '')
                    + '&JTNSR=' + (sessionStorage.getItem("JTNSR") || '')
                    + '&ZRZHQK=' + (sessionStorage.getItem("ZRZHQK") || '')
                    + '&JTCYQK=' + (sessionStorage.getItem("JTCYQK") || '')
                    + '&JTCYSYQK=' + (sessionStorage.getItem("JTCYSYQK") || '')
                    + '&QZQK=' + (sessionStorage.getItem("QZQK") || '')
                    + '&QTQK=' + (sessionStorage.getItem("QTQK") || '');
                this.submit_api = Api.SAVE_STUDENT_APPLY_INFO + params;
                this.situation_status = true;
            } else {
                console.log();
                Indicator.open();
                let params = '?IDENTITY_ID=' + Api.TEST_ID;
                this.$http.get(Api.GET_STUDENT_FAMILY_INFO + params)
                    .then(res => {
                        return res.json();
                    }).then(res => {
                        sessionStorage.setItem("SQKNLX", res.datas.SQKNLX || '');
                        sessionStorage.setItem("JTKNLXDM_DISPLAY", (res.datas.JTKNLXDM_DISPLAY || ''));
                        sessionStorage.setItem("JTKNLXDM", (res.datas.JTKNLXDM || ''));
                        sessionStorage.setItem("JTNSR", (res.datas.JTNSR || ''));
                        sessionStorage.setItem("ZRZHQK", (res.datas.ZRZHQK || ''));
                        sessionStorage.setItem("JTCYQK", (res.datas.JTCYQK || ''));
                        sessionStorage.setItem("JTCYSYQK", (res.datas.JTCYSYQK || ''));
                        sessionStorage.setItem("QZQK", (res.datas.QZQK || ''));
                        sessionStorage.setItem("QTQK", (res.datas.QTQK || ''));
                        if (res.datas.SQKNLX) {
                            sessionStorage.setItem("situation", "yes");
                            let params = '?IDENTITY_ID=' + Api.TEST_ID
                                + '&SQKNLX=' + (sessionStorage.getItem("SQKNLX") || '')
                                + '&JTKNLXDM=' + (sessionStorage.getItem("JTKNLXDM") || '')
                                + '&JTNSR=' + (sessionStorage.getItem("JTNSR") || '')
                                + '&ZRZHQK=' + (sessionStorage.getItem("ZRZHQK") || '')
                                + '&JTCYQK=' + (sessionStorage.getItem("JTCYQK") || '')
                                + '&JTCYSYQK=' + (sessionStorage.getItem("JTCYSYQK") || '')
                                + '&QZQK=' + (sessionStorage.getItem("QZQK") || '')
                                + '&QTQK=' + (sessionStorage.getItem("QTQK") || '');
                            this.submit_api = Api.SAVE_STUDENT_APPLY_INFO + params;
                            this.situation_status = true;
                        }
                        Indicator.close();
                    });
            }

            Indicator.open();
            let params = '?IDENTITY_ID=' + Api.TEST_ID;
            this.$http.get(Api.GET_STUDENT_FAMILY_MEMBER + params)
                .then(res => {
                    return res.json();
                }).then(res => {
                if (res.datas.length > 0) {
                    this.member_status = true;
                }
                Indicator.close();
            });

            Indicator.open();
            this.$http.get(Api.GET_FAMILY_CONCAT_INFO + params)
                .then(res => {
                    return res.json();
                }).then(res => {
                if (res.datas.JTDZ || res.datas.JTYB || res.datas.JTDH) {
                    this.contact_status = true;
                }
                Indicator.close();
            });

            Indicator.open();
            this.$http.get(Api.GET_CIVILIAN_INFO + params)
                .then(res => {
                    return res.json();
                }).then(res => {
                if (res.datas.MZLXDH || res.datas.MZYZBM || res.datas.MZLXDH) {
                    this.info_status = true;
                }
                Indicator.close();
            });
        }
    }
</script>