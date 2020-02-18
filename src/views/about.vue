<template>
    <div class="about">
        <button v-on:click="getMessage">获取用户信息</button>
        <h1>{{this.data}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'about',
        data(){
            return{
                data:"你好"
            }
        },
        methods: {
            getMessage:function () {
                let that = this;
                this.$axios.get("http://192.168.43.127:8082/graduation/ncist/select").then(function (response) {
                    that.data = response.data.data['personName'];
                    console.log(response);
                },err=>{
                    console.log(err);
                })
            }
        }
    }
</script>