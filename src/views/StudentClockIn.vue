<template>
    <div class="ClockIn">
        <!--发起请求时等待的画面-->
        <van-overlay :show="OverlayShow">
            <div class="wrapper" @click.stop>
                <van-loading type="spinner"/>
            </div>
        </van-overlay>

        <!--第一种调用摄像头方式-->
        <div v-show="isDisplayFirstCamera">
            <div>
                <p align="center">请将人脸置于画面之中</p>
            </div>
            <div align="center">
                <video id="video" width="300rem" height="300rem"/>
                <canvas hidden="hidden" id="canvas" width="300rem" height="500rem"/>
            </div>
            <p align="center">
                <button id="open" @click="openCamera">开启摄像头</button>
                <button id="close" @click="closeCamera">关闭摄像头</button>
                <button id="CatchCode" @click="CatchCode">拍照</button>
            </p>
        </div>

        <!--<div class="imgContent">
            <img src="" alt="" id="imgContentImg" width="40%" height="40%">
            <input type="file" class="file" id="imgUpFile" @change="startRead" capture="camera" accept="image/*">
        </div>-->
        <!--<van-uploader :after-read="onRead" accept="image/*" capture="camera" @change="startRead" id="imgUpFile">
            <img src="" alt="" id="imgContentImg" width="40%" height="40%">
            <van-button icon="photo" type="primary">上传文件</van-button>
        </van-uploader>-->

        <!--第二种调用摄像头的方式-->
        <div v-show="isDisplaySecondCamera" style="margin: 3rem auto">
            <van-uploader :after-read="onRead" accept="image/*" capture="camera">
                <van-icon name="user-circle-o" size="2rem" color="grey"/>
                <p>点击此处上传照片</p>
            </van-uploader>
        </div>

        <div style="height: 1.3rem"/>

        <!--登陆成功的弹窗-->
        <van-popup v-model="successShow" position="top" :style="{ height: '60%' }" @closed="goHome">
            <div>
                <div>
                    <van-icon name="completed" size="2rem" color="#07c160" style="margin: 0.4rem"/>
                </div>
                <div>
                    <p style="font-size: 0.3rem">签到成功</p>
                    <div style="height: 0.1rem"/>
                    <p>{{quote}}</p>
                </div>
            </div>
        </van-popup>

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

        <!--第一种签到方式失败的弹窗-->
        <van-popup v-model="isDisplayFirstCameraPopup" position="top" :style="{ height: '60%' }" @closed="goClockIn">
            <div>
                <div>
                    <van-icon name="failure" size="2.5rem" color="red" style="margin: 0.6rem 0 0.3rem 0"/>
                </div>
                <div>
                    <p style="font-size: 0.28rem; margin: .3rem 0 .5rem 0">您的浏览器不支持此种签到方式</p>
                    <p style="font-size: 0.28rem; margin: .3rem 0 .5rem 0">现为您转到另一种方式</p>
                </div>
            </div>
        </van-popup>

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
    import 'jquery'
    import Exif from 'exif-js'
    import Footer from "@/components/StudentFooter";

    export default {
        name: "ClockIn",
        components: {
            Footer,
        },
        data() {
            return {
                quote: '',
                OverlayShow: false,
                video: '',//视频流对象
                context: '',//绘制对象
                canvas: '',//画布对象
                successShow: false,
                failureShow: false,
                //异常原因，暂时设为常量，之后从接口中获取
                failureMessage: '人脸匹配失败，请重新签到',
                files: {
                    name: "",
                    type: "",
                },
                headerImage: null,
                picValue: null,
                upImgUrl: '',
                //第一种打开照相机的方式
                isDisplayFirstCamera: true,
                //第二种打开照相机的方式
                isDisplaySecondCamera: false,
                //第一种签到失败弹窗
                isDisplayFirstCameraPopup: false,
                //获取精度
                longitude: '',
                //获取维度
                latitude: '',
            }
        },

        methods: {
            goClockIn() {
                this.isDisplayFirstCamera = false;
                this.isDisplaySecondCamera = true;
                this.$router.push("/clockIn");
            }
            ,
            // 组件方法 获取 流
            async onRead(file) {
                // console.log(file);
                // console.log(file.file);
                this.files.name = file.file.name; // 获取文件名
                this.files.type = file.file.type; // 获取类型
                this.picValue = file.file; // 文件流
                this.imgPreview(this.picValue);
            }
            ,
            // 处理图片
            imgPreview(file) {
                let self = this;
                let Orientation;
                //去获取拍照时的信息，解决拍出来的照片旋转问题
                Exif.getData(file, function () {
                    Orientation = Exif.getTag(this, "Orientation");
                });
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;
                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    let reader = new FileReader();
                    // 将图片2将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        // console.log(this.result);
                        let result = this.result;
                        let img = new Image();
                        img.src = result;
                        //判断图片是否大于500K,是就直接上传，反之压缩图片
                        if (this.result.length <= 500 * 1024) {
                            self.headerImage = this.result;
                            self.postImg();
                        } else {
                            img.onload = function () {
                                let data = self.compress(img, Orientation);
                                self.headerImage = data;
                                self.postImg();
                            };
                        }
                    };
                }
            }
            ,
            // 压缩图片
            compress(img, Orientation) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                //瓦片canvas
                let tCanvas = document.createElement("canvas");
                let tctx = tCanvas.getContext("2d");
                // let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio;
                if ((ratio = (width * height) / 4000000) > 1) {
                    // console.log("大于400万像素");
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //    铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //如果图片像素大于100万则使用瓦片绘制
                let count;
                if ((count = (width * height) / 1000000) > 1) {
                    // console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                    //      计算每块瓦片的宽和高
                    let nw = ~~(width / count);
                    let nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //修复ios上传图片的时候 被旋转的问题
                if (Orientation != "" && Orientation != 1) {
                    switch (Orientation) {
                        case 6: //需要顺时针（向左）90度旋转
                            this.rotateImg(img, "left", canvas);
                            break;
                        case 8: //需要逆时针（向右）90度旋转
                            this.rotateImg(img, "right", canvas);
                            break;
                        case 3: //需要180度旋转
                            this.rotateImg(img, "right", canvas); //转两次
                            this.rotateImg(img, "right", canvas);
                            break;
                    }
                }
                //进行最小压缩
                let ndata = canvas.toDataURL("image/jpeg", 0.1);
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;
            }
            ,
            // 旋转图片
            rotateImg(img, direction, canvas) {
                //最小与最大旋转方向，图片旋转4次后回到原方向
                const min_step = 0;
                const max_step = 3;
                if (img == null) return;
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height;
                let width = img.width;
                let step = 2;
                if (step == null) {
                    step = min_step;
                }
                if (direction == "right") {
                    step++;
                    //旋转到原位置，即超过最大值
                    step > max_step && (step = min_step);
                } else {
                    step--;
                    step < min_step && (step = max_step);
                }
                //旋转角度以弧度值为参数
                let degree = (step * 90 * Math.PI) / 180;
                let ctx = canvas.getContext("2d");
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0);
                        break;
                }
            }
            ,
            //将base64转换为文件
            dataURLtoFile(dataurl) {
                var arr = dataurl.split(","),
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], this.files.name, {
                    type: this.files.type
                });
            }
            ,
            //上传照相机照片 
            async postImg() {
                this.OverlayShow = true;
                let that = this;
                this.$axios({
                    method: 'post',
                    url: '/face/check',
                    data: {
                        img: that.headerImage.substring(23),
                        lng:localStorage.lng,
                        lat:localStorage.lat,
                        accuracy: localStorage.accuracy,
                        address: localStorage.address
                    },
                }).then(res => {
                    if (res.data['late'] === '迟到') {
                        that.quote = res.data['quote'];
                        that.OverlayShow = false;
                        that.failureShow = true;
                        that.failureMessage = '签到超时，视为迟到';
                        this.closeCamera();
                    }else {
                        if (res.data['isTrue'] === true) {
                            if (res.data['success'] === 'alreadySuccess') {
                                that.quote = '您已经成功签到过，无需重复签到';
                                that.OverlayShow = false;
                                that.successShow = true;
                                this.closeCamera();
                            }else{
                                that.quote = res.data['quote'];
                                that.OverlayShow = false;
                                that.successShow = true;
                                this.closeCamera();
                            }
                        } else {
                            that.OverlayShow = false;
                            that.failureShow = true;
                        }
                        
                    }
                });

            }
            ,
            startRead() {
                let fileDom = document.getElementById('imgUpFile');
                let img = document.getElementById('imgContentImg');
                if (fileDom && img) {
                    this.fileHandle(fileDom, img);
                }
            }
            ,
            fileHandle(fileDom, img) {
                let file = fileDom.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadstart = function () {
                    console.log('文件上传处理');
                };
                //操作完成
                reader.onload = function () {
                    img.setAttribute('src', reader.result);
                };
            }
            ,
            //返回主页
            goHome() {
                this.$router.push("/studentHome");
            }
            ,
            //打开摄像头
            openCamera() {
                let that = this;
                let canvas = this.canvas;
                let context = this.context;
                let video = this.video;
                //获取摄像头对象
                canvas = document.getElementById("canvas");
                context = canvas.getContext("2d");
                //获取视频流
                video = document.getElementById("video");
                let videoObj = {
                    "video": {"facingMode": "user"}
                };
                let errBack = function (error) {
                    that.isDisplayFirstCamera = false;
                    that.isDisplaySecondCamera = true;
                    that.isDisplayFirstCameraPopup = true;
                    console.log("Video capture error: ", error.code);
                };
                let successBack = function (stream) {
                    video.srcObject = stream;
                    video.play();
                };
                context.drawImage(video, 0, 0, 330, 250);

                if (MediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
                    navigator.getUserMedia = MediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                    navigator.getUserMedia(videoObj, successBack, errBack);
                } 
                //初始化摄像头参数
                this.canvas = canvas;
                this.context = context;
                this.video = video;
            }
            ,
            //关闭摄像头
            closeCamera() {
                this.video.srcObject.getTracks()[0].stop();
            }
            ,
            //转换为Base64
            getBase64() {
                let canvas = this.canvas;
                let context = this.context;
                let video = this.video;

                canvas = document.getElementById("canvas");
                context = canvas.getContext("2d");
                //获取视频流
                video = document.getElementById("video");

                context.drawImage(video, 0, 0, 330, 250);

                //获取当前图像并转换为Base64的字符串
                let imgSrc = canvas.toDataURL("image/png");
                //截取字符串
                return imgSrc.substring(22);
            }
            ,
            //上传照片
            CatchCode() {
                this.OverlayShow = true;
                //获取图像
                let img = this.getBase64();
                //Ajax将Base64字符串传输到后台处理
                let that = this;
                
                this.$axios({
                    method: 'post',
                    url: '/face/check',
                    data: {
                        img: img,
                        lng:localStorage.lng,
                        lat:localStorage.lat,
                        accuracy: localStorage.accuracy,
                        address: localStorage.address
                    },
                }).then(res => {
                    if (res.data['late'] === '迟到') {
                        that.quote = res.data['quote'];
                        that.OverlayShow = false;
                        that.failureShow = true;
                        that.failureMessage = '签到超时，视为迟到';
                        this.closeCamera();
                    }else {
                        if (res.data['isTrue'] === true) {
                            if (res.data['success'] === 'alreadySuccess') {
                                that.quote = '您已经成功签到过，无需重复签到';
                                that.OverlayShow = false;
                                that.successShow = true;
                                this.closeCamera();
                            }else{
                                that.quote = res.data['quote'];
                                that.OverlayShow = false;
                                that.successShow = true;
                                this.closeCamera();
                            }
                        } else {
                            that.OverlayShow = false;
                            that.failureShow = true;
                        }

                    }
                });
            }
            ,
        }
    }
</script>

<style scoped>
    @media (max-device-width: 780px) {
        #golist {
            display: block !important;
        }
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .block {
        width: 120px;
        height: 120px;
        background-color: #fff;
    }
</style>