<template>
  <div id="app">
    <!-- 头部 -->
    <header-bar />
    <!-- 解决固定定位覆盖内容 -->
    <div style="width: 1px; height: 64px"></div>
    <!-- 主体内容 -->
    <recommend-music>
    </recommend-music>
    <!-- 底部 -->
    <foont />
    <!-- 解决固定定位覆盖内容 -->
    <div style="width: 1px; height: 55px"></div>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
//引入组件
import HeaderBar from "./components/views/headerBar.vue";
import Foont from "./components/views/foont.vue";
import RecommendMusic from "./components/views/recommendMusic.vue";

export default {
  name: "App",
  //注册组件
  components: { HeaderBar, Foont },
  components: { HeaderBar, Foont, RecommendMusic },
};
</script>

<style>
@import url("//unpkg.com/element-plus/dist/index.css");

.recommendContainer {
  display: flex;
  justify-content: center;
}

.recommend {
  max-width: 1000px;
}

.carousel {
  width: 100%;
}

.el-carousel {
  margin: auto;
  width: 1000px;
}

.el-carousel__item {
  border-radius: 10px;
}

.el-carousel__item img {
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
}

/* 添加类名加高光 */
.highlight {
  font-size: 18px;
  margin: 18px 20px 10px 20px !important;
  border-bottom: 3px solid rgb(236, 65, 65);
}

.el-slider__button {
  width: 15px;
  height: 15px;
  border: 1px solid rgb(147, 179, 204);
}
</style>
