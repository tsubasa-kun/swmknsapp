<template>
    <div class="content">
        <span class="main-title">困难生认定开放中</span>
        <span class="sub-title">截止目前已成功认定</span>
        <div class="number-div">
            <span class="number">{{ passCount }}</span>
            <span>人</span>
        </div>

        <div class="time-div">
            <span class="time-label">申报时间：</span>
            <span class="time-text">{{ startTime }} -- {{ endTime }}</span>
        </div>

        <mt-button class="submit-btn" @click="toApply">现在申报</mt-button>
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

    .number-div {
        margin-top: 15PX;
    }

    .number {
        color: #06c1ae;
        font-size: 40PX;
    }

    .time-div {
        margin-top: 15PX;
        padding-top: 10PX;
        padding-left: 10PX;
        border-top: solid 1PX #e8e8e8;
        text-align: left;
    }

    .time-label {
        display: inline-block;
        color: #92969C;
        font-size: 15PX;
    }

    .time-text {
        display: inline-block;
        font-size: 15PX;
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
    export default {
        data() {
            return {
                passCount: 0,
                startTime: 0,
                endTime: 0
            }
        },
        components: {
            [Indicator.name]: Indicator,
            [Button.name]: Button
        },
        created(){
            Indicator.open();
            this.$http.get(Api.GET_POOR_PASS_COUNT)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.passCount = res.datas.passCount;
                    Indicator.close();
                });
            this.$http.get(Api.GET_POOR_SET_INFO)
                .then(res => {
                    return res.json();
                }).then(res => {
                    this.startTime = res.datas.SQKSRQ;
                    this.endTime = res.datas.SQJSRQ;
                    Indicator.close();
                });
        },
        methods: {
            toApply: function () {
                this.$router.push('/apply');
            }
        }
    }
</script>