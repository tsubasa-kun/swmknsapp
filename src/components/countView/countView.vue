<template>
    <div class="count-div">
        <span class="count-text">{{ count }}</span>
        <span class="count-max">/50</span>
    </div>
</template>

<style scoped>
    .count-div {
        width: 100%;
        padding-right: 10PX;
        text-align: right;
    }

    .count-text {
        display: inline-block;
        color: #92969c;
        font-size: 10PX;
    }

    .count-max {
        display: inline-block;
        color: #92969c;
        font-size: 10PX;
    }
</style>

<script type="text/javascript">
    export default {
        props: ["content"],
        data() {
            return {
                count: 0
            }
        },
        watch: {
            content: function () {
                this.count = this.content.length;
            }
        }
    }
</script>