<template>
    <div class="home">
        <!--粘性置顶广告-->
        <van-sticky>
            <van-notice-bar :text="message" left-icon="volume-o" style="margin:0 0 .2rem 0"/>
        </van-sticky>

        <!--柱状图-->
        <ve-histogram :data="chartData" :extend="extend"/>

        <!--分割线-->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">打卡历史记录</van-divider>

        <!--打卡历史记录-->
        <table align="center" width="100%">
            <tr>
                <td>课程</td>
                <td>时间</td>
                <td>授课老师</td>
                <td>签到状态</td>
                <td>异常原因</td>
            </tr>
            <tr v-for="(i,inx) in list" :key="inx">
                <td>{{i.clockInProject}}</td>
                <td>{{i.clockTime}}</td>
                <td>{{i.teacherName}}</td>
                <td><p :style="i.clockState === '正常'?'color:green':'color:red'">{{i.clockState}}</p></td>
                <td><p :style="i.clockState === '正常'?'color:black':'color:red'">{{i.errorReason}}</p></td>
            </tr>
        </table>

        <!--顶底-->
        <div style="height: 2rem;background: #666;font-size: .5rem;color: #fff;text-align: center;">
            <div style="height: .0005rem"/>
            <p class="copyright">
                <span data-reactid=".0.9.0.1.0">私人单位版权所有 © 1997-</span>
                <span data-reactid=".0.9.0.1.1">2020</span>
                <br data-reactid=".0.9.0.1.2">
                <span data-reactid=".0.9.0.1.3">著作版本号：201607054118</span>
            </p>
        </div>

        <!--吸底-->
        <Footer ref="footer"/>
    </div>
</template>

<script>
    // @ is an alias to /src

    import Footer from "@/components/StudentFooter";

    export default {
        name: 'Home',
        components: {
            Footer,
        },
        data() {
            this.extend = {
                series: {
                    label: {show: true, position: "top"}
                }
            };
            return {
                message: '根据上级规定，对在校大学生进行更加严格的教育管理，请各位师生遵守规定',
                chartData: {
                    columns: ['日期', '正常', '迟到', '缺勤'],
                    rows: [
                        {'日期': '1/1', '正常': 6, '迟到': 1, '缺勤': 0},
                        {'日期': '1/2', '正常': 5, '迟到': 3, '缺勤': 1},
                        {'日期': '1/3', '正常': 6, '迟到': 2, '缺勤': 1},
                        {'日期': '1/4', '正常': 5, '迟到': 1, '缺勤': 1},
                        {'日期': '1/5', '正常': 4, '迟到': 1, '缺勤': 0},
                        {'日期': '1/6', '正常': 3, '迟到': 5, '缺勤': 1},
                        {'日期': '1/7', '正常': 3, '迟到': 5, '缺勤': 1},
                    ]
                },
                list: '',
            }
        },
        methods: {
            getStudentClockInformation() {
                let that = this;
                this.$axios({
                    method: 'post',
                    url: 'http://192.168.43.127:8082/graduation/student/clockInformation',
                }).then(res => {
                    that.list = res.data['list'];
                });
            },
        },
        mounted() {
            this.getStudentClockInformation()
        }
    }
</script>
