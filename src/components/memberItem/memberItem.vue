<template>
    <div class="content">
        <div class="info-div">
            <span class="main-label">{{ member.XM }}</span>
            <span class="edit-btn" @click="toEdit">编辑</span>
            <div class="sub-div">
                <span class="sub-label">亲属关系</span>
                <span class="sub-text">{{ member.JTGXDM_DISPLAY }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">出生日期</span>
                <span class="sub-text">{{ member.CSRQ }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">职业</span>
                <span class="sub-text">{{ member.ZW }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">工作单位</span>
                <span class="sub-text">{{ member.GZDW }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">年收入</span>
                <span class="sub-text">{{ member.PJYSR }}</span>
            </div>
            <div class="sub-div">
                <span class="sub-label">健康状况</span>
                <span class="sub-text">{{ member.JKZKDM_DISPLAY }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        height: 100%;
        background-color: white;
    }

    .info-div {
        position: relative;
        margin-top: 10PX;
        padding: 10PX 0PX 10PX 0PX;
        border-top: solid 1PX #e8e8e8;
    }

    .main-label {
        display: block;
        font-size: 15PX;
        color: #000;
    }

    .edit-btn {
        position: absolute;
        top: 10PX;
        right: 10PX;
        font-size: 15PX;
        color: #06c1ae;
    }

    .sub-div {
        margin-top: 5PX;
    }

    .sub-label {
        width: 100PX;
        display: inline-block;
        font-size: 12PX;
        color: #92969c;
    }

    .sub-text {
        display: inline-block;
        font-size: 12PX;
        color: #000;
    }
</style>

<script type="text/javascript">
    export default {
        props: ['member'],
        methods: {
            toEdit: function () {
                this.$router.push({path: '/editMember', query: this.member});
            }
        }
    }
</script>