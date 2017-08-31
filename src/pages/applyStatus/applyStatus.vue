<template>
    <div class="content">
        <span class="main-title">您已申报困难生认定</span>
        <span class="sub-title">当前状态</span>
        <span class="status-text">{{ DQSHZT_DISPLAY }}</span>

        <div class="time-div">
            <span class="time-label">申报时间：</span>
            <span class="time-text">{{ applyDate }}</span>
        </div>

        <div class="info-div">
            <span class="main-label">审核进度</span>
            <div class="check-steps-div">
                <div class="step-item-div" v-for="step in logInfo">

                    <div class="status-item-left">
                        <div class="status-item-time">
                            <span v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">{{ step.SHYJ[0].SHSJ }}</span>
                        </div>

                        <img src="../../assets/waiting.png" v-if="step.DQZTDM === DQSHZT">
                        <i class="iconfont status-icon-refused"
                           v-else-if="step.PX === curPX && refused">&#xe67a;</i>
                        <i class="iconfont status-icon-pass" v-else-if="step.PX < curPX || curPX === 0">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe672;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text">{{ step.DQZTDM_DISPLAY }}</span>
                        <span class="opinion-text" v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">审核人：{{ step.SHYJ[0].SHR }}</span>
                        <span class="opinion-text" v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">审核意见：{{ step.SHYJ[0].SHYJ }}</span>
                    </div>
                </div>
                <div class="step-item-div">
                    <div class="status-item-left-end">
                        <div class="status-item-time">
                            <span></span>
                        </div>

                        <i class="iconfont status-icon-pass" v-if="DQSHZT === '99'">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe672;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text">已通过</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        padding-top: 15PX;
        background-color: white;
    }

    .main-title {
        display: block;
        font-size: 18PX;
    }

    .sub-title {
        display: block;
        font-size: 14PX;
        margin-top: 15PX;
        color: #92969c;
    }

    .status-text {
        display: block;
        color: #06c1ae;
        font-size: 40PX;
        margin-top: 15PX;
    }

    .time-div {
        margin-top: 30PX;
        padding: 10PX;
        border-top: solid 1PX #e8e8e8;
        text-align: left;
    }

    .time-label {
        display: inline-block;
        color: #92969c;
        font-size: 15PX;
    }

    .time-text {
        display: inline-block;
        font-size: 15PX;
    }

    .info-div {
        padding: 10PX 0PX 10PX 10PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        text-align: left;
    }

    .main-label {
        display: block;
        height: 35PX;
        font-size: 20PX;
        color: #000;
        margin-bottom: 15PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .check-steps-div {
        width: 100%;
        background-color: white;
    }

    .step-item-div {
        width: 100%;
        height: auto;
        min-height: 70PX;
        text-align: left;
    }

    .status-item-time {
        display: inline-block;
        vertical-align: top;
        text-align: right;
        width: 80PX;
        font-size: 12PX;
        color: #92969c;
    }

    .status-item-left {
        display: inline-block;
        /*height: 100%;*/
        height: auto;
        min-height: 70PX;
        padding-right: 15PX;
        position: relative;
    }

    .status-item-left i {
        position: absolute;
        right: -10PX;
        top: -3PX;
    }

    .status-item-left img {
        width: 20PX;
        height: 20PX;
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-right {
        display: inline-block;
        margin-left: -4PX;
        padding-left: 16PX;
        vertical-align: top;
        height: auto;
        border-left: solid 1PX #e8e8e8;
        min-height: 70PX;
        max-width: 66%;
    }

    .step-text {
        display: block;
        text-align: left;
        font-size: 15PX;
    }

    .opinion-text {
        display: block;
        font-size: 12PX;
        color: #92969c;
        white-space:normal;
        word-break:break-all;
    }

    .status-icon-pass {
        font-size: 20PX;
        color: #06c1ae;
        /*background-color: white;*/
    }

    .status-icon-refused {
        font-size: 20PX;
        color: #ff571a;
        /*background-color: white;*/
    }

    .status-icon-dot {
        font-size: 20PX;
        color: #e8e8e8;
        /*background-color: white;*/
    }

    .status-item-left-end {
        display: inline-block;
        height: 100%;
        padding-right: 15PX;
        position: relative;
        vertical-align: top;
    }

    .status-item-left-end i {
        position: absolute;
        right: -10PX;
        top: -3PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import {Indicator} from 'mint-ui';
    export default {
        data() {
            return {
                DQSHZT_DISPLAY: '',
                DQSHZT: 0,
                curPX: 0,
                refused: false,
                logInfo: [],
                applyDate: ''
            }
        },
        created() {
           Indicator.open();
            this.$http.get(Api.GET_STU_APPLY_POOR_INFO + '?IDENTITY_ID=' + Api.TEST_ID)
                .then(res => {
                    return res.json();
                }).then(res => {
                    this.DQSHZT_DISPLAY = res.datas.SHZT_DISPLAY;
                    this.DQSHZT = res.datas.SHZT;
                    this.applyDate = res.datas.SQSJ;
                    let params = '?IDENTITY_ID=' + Api.TEST_ID + '&WID=' + res.datas.WID;
                    this.$http.get(Api.GET_STUDENT_APPLY_LOG + params)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            this.logInfo = res.datas;
                            this.getCurrentPX(this.DQSHZT);
                            Indicator.close();
                        });
                });
        },
        components: {
            [Indicator.name]: Indicator
        },
        methods: {
            getCurrentPX: function (curSHZT) {
                if (curSHZT.indexOf('-') === 0) {
                    this.refused = true;
                    curSHZT = curSHZT.substr(1, curSHZT.length);
                }
                for (var i = 0; i < this.logInfo.length; i++) {
                    if (curSHZT === this.logInfo[i].DQZTDM) {
                        this.curPX = this.logInfo[i].PX;
                    }
                }
            }
        }
    }
</script>