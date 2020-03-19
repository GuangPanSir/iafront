<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return{
            }
        }
    }
</script>

<style lang="scss">
    .copyright {
        font-size: .22rem;
        line-height: .42667rem;
        color: #999;
    }
    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
</style>
