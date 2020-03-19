<template>
    <div class="Login">
        <div style="height: 2rem"/>
        <van-icon name="user-o" size="1.5rem" color="#bbdbff"/>
        <van-form @submit="onSubmit" style="margin: .5rem">
            <van-field
                    v-model="username"
                    name="userName"
                    label="用户名"
                    placeholder="请输入用户名"
                    :rules="[{ required: true, message: '用户名不能为空' }]"
                    size="large"
                    label-align="center"
            />
            <van-field
                    v-model="password"
                    type="password"
                    name="userPassword"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '密码不能为空' }]"
                    size="large"
                    label-align="center"
            />
            <van-field
                    v-model="identity"
                    readonly
                    clickable
                    name="identity"
                    label="登录身份"
                    :value="identity"
                    placeholder="请选择身份"
                    @click="showPicker = true"
            />
            
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="columns"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                />
            </van-popup>
            
            <div style="margin: .8rem;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {Encrypt} from '@/js/utils'
    export default {
        name: "Login",
        
        data() {
            return {
                username: '',
                password: '',
                columns: ['student','teacher','manager'],
                identity: '',
                showPicker: false,
            };
        },
        methods: {
            onSubmit(values) {
                this.$axios({
                    method: 'post',
                    url: '/login/login',
                    data: {
                        userName: Encrypt(values['userName']),
                        userPassword:Encrypt(values['userPassword']),
                        identity: Encrypt(values['identity'])
                    },
                }).then(res => {
                    if (res.data['isTrue'] === true){
                        localStorage.userMajor = res.data['major'];
                        localStorage.userIdentity = res.data['identity'];
                        this.$router.push("/" + res.data['identity'] + "Home");
                        if (res.data['identity'] === 'teacher') {
                            localStorage.teacherName = res.data['teacherName'];
                        }
                        if (res.data['identity'] === 'student') {
                            localStorage.studentName = res.data['studentName'];
                        }
                    } else{
                        console.log("err");
                    }
                });
            },
            
            //登录身份选择器确认的点击事件
            onConfirm(value) {
                this.identity = value;
                this.showPicker = false;
            },
            
        },
    }
</script>

<style scoped>
        
</style>