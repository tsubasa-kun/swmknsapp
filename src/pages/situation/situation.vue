<template>
    <div class="content">
        <div class="model-div">
            <span class="model-label">家庭困难类型</span>
            <input class="model-input" type="text" readOnly="true" placeholder="请选择家庭困难类型" v-model="model"
                   @click="showModelPicker">
            <i class="iconfont flag">&#xe79e;</i>
        </div>

        <span class="model-inst-label">家庭困难类型说明</span>
        <div class="model-inst-div">
            <textarea class="model-inst-input" readonly v-model="difficult_case"></textarea>
        </div>

        <div class="model-div">
            <span class="model-label">家庭人均年收入</span>
            <input class="model-input" type="number" placeholder="请输入家庭人均年收入" v-model="year_income">
        </div>

        <span class="model-inst-label">家庭受自然灾害情况</span>
        <div class="model-inst-div">
            <textarea class="model-inst-input" placeholder="请输入内容" maxlength="50" v-model="disasters_case"></textarea>
            <v-count-view :content="disasters_case"></v-count-view>
        </div>


        <span class="model-inst-label">家庭成员因残疾、年迈而劳动能力弱情况</span>
        <div class="model-inst-div">
            <textarea class="model-inst-input" placeholder="请输入内容" maxlength="50" v-model="old_case"></textarea>
            <v-count-view :content="old_case"></v-count-view>
        </div>

        <span class="model-inst-label">家庭成员失业情况</span>
        <div class="model-inst-div">
            <textarea class="model-inst-input" placeholder="请输入内容" maxlength="50" v-model="work_case"></textarea>
            <v-count-view :content="work_case"></v-count-view>
        </div>

        <span class="model-inst-label">家庭欠债情况</span>
        <div class="model-inst-div">
            <textarea class="model-inst-input" placeholder="请输入内容" maxlength="50" v-model="debt_case"></textarea>
            <v-count-view :content="debt_case"></v-count-view>
        </div>

        <span class="model-inst-label">其他情况</span>
        <div class="model-inst-div">
            <textarea class="model-inst-input" placeholder="请输入内容" maxlength="50" v-model="other_case"></textarea>
            <v-count-view :content="other_case"></v-count-view>
        </div>

        <mt-button class="submit-btn" @click="saveSituation">完成</mt-button>

        <div class="cover"></div>
        <div id="model_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="models" @change="onMValuesChange"></mt-picker>
        </div>
    </div>
</template>

<style scoped>
    .cover {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .model-div {
        position: relative;
        width: 100%;
        padding: 10PX 0PX 10PX 20PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .model-label {
        font-size: 15PX;
    }

    .model-input {
        border: 0;
        font-size: 15PX;
        outline: none;
        margin-left: 10PX;
    }

    .flag {
        position: absolute;
        top: 12PX;
        right: 10PX;
        font-size: 20PX;
        color: #92969c;
    }

    .model-inst-label {
        display: block;
        width: 100%;
        color: #92969c;
        padding: 10PX 20PX 10PX 20PX;
    }

    .model-inst-div {
        width: 100%;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .model-inst-input {
        width: 100%;
        height: 100PX;
        resize: none;
        outline: none;
        border: 0;
        padding: 10PX 20PX 10PX 20PX;
        font-size: 15PX;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 15PX 10PX 10PX 10PX;
    }

    .m-picker {
        display: none;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
    }

    .picker-title-div {
        padding-top: 10PX;
        padding-bottom: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .picker-btn {
        color: #06c1ae;
        font-size: 15PX;
    }

    .picker-btn.ok {
        position: absolute;
        right: 10PX;
    }

    .picker-btn.cancel {
        margin-left: 10PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import $ from 'jquery';
    import Utils from '../../utils';
    import {Indicator, Picker, Button} from 'mint-ui';
    import countView from '../../components/countView/countView.vue';
    export default {
        data() {
            return {
                applyModel: '',
                model: '',
                modelsValue: [],
                modelsMap: [],
                models: [
                    {
                        flex: 1,
                        values: [],
                        className: 'models',
                        textAlign: 'center',
                    }
                ],
                modelKey: '',
                difficult_case: '',
                year_income: '',
                disasters_case: '',
                old_case: '',
                work_case: '',
                debt_case: '',
                other_case: ''
            }
        },
        components: {
            [Picker.name]: Picker,
            [Button.name]: Button,
            [Indicator.name]: Indicator,
            'v-count-view': countView
        },
        methods: {
            saveSituation: function () {
                console.log(this.year_income);
                if (this.year_income === 'null' || this.year_income.length <= 0) {
                    Utils.methods.showTip('请输入家庭年收入');
                } else {
                    sessionStorage.setItem("JTKNLXDM_DISPLAY", (this.model || ''));
//                sessionStorage.setItem("JTKNLXSM", this.difficult_case);
                    sessionStorage.setItem("SQKNLX", (this.applyModel || ''));
                    sessionStorage.setItem("JTKNLXDM", (this.modelKey || ''));
                    sessionStorage.setItem("JTNSR", (this.year_income || ''));
                    sessionStorage.setItem("ZRZHQK", (this.disasters_case || ''));
                    sessionStorage.setItem("JTCYQK", (this.old_case || ''));
                    sessionStorage.setItem("JTCYSYQK", (this.work_case || ''));
                    sessionStorage.setItem("QZQK", (this.debt_case || ''));
                    sessionStorage.setItem("QTQK", (this.other_case || ''));
                    sessionStorage.setItem("situation", "yes");
                    this.$router.go(-1);
                }
//                Indicator.open();
//                let params = '?IDENTITY_ID=' + Api.TEST_ID + '&SQKNLX=' + this.applyModel + '&JTKNLXDM=' + this.modelKey
//                    + '&JTNSR=' + this.year_income + '&ZRZHQK=' + this.disasters_case + '&JTCYQK=' + this.old_case
//                    + '&JTCYSYQK=' + this.work_case + '&QZQK=' + this.debt_case + '&QTQK=' + this.other_case;
//                this.$http.get(Api.SAVE_STUDENT_APPLY_INFO + params)
//                    .then(res => {
//                        return res.json();
//                    })
//                    .then(res => {
//                        Indicator.close();
//                        Utils.methods.showTip(res.datas.msg);
//                        if (res.datas.status === '200') {
//                            this.$router.go(-1);
//                        }
//                    });
            },
            onMValuesChange(picker, values) {
                this.model = picker.getValues();
                this.getModelKey(this.model);
            },
            getModelKey(value) {
                for (let i = 0; i < this.modelsMap.length; i++) {
                    if (this.modelsMap[i].MC == value) {
                        this.modelKey = this.modelsMap[i].DM;
                        this.difficult_case = this.modelsMap[i].SM;
                    }
                }
            },
            showModelPicker: function () {
                $('.cover').show();
                $('#model_picker').slideDown('fast');
            },
            pickerOK: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            },
            pickerCancel: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            }
        },
        created() {
            SDK.setTitleText('困难生申请');

            Indicator.open();
            this.$http.get(Api.GET_ZD_INFO + '?ZDID=' + 'JTKNLXDM')
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.modelsMap = res.datas;
                    for (let i = 0; i < this.modelsMap.length; i++) {
                        this.modelsValue.push(this.modelsMap[i].MC);
                    }
                    this.models[0].values = this.modelsValue;
                    Indicator.close();
                }).then(res => {
                    let situation = sessionStorage.getItem("situation");
                    if (situation != null) {
                        this.model = (sessionStorage.getItem("JTKNLXDM_DISPLAY") || '');
                        this.getModelKey(this.model);
//                        this.difficult_case = sessionStorage.getItem("JTKNLXSM");
                        this.year_income = (sessionStorage.getItem("JTNSR") || '');
                        this.disasters_case = (sessionStorage.getItem("ZRZHQK") || '');
                        this.old_case = (sessionStorage.getItem("JTCYQK") || '');
                        this.work_case = (sessionStorage.getItem("JTCYSYQK") || '');
                        this.debt_case = (sessionStorage.getItem("QZQK") || '');
                        this.other_case = (sessionStorage.getItem("QTQK") || '');
                    }
                });

            Indicator.open();
            this.$http.get(Api.GET_ZD_INFO + '?ZDID=' + 'KNLXDM')
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.applyModel = res.datas[0].DM;
                    Indicator.close();
                });

//            Indicator.open();
//            let params = '?IDENTITY_ID=' + Api.TEST_ID;
//            this.$http.get(Api.GET_STUDENT_FAMILY_INFO + params)
//                .then(res => {
//                    return res.json();
//                })
//                .then(res => {
//                    this.model = res.datas.JTKNLXDM_DISPLAY;
//                    this.difficult_case = res.datas.JTKNLXDM_DISPLAY;
//                    this.year_income = res.datas.JTNSR;
//                    this.disasters_case = res.datas.ZRZHQK;
//                    this.old_case = res.datas.JTCYQK;
//                    this.work_case = res.datas.JTCYSYQK;
//                    this.debt_case = res.datas.QZQK;
//                    this.other_case = res.datas.QTQK;
//                    Indicator.close();
//                });
        }
    }
</script>