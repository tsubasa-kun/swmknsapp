<template>
    <div class="index">
        <v-open v-if="this.OPEN && !this.APPLYING"></v-open>
        <v-status v-else-if="this.OPEN && this.APPLYING"></v-status>
        <v-close v-else-if="!this.OPEN"></v-close>
    </div>
</template>

<style scoped>
    .index {
        background: #f9f9f9;
        text-align: center;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import header from '../../components/header/header.vue';
    import applyOpen from '../applyOpen/applyOpen.vue';
    import applyClose from '../applyClose/applyClose.vue';
    import applyStatus from '../applyStatus/applyStatus.vue';
    import applyDone from '../applyDone/applyDone.vue';
    import {Indicator} from 'mint-ui';
    export default {
        components: {
            'v-header': header,
            'v-open': applyOpen,
            'v-close': applyClose,
            'v-status': applyStatus,
            'v-done': applyDone
        },
        data() {
            return {
                OPEN: false,
                WID: '',
                APPLYING: false,
                BEPOOR: false
            }
        },
        created() {
            SDK.setTitleText('我的困难认定');

            Indicator.open();
            this.$http.get(Api.SET_DEFAULT_ROLE);

            //验证是否开放
            this.$http.get(Api.GET_POOR_SET_INFO)
                .then(res => {
                    return res.json();
                }).then(res => {
                    this.canOpenPage(res.datas.SQKSRQ, res.datas.SQJSRQ);
                    //验证是否已是困难生
                    this.$http.get(Api.GET_STU_SUCCESS_POOR_INFO + '?IDENTITY_ID=' + Api.TEST_ID)
                        .then(res => {
                            return res.json();
                        }).then(res => {
                            if (res.datas.WID && res.datas.SHZT === '99' && res.datas.SFYX === '1') {
                                //已是困难生
                                this.APPLYING = true;
                                this.BEPOOR = true;
                            } else {
                                //还不是困难生
                                this.BEPOOR = false;
                                //查询学生当前批次的申请信息
                                this.$http.get(Api.GET_STU_APPLY_POOR_INFO + '?IDENTITY_ID=' + Api.TEST_ID)
                                    .then(res => {
                                        return res.json();
                                    }).then(res => {
                                        if (res.datas.WID) {
                                            //有审核信息
                                            if (res.datas.SHZT === '0') {
                                                this.APPLYING = false;
                                            } else {
                                                this.APPLYING = true;
                                            }

                                            sessionStorage.setItem("SQKNLX", (res.datas.SQKNLX || ''));
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
                                            }

                                        } else {
                                            //没有审核信息
                                            this.APPLYING = false;
                                        }
                                    });
                            }
                        });
                    Indicator.close();
                });
        },
        methods: {
            canOpenPage: function (date1, date2) {
                if (Utils.methods.compareDate(Utils.methods.getCurrentDate(), date1) && Utils.methods.compareDate(date2, Utils.methods.getCurrentDate())) {
                    //在开放日期内
                    this.OPEN = true;
                } else {
                    //不在开放日期内
                    this.OPEN = false;
                }
            }
        }
    }
</script>