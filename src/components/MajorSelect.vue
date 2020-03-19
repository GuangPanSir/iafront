<template>
    <div class="MajorSelect">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            请选择签到课程
        </van-divider>
        <van-picker :columns="columns"
                    ref="picker"
                    @change="change"
        />
    </div>
</template>

<script>
    export default {
        name: "MajorSelect",
        data(){
            return{
                lng: '',
                lat: '',
                address: '',
                major: '',
                project: '',
                teacher: '',
                columns: [
                    // 第一列
                    {
                        values: [],
                    },
                    // 第二列
                    {
                        values: [],
                    },
                    // 第二列
                    {
                        values: [],
                    }
                ],
            }
        },
        methods:{
            getLocation() {
                let that = this;
                // eslint-disable-next-line no-undef
                var mapObj = new AMap.Map('iCenter');
                mapObj.plugin('AMap.Geolocation', function () {
                    // eslint-disable-next-line no-undef
                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                        timeout: 20000,           // 超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
                        convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    });
                    geolocation.getCurrentPosition();
                    // eslint-disable-next-line no-undef
                    AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
                    // eslint-disable-next-line no-undef
                    AMap.event.addListener(geolocation, 'error', onError);       // 返回定位出错信息
                });
                function onComplete(obj){
                    console.log(obj);
                    // eslint-disable-next-line no-unused-vars
                    var res = '经度' + obj.position.lng +
                            '\n纬度：' + obj.position.lat +
                            '\n精度范围：' + obj.accuracy +
                            '米\n定位结果的来源：' + obj.location_type +
                            '\n状态信息：' + obj.info +
                            '\n地址：' + obj.formattedAddress +
                            '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
                    that.lng = obj.position.lng;
                    that.lat = obj.position.lat;
                    that.address = JSON.stringify(obj.addressComponent, null, 4);
                    localStorage.lng = obj.position.lng;
                    localStorage.lat = obj.position.lat;
                    localStorage.accuracy = obj.accuracy;
                    localStorage.address = JSON.stringify(obj.addressComponent, null, 4);
                }
                function onError(obj) {
                    alert(obj.info + '--' + obj.message);
                    console.log(obj);
                }
            },
            init() {
                this.major = this.$refs.picker.getValues()[0];
                this.project = this.$refs.picker.getValues()[1];
                this.teacher = this.$refs.picker.getValues()[2];
            },
            change() {
                this.init();
                // setTimeout(() => this.getProject(this.$refs.picker.getValues()[0]), 500);
                this.getProject(this.$refs.picker.getValues()[0]);
                // this.getTeacher(this.$refs.picker.getValues()[1])
                setTimeout(() => this.getTeacher(this.$refs.picker.getValues()[1]), 500);
            },
            getMajor() {
                let that = this;
                this.$axios({
                    method: 'post',
                    url: '/clock/clockSelect/major',
                }).then(res => {
                    that.columns[0]['values'] = res.data;
                });
            },
            getProject(major) {
                // this.major = this.$refs.picker.getValues()[0];
                let that = this;
                this.$axios({
                    method: 'post',
                    data: {
                        // data: that.$refs.picker.getValues()[0],
                        data: major
                    },
                    url: '/clock/clockSelect/project',
                }).then(res => {
                    that.columns[1]['values'] = res.data;
                });
            },
            getTeacher(project) {
                // this.project = this.$refs.picker.getValues()[1];
                let that = this;
                this.$axios({
                    method: 'post',
                    data: {
                        // data: that.$refs.picker.getValues()[1],
                        data: project,
                    },
                    url: '/clock/clockSelect/teacher',
                }).then(res => {
                    that.columns[2]['values'] = res.data;
                });
            },
        },
        mounted() {
            this.getMajor();
            this.getProject("物联网工程");
            this.getTeacher("Java程序语言设计");
            this.getLocation();
        },
    }
</script>

<style scoped>
</style>