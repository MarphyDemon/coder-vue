<template>
    <div style="border-bottom: 1px solid #eee;">
        <div style="min-width: 1000px;padding: 0 200px;margin: 0 auto; line-height: 60px;height: 60px;">
            <h1 style="dispaly: inline;float: left;margin-right:50px;">Coder</h1>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router width="1000" style="border: 0; width:600px;display:inline-block;">
                <el-menu-item index="/index">首页</el-menu-item>
                <el-menu-item index="/challenge">挑战</el-menu-item>
                <el-menu-item index="/devote">贡献</el-menu-item>
                <el-menu-item index="/study">学习</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>
            </el-menu>
            <div style="display: inline;float: right;">
                <el-button type="text" style="color:#909399;font-size: 14px;font-weight: 400;width:50px;">{{username}}</el-button>
                <el-button type="text" style="color:#909399;font-size: 14px;font-weight: 400;width:50px;" @click="loginOut">退出</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import API from 'API/api'
import store from '../../store/store'
import axios from 'axios'
export default {
    data() {
        return {
            activeIndex: '/challenge',
            username: store.state.username
        }
    },
    watch: {
        "$route": "urlChange"
    },
    created() {
        this.activeIndex = window.location.pathname =='/question'?'/challenge':this.$router.currentRoute.pathname;
    },
    mounted() {
    },
    methods: {
        handleSelect(val){
            this.activeIndex = val;
        },
        loginOut(){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            delete axios.defaults.headers.common['Authorization'];
            this.$router.push({path: '/login'});
        },
        urlChange() {
            this.activeIndex = this.$router.currentRoute.path=='/question'?'/challenge':this.$router.currentRoute.path;
        }
    }
}
</script>

