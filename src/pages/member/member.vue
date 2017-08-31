<template>
    <div class="content">
        <!--<div class="user-info-div">-->
        <!--<span class="user-name-text"></span>-->
        <!--<span class="user-id-text"></span>-->
        <!--</div>-->

        <div class="select-div">
            <span class="select-label">如有下列情况，请选择</span>
            <div>
                <div class="radios-div" v-for="knlx in KNLXDM">
                    <span class="radios current" v-if="knlx.DM === KNLX" @click="selectKNLX(knlx)">{{ knlx.MC }}</span>
                    <span class="radios" v-else @click="selectKNLX(knlx)">{{ knlx.MC }}</span>
                </div>
            </div>
        </div>

        <div class="member-list-div">
            <span>家庭成员情况</span>
            <div v-for="item in members">
                <v-member :member="item"></v-member>
            </div>
        </div>

        <div class="add-btn" @click="addMember">
            <i class="iconfont">&#xe60b;</i>
            <span>添加一条</span>
        </div>

        <mt-button class="submit-btn" @click="complete">完成</mt-button>
    </div>
</template>

<style scoped>
    .user-info-div {
        padding: 15PX 15PX 15PX 0PX;
        margin-left: 15PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .user-name-text {
        font-size: 15PX;
    }

    .user-id-text {
        font-size: 13PX;
        color: #92969c;
    }

    .select-div {
        padding: 15PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .select-label {
        font-size: 12PX;
        color: #92969c;
    }

    .radios-div {
        display: inline-block;
        margin-top: 10PX;
    }

    .radios {
        display: inline-block;
        line-height: 25PX;
        padding: 0PX 15PX 0PX 15PX;
        margin: 4PX;
        border: solid 1PX #92969c;
        border-radius: 20PX;
        color: #92969c;
        font-size: 13PX;
    }

    .radios.current {
        display: inline-block;
        line-height: 25PX;
        padding: 0PX 15PX 0PX 15PX;
        border: solid 1PX #06c1ae;
        border-radius: 20PX;
        color: #06c1ae;
        background-color: rgba(6, 193, 174, 0.1);
        font-size: 13PX;
    }

    .member-list-div {
        padding: 15PX 0 15PX 15PX;
        font-size: 16PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .add-btn {
        position: relative;
        margin-top: 20PX;
        width: 100%;
        height: 45PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .add-btn i {
        position: absolute;
        top: 6PX;
        left: calc(50% - 40PX);
        font-size: 22PX;
        color: #06c1ae;
    }

    .add-btn span {
        position: absolute;
        top: 10PX;
        left: calc(50% - 15PX);
        font-size: 16PX;
        color: #06c1ae;
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
    import $ from 'jquery';
    import {Indicator, Button} from 'mint-ui';
    import memberItem from '../../components/memberItem/memberItem.vue';

    export default {
        data() {
            return {
                members: [],
                KNLXDM: [],
                KNLX: ''
            }
        },
        components: {
            [Indicator.name]: Indicator,
            [Button.name]: Button,
            'v-member': memberItem
        },
        created() {
            SDK.setTitleText('困难生申请');

            Indicator.open();
            let params = '?IDENTITY_ID=' + Api.TEST_ID;
            this.$http.get(Api.GET_STUDENT_FAMILY_MEMBER + params)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.members = res.datas;
                    Indicator.close();
                });

            Indicator.open();
            this.$http.get(Api.GET_ZD_INFO + '?ZDID=' + 'KNLXDM')
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.KNLXDM = res.datas;
                    if (sessionStorage.getItem("SQKNLX")) {
                        this.KNLX = sessionStorage.getItem("SQKNLX");
                    } else {
                        this.KNLX = this.KNLXDM[0].DM;
                    }
                    Indicator.close();
                });
        },
        methods: {
            addMember: function () {
                this.$router.push("/addMember");
            },
            complete: function () {
                sessionStorage.setItem("SQKNLX", this.KNLX);
                this.$router.go(-1);
            },
            selectKNLX: function (knlx) {
                this.KNLX = knlx.DM;
            }
        }
    }
</script>