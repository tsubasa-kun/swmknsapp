<template>
    <div>
        <div class="page-label">
            <span>民政部门信息</span>
        </div>

        <div class="content">
            <div>
                <span class="align-top">通讯地址</span>
                <textarea class="model-inst-input" placeholder="请填写通讯地址" maxlength="50" v-model="address"></textarea>
            </div>

            <mt-field label="邮政编码" placeholder="请填写邮政编码" type="number" v-model="zip"></mt-field>
            <mt-field label="联系电话" placeholder="请填写联系电话" type="tel" v-model="phone"></mt-field>
        </div>

        <mt-button class="submit-btn" @click="complete">完成</mt-button>
    </div>
</template>

<style scoped>
    .page-label {
        padding: 10PX;
        color: #92969c;
        font-size: 13PX;
        background-color: #f2f2f4;
    }

    .content div {
        padding: 10PX;
    }

    .content span {
        display: inline-block;
        width: 80PX;
        font-size: 16PX;
    }

    .content input {
        border: 0;
        font-size: 15PX;
        outline: none;
    }

    .align-top {
        vertical-align: top;
    }

    .model-inst-input {
        width: 70%;
        height: 92PX;
        resize: none;
        outline: none;
        border: 0;
        font-size: 15PX;
        white-space:normal;
        word-break:break-all;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 15PX 10PX 10PX 10PX;
        position: fixed;
        bottom: 0;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Button, Field} from 'mint-ui';

    export default {
        data() {
            return {
                address: '',
                zip: '',
                phone: ''
            }
        },
        components: {
            [Indicator.name]: Indicator,
            [Button.name]: Button,
            [Field.name]: Field
        },
        created() {
            SDK.setTitleText('困难生申请');

            Indicator.open();
            let params = '?IDENTITY_ID=' + Api.TEST_ID;
            this.$http.get(Api.GET_CIVILIAN_INFO + params)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    if (res.datas.MZLXDH) {
                        this.address = res.datas.MZTXDZ;
                    }
                    if (res.datas.MZYZBM) {
                        this.zip = res.datas.MZYZBM;
                    }
                    if (res.datas.MZLXDH) {
                        this.phone = res.datas.MZLXDH;
                    }
                    Indicator.close();
                });
        },
        methods: {
            complete: function () {
                if (this.address.length === 0) {
                    Utils.methods.showTip('请输入通讯地址');
                } else if (this.zip.length === 0) {
                    Utils.methods.showTip('请输入邮政编码');
                } else if (this.phone.length === 0) {
                    Utils.methods.showTip('请输入联系电话');
                } else {
                    Indicator.open();
                    let params = '?IDENTITY_ID=' + Api.TEST_ID + '&MZTXDZ=' + this.address + '&MZYZBM=' + this.zip + '&MZLXDH=' + this.phone;
                    this.$http.get(Api.SAVE_CIVILIAN_INFO + params)
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
                }
            }
        }
    }
</script>