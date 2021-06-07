<template>
  <div class="indexMain">
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <el-button @click="pupopFun()">语言切换</el-button>
    <div>{{$t('login.password')}}</div>
  </div>
</template>

<script>
export default {
  name: "indexMain",
  //组件通讯
  props: [],
  //created创建完毕状态
  created() {
  },
  data() {
    return {
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    }
  },
  //组件注册
  components: {},
  //过滤器
  filters: {},
  //计算属性
  computed: {},
  //事件处理
  methods: {
    pupopFun(){
      const lant = localStorage.getItem('lang');
      let thisLant = lant;
      if(lant === 'en'){
        thisLant = 'cn';
      }else {
        thisLant = 'en';
      }
      this.$i18n.locale = thisLant;
      localStorage.setItem('lang',thisLant);
    }
  },
  //监听方法
  watch: {}
}
</script>

<style lang="scss" scoped>
.indexMain {
}
</style>
