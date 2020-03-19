<template>
    <div class="ClockInSetting">
        <!--签到信息选择器-->
        <MajorProjectTeacherSelect/>
        
        <!--吸底-->
        <Footer ref="footer"/>
    </div>
</template>

<script>
    import Footer from "@/components/TeacherFooter";
    import MajorProjectTeacherSelect from "@/views/ClockTeacherSetting";

    export default {
        name: "ClockInSetting",
        components: {
            Footer,
            MajorProjectTeacherSelect,
        },
        
    }
</script>

<style scoped>

</style>