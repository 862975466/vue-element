<template>
  <div class="Home">
    <el-container>
      <el-header>Header</el-header>
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
    }
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
</style>
