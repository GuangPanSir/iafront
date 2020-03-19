<template>
    <div class="StudentChooseClockIn">
        <!--登录失败的弹窗-->
        <van-popup v-model="failureShow" position="top" :style="{ height: '60%' }">
            <div>
                <div>
                    <van-icon name="failure" size="2.5rem" color="red" style="margin: 0.6rem 0 0.3rem 0"/>
                </div>
                <div>
                    <p style="font-size: 0.4rem; margin: .3rem 0 .5rem 0">{{failureMessage}}</p>
                </div>
            </div>
        </van-popup>

        <div style="height: 1rem"/>
        <majorSelect ref="MajorSelect"/>
        <div style="height: 1rem"/>
        <van-button size="normal" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit">确认签到选项
        </van-button>
        <Footer/>
    </div>
</template>

<script>
    import majorSelect from '@/components/MajorSelect'
    import Footer from '@/components/StudentFooter'
    
    export default {
        name: "StudentChooseClockIn",
        components: {
            majorSelect,
            Footer
        },
        data() {
            return {
                failureShow: false,
                failureMessage: '',
                
            }
        },
        
        methods: {
            submit() {
                this.$refs.MajorSelect.init();
                if (this.$refs.MajorSelect.major === localStorage.userMajor) {
                    let that = this;
                    this.$axios({
                        method: 'post',
                        url: '/student/studentCheckClockSelect',
                        data: {
                            major: that.$refs.MajorSelect.major,
                            project: that.$refs.MajorSelect.project,
                            teacher: that.$refs.MajorSelect.teacher,
                        },
                    }).then(res => {
                        if (res.data['isTrue'] === false) {
                            this.failureShow = true;
                            this.failureMessage = '此老师暂未发布签到任务';
                        }else if (res.data['isTrue'] === true) {
                            this.$router.push("/clockIn")
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.failureShow = true;
                    this.failureMessage = '请选择你自己的专业';
                }
            }
        },
        
    }
    
</script>

<style scoped>

</style>