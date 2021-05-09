<template>
  <div class="Login">
    <vue-particles
        color="#fff"
        :particleOpacity="0.3"
        :particlesNumber="666"
        shapeType="circle"
        :particleSize="6"
        linesColor="#fff"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.8"
        :linesDistance="66"
        :moveSpeed="2"
        :hoverEffect="false"
        hoverMode="repulse"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>
    <div class="wrap">
      <el-form label-width="80px" style="width: 100%">
        <el-form-item label="账号">
          <el-input v-model="userName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="passWord" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div style="float: right">
          <el-button size="medium" type="text" style="margin-right: 25px;color: black"
          @click="registerFun()">注册</el-button>
          <el-button size="medium" type="primary" style="background-color: black;border-color: black"
          @click="loginFun()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueParticles from 'vue-particles';
import {apiLogin} from "../Api/http/api";
Vue.use(VueParticles);
export default {
  name: "Login",
  //created创建完毕状态
  created() {
  },
  data() {
    return {
      userName:"",
      passWord:"",
    }
  },
  //事件处理
  methods: {
    registerFun(){
    },
    loginFun(){
      sessionStorage.setItem('userLoginInfo',"{userName:'张三',userId:'475756478462'}");
      const pathUrl = this.$route.query.redirect || '/';
      this.$router.replace({
        path: pathUrl,
      })
      apiLogin({}).then((succ)=>{
        if(succ.code === 0){
          console.log('succ==',succ);
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.Login {
  width: 100%;
  height: 100%;
  background-color: #011a38;
  position: absolute;
  left: 0;
  top: 0;
}
.wrap{
  width: 320px;
  height: 300px;
  box-shadow: 0 0 8px 0 #232323;
  padding-left: 30px;
  padding-right: 65px;
  display: flex;
  align-items: center;
  //background:rgba(255,255,255,1);
  //background-color: #002147;
  background-color: #E9EEF3;
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
}
</style>
