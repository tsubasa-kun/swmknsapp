<template>
    <div>
        <div class="content">
            <div>
                <span>姓名</span>
                <input type="text" placeholder="请输入姓名" v-model="name">
            </div>

            <div>
                <span>亲属关系</span>
                <input type="text" readOnly="true" placeholder="请选择亲属关系" v-model="relation" @click="showRelationPicker">
            </div>

            <div>
                <span>出生日期</span>
                <input type="text" readOnly="true" placeholder="请选择出生日期" v-model="age" @click="showDatePicker">
            </div>

            <div>
                <span>职业</span>
                <input type="text" placeholder="请输入职业名称" v-model="work">
            </div>

            <div>
                <span>工作单位</span>
                <input type="text" placeholder="请输入工作单位" v-model="workUnits">
            </div>

            <div>
                <span>年收入</span>
                <input type="number" placeholder="￥请输入金额" v-model="income" min="0">
            </div>

            <div>
                <span>健康状况</span>
                <input type="text" readOnly="true" placeholder="请选择健康状况" v-model="health" @click="showHealthPicker">
            </div>
        </div>

        <mt-button class="submit-btn" @click="submit">完成</mt-button>

        <div class="cover"></div>
        <div id="relation_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="relations" @change="onRValuesChange"></mt-picker>
        </div>
        <div id="health_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="healths" @change="onHValuesChange"></mt-picker>
        </div>

        <mt-datetime-picker
                ref="agePicker"
                v-model="ageDate"
                type="date"
                year-format="{value}"
                month-format="{value}"
                date-format="{value}"
                :startDate="startDate"
                @confirm="ageDatePickerConfirm">
        </mt-datetime-picker>
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

    .content div {
        padding: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .content span {
        display: inline-block;
        width: 80PX;
        font-size: 16PX;
    }

    .content input {
        border: 0;
        width: 210PX;
        outline: none;
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
    import Utils from '../../utils';
    import $ from 'jquery';
    import moment from 'moment';
    import {Indicator, Picker, Button, DatetimePicker} from 'mint-ui';
    export default {
        data() {
            return {
                name: '',
                relation: '',
                age: '',
                work: '',
                workUnits: '',
                income: '',
                health: '',
                relationsValue: [],
                relationsMap: [],
                relations: [
                    {
                        flex: 1,
                        values: [],
                        className: 'relations',
                        textAlign: 'center',
                    }
                ],
                relationKey: '',
                healthsValue: [],
                healthsMap: [],
                healths: [
                    {
                        flex: 1,
                        values: [],
                        className: 'healths',
                        textAlign: 'center',
                    }
                ],
                healthKey: '',
                startDate: '',
                ageDate: ''
            }
        },
        components: {
            [Picker.name]: Picker,
            [Button.name]: Button,
            [DatetimePicker.name]: DatetimePicker
        },
        methods: {
            showDatePicker: function () {
                this.$refs.agePicker.open();
            },
            ageDatePickerConfirm: function (value) {
                console.log(value);
                this.age = moment(value).format('YYYY-MM-DD');
            },
            submit: function () {
                Indicator.open();
                let params = '?IDENTITY_ID=' + Api.TEST_ID + '&XM=' + this.name + '&JTGXDM='
                    + this.relationKey + '&CSRQ=' + this.age + '&JKZKDM=' + this.healthKey + '&GZDW=' + this.workUnits + '&ZW=' + this.work
                    + '&PJYSR=' + this.income;
                this.$http.get(Api.ADD_STUDENT_FAMILY_MEMBER + params)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        Indicator.close();
                        Utils.methods.showTip(res.msg);
                        if (res.status === '200') {
                            this.$router.go(-1);
                        }
                    });
            },
            onRValuesChange(picker, values) {
                this.relation = picker.getValues();
                this.getRelationKey(this.relation);
            },
            getRelationKey(value) {
                for (let i = 0; i < this.relationsMap.length; i++) {
                    if (this.relationsMap[i].MC == value) {
                        this.relationKey = this.relationsMap[i].DM;
                    }
                }
            },
            onHValuesChange(picker, values) {
                this.health = picker.getValues();
                this.getHealthKey(this.health);
            },
            getHealthKey: function (value) {
                for (let i = 0; i < this.healthsMap.length; i++) {
                    if (this.healthsMap[i].MC == value) {
                        this.healthKey = this.healthsMap[i].DM;
                    }
                }
            },
            showRelationPicker: function () {
                $('.cover').show();
                $('#relation_picker').slideDown('fast');
            },
            showHealthPicker: function () {
                $('.cover').show();
                $('#health_picker').slideDown('fast');
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
            SDK.setTitleText('增加家庭成员');
            this.startDate = new Date("1900-01-01");

            Indicator.open();
            this.$http.get(Api.GET_ZD_INFO + '?ZDID=' + 'JTGXDM')
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.relationsMap = res.datas;
                    for (let i = 0; i < this.relationsMap.length; i++) {
                        this.relationsValue.push(this.relationsMap[i].MC);
                    }
                    this.relations[0].values = this.relationsValue;
                    Indicator.close();
                });

            Indicator.open();
            this.$http.get(Api.GET_ZD_INFO + '?ZDID=' + 'JKZKDM')
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.healthsMap = res.datas;
                    for (let i = 0; i < this.healthsMap.length; i++) {
                        this.healthsValue.push(this.healthsMap[i].MC);
                    }
                    this.healths[0].values = this.healthsValue;
                    Indicator.close();
                });
        }
    }
</script>