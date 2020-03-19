<template>
    <div>
        <button @click="getLocation">啊哈</button>
    </div>
</template>

<script>

    export default {
        name: "Location",
        methods:{
            getLocation() {
                // eslint-disable-next-line no-undef
                var mapObj = new AMap.Map('iCenter');
                mapObj.plugin('AMap.Geolocation', function () {
                    // eslint-disable-next-line no-undef
                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                        timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
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
                    alert(res);
                }
                function onError(obj) {
                    alert(obj.info + '--' + obj.message);
                    console.log(obj);
                }
            },
        },
    }
</script>

<style scoped>

</style>