<template>
    <div>
        <div class="page-label">
            <span>已获资助</span>
        </div>

        <div class="empty-div" v-if="empty">
            暂无资助
        </div>
        <div class="content" v-else>
            <div v-for="funding in fundings">
                <span>{{ funding.MC }}</span>
                <span>￥{{ funding.JE }}</span>
            </div>
        </div>
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
        border-bottom: solid 1PX #e8e8e8;
    }

    .content span {
        display: block;
        font-size: 16PX;
        color: #000;
        line-height: 30PX;
        margin-left: 10PX;
    }

    .empty-div {
        text-align: center;
        font-size: 15PX;
        padding: 20PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import {Indicator} from 'mint-ui';
    export default {
        data() {
          return {
              fundings: [],
              empty: false
          }
        },
        components: {
            [Indicator.name]: Indicator
        },
        created(){
            SDK.setTitleText('困难生申请');

            Indicator.open();
            let params = '?IDENTITY_ID=' + Api.TEST_ID;
            this.$http.get(Api.GET_STUDENT_AWARD_INFO + params)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.fundings = res.datas;
                    if (this.fundings) {
                        this.empty = false;
                        //金额格式统一为xxx.xx
                        for (let i = 0; i < this.fundings.length; i++) {
                            let tempJE = this.fundings[i].JE;
                            if (tempJE.indexOf('.') < 0) {
                                this.fundings[i].JE = tempJE + '.00';
                            } else {
                                let strs = tempJE.split(".");
                                if (strs[1].length === 1) {
                                    this.fundings[i].JE = tempJE + '0';
                                }
                            }
                        }
                    } else {
                        this.empty = true;
                    }
                    Indicator.close();
                });
        },
    }
</script>