<template>
    <div class="MajorProjectTeacherSelect">
        <!--设置失败的弹窗-->
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

        <!--登陆成功的弹窗-->
        <van-popup v-model="successShow" position="top" :style="{ height: '60%' }" @closed="goHome">
            <div>
                <div>
                    <van-icon name="completed" size="2.5rem" color="#07c160" style="margin: 0.6rem"/>
                </div>
                <div>
                    <p style="font-size: 0.4rem">{{successMessage}}</p>
                </div>
            </div>
        </van-popup>
        
        <majorSelect ref="MajorSelect"/>
        
        <!--截止时间分割器-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            请选择签到截止时间
        </van-divider>
        
        <!--截止时间选择器-->
        <div style="width: 80%;margin: auto">
            <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :show-toolbar="false"
                    :filter="filter"
                    ref="timePicker"
            />
            
        </div>
        
        <!--最晚截止时间分割线-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            请选择最晚截止时间(迟到范围)
        </van-divider>
        
        <!--最晚截止时间选择器-->
        <div style="width:55%;margin: auto">
            <van-picker
                    :columns="lastTime"
                    :default-index="3"
                    :visible-item-count="3"
                    ref="lastTimePicker"
            />
        </div>
        
        <!--距离选择分割线-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            <p>请选择定位距离范围差</p>
        </van-divider>
        
        <!--距离选择器-->
        <div style="width:55%;margin: auto">
            <van-picker
                    :columns="distance"
                    :default-index="3"
                    :visible-item-count="3"
                    ref="distancePicker"
            />
        </div>
        
        <van-button type="primary" size="large" @click="submit">提交</van-button>
        
        <div style="height: 1rem"/>
    </div>
</template>

<script>
    import majorSelect from '@/components/MajorSelect'
    export default {
        name: "MajorProjectTeacherSelect",
        components:{
            majorSelect
        },
        data() {
            return {
                successShow:false,
                failureShow: false,
                failureMessage: '',
                successMessage: '',
                minDate: new Date(new Date().getTime() + 1000 * 60 * 10),
                maxDate: new Date(new Date().getUTCFullYear(),new Date().getUTCMonth(),new Date().getDate()+1   ),
                // maxDate: new Date(2025, 10, 1),
                currentDate: new Date(),
                currentTime: new Date().getUTCHours().toString + ":" + new Date().getUTCMinutes().toString,
                distance: ['10', '20', '30', '50 推荐使用', '100', '200'],
                lastTime: ['1', '3', '5', '10 推荐使用', '15', '20'],
            };
        },
        methods: {
            goHome() {
                this.$router.push("/teacherHome");
            },
            filter(type, options) {
                if (type === 'minute') {
                    return options.filter(option => option % 5 === 0);
                }
                return options;
            },
            submit() {
                let that = this;
                this.$refs.MajorSelect.init();
                if (this.$refs.MajorSelect.teacher === localStorage.teacherName) {
                    this.$axios({
                        method: 'post',
                        url: '/clock/clockSelect/teacherSetting',
                        data: {
                            major: that.$refs.MajorSelect.major,
                            project: that.$refs.MajorSelect.project,
                            teacher: that.$refs.MajorSelect.teacher,
                            lastTime: new Date(that.$refs.timePicker['value']).getTime(),
                            deadLine: that.$refs.lastTimePicker.getValues()[0].split(" ")[0],
                            distance: that.$refs.distancePicker.getValues()[0].split(" ")[0],
                            lng: that.$refs.MajorSelect.lng,
                            lat: that.$refs.MajorSelect.lat,
                            accuracy: localStorage.accuracy,
                            address: that.$refs.MajorSelect.address,
                        },
                    }).then(res => {
                        if (res.data['isOK'] === true ) {
                            that.successShow = true;
                            
                            if(res.data['isUpdate'] === false){
                                that.successMessage = '设置成功';
                            }else if(res.data['isUpdate'] === true){
                                that.successMessage = '更新成功';
                            }
                        } else {
                            console.log("err");
                        }
                    });
                } else {
                    //教师设置签到参数未选择自己的课程
                    this.failureShow = true;
                    this.failureMessage = '请选择您自己的课程';
                }
                
            },
        },
    }
</script>

<style scoped>
</style>