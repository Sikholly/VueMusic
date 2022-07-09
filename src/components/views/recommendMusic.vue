<template>
  <div id="mian">
    <!-- 左导航栏 -->
    <!-- 左导航栏组件 -->
    <left-column />
    <!-- 展示区 -->
    <!-- height: calc(80vh - 105px) -->
    <recommend></recommend>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
import leftColumn from "./leftColumn";
import recommend from "./ShowRegion/recommend.vue";
export default {
  components: { leftColumn, recommend },
};
</script>

<style scoped>
/* 2阶段 */
#mian {
  display: flex;
}

#leftColumn {
  width: 200px;
  position: fixed;
  height: calc(100vh - 124px);
  border-right: 1px solid rgb(206, 201, 201);
}
</style>