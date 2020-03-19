<template>
    <div class="Footer">
        <!--吸底-->
        <van-tabbar v-model="active" active-color="#666" inactive-color="#666">
            <van-tabbar-item icon="home-o" to="/teacherHome">首页</van-tabbar-item>
            <van-tabbar-item icon="sign" to="/clockInSetting">签到设置</van-tabbar-item>
            <van-tabbar-item icon="friends-o">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "TeacherFooter",
        data() {
            return {
                active:0
            }
        }
    }
</script>

<style scoped>

</style>