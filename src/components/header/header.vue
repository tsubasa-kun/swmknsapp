<template>
    <div class="title-bar">
        <span>{{ title_text }}</span>
    </div>
</template>

<style scoped>
    .title-bar {
        width: 100%;
        height: 40PX;
        background-color: white;
        text-align: center;
        border-bottom: solid 1PX #C6C6C6;
    }
    span {
        line-height: 40PX;
        color: #1E2329;
        font-size: 16PX;
    }
</style>

<script type="text/javascript">
    export default {
        props: ['title_text'],
    }
</script>