<template>
    <div class="TeacherHome">
        <!--粘性置顶广告-->
        <van-sticky>
            <van-notice-bar :text="message" left-icon="volume-o" style="margin:0 0 .2rem 0"/>
        </van-sticky>
        
        <!--吸底-->
        <Footer ref="footer"/>
    </div>
</template>

<script>
    import Footer from "@/components/TeacherFooter";

    export default {
        name: "TeacherHome",
        components: {
            Footer,
        },
        data(){
            return{
                message: '根据上级规定，对在校大学生进行更加严格的教育管理，请各位师生遵守规定',
            }
        }
    }
</script>

<style scoped>

</style>