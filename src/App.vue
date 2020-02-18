<template>
    <div id="app">
        <!--左侧导航-->
        <el-container>
            <el-aside width="200px">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose" router>
                    <el-menu-item index="/home">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>

                    <el-submenu index="/application">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>应用管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/config">选项1</el-menu-item>
                            <el-menu-item index="/about">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-menu-item index="/application">
                        <i class="el-icon-document"></i>
                        <span slot="title">配置管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <!--头部内容-->
                <el-header>Header</el-header>
                <!--主体内容-->
                <el-main><router-view/></el-main>
                <!--尾部内容-->
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    /*import HelloWorld from './components/HelloWorld.vue'*/

    export default {
        name: 'App',
        components: {
            /*HelloWorld*/
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
