<template>
  <div class="Home">
    <el-container>
      <el-header class="flex-start">
        <div class="flex-row" style="width: 100%;">
          <div>logo</div>
          <div class="nav-right">
            <el-dropdown>
              <div class="funtilt flex-start">
                <p class="userNameIcon">{{userName | userNameIcon}}</p>
                <p style="color: #fff;cursor: pointer">{{userName}}</p>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人资料</el-dropdown-item>
                <el-dropdown-item>安全设置</el-dropdown-item>
                <el-dropdown-item @click.native="cancelProiect">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container id="container">
        <el-aside width="220px">
          <el-menu :default-openeds="openedsActive" :default-active="openedsActive[1]" @select="selectFunli"
                   @close="closeFunli" @open="openFunli" style="height: 100%">
            <el-scrollbar style="height: 100%">
              <el-menu-item index="/">首页</el-menu-item>
              <el-submenu v-for="(item,index) in navList" :index="item.path" :key="index">
                <template slot="title">{{item.name}}</template>
                <el-menu-item v-for="(itemC,indexC) in item.child" :index="itemC.path" :key="indexC">
                  {{itemC.name}}
                </el-menu-item>
              </el-submenu>
            </el-scrollbar>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navList from '@/utils/navList'
export default {
  name:'Home',
  data() {
    return {
      openedsActive:[null,'/'],
      navList: navList,
      userName:'张三'
    }
  },
  //过滤器
  filters: {
    userNameIcon(userName){
      if(userName.length > 2){
        userName = userName.substring((userName.length-2),(userName.length))
      }
      return userName;
    },
  },
  //created创建完毕状态
  created() {
    this.loadUpdateDAta();
  },
  methods:{
    selectFunli(key, keyPath){
      console.log('selectFunli==',key,keyPath);
      if(key===1){
        key = '/';
      }
      this.$router.push({path:key});
      //点击首页在收起
      if(key=='/'){
        this.openedsActive = [null,'/'];
      }
    },
    //打开下级
    openFunli(){
      return false;
      // console.log('selectFunli1234==',key,keyPath);
      // const keyS = key + '';
      // const keyPathS = key+'Main';
      // //设置默认选中第一个
      // this.openedsActive = [keyS,keyPathS];
      // //路由跳转
      // this.$router.push({path:keyPathS});
    },
    //关闭
    closeFunli(){
    },
    //初始化更新
    loadUpdateDAta(){
      this.letNavList = navList;
      //更新视图
      this.openedsActive = ['',this.$route.path];
    },
    cancelProiect(){
      //sessionStorage.removeItem('userLoginInfo');
      sessionStorage.clear();
      this.$router.replace({
        path:'/login'
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-header {
  height: 55px;
  background-color: $color-primary;
}
#container{
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #E9EEF3;
}
.el-aside {
  background-color: #ffffff;
}

.el-main {
}
.funtilt{
  cursor: pointer;
  p {
    height: 40px;
    line-height: 40px;
    margin: 0;
  };
  .userNameIcon{
    width: 40px;
    margin-right: 5px;
    border-radius: 50%;
    text-align: center;
    color:$color-primary;
    background-color: #ffffff;
  }
}
</style>
