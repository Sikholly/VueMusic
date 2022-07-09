<template>
  <div id="leftColumn">
    <ul class="leftColumn-list">
      <li>
        <router-link
          tag="div"
          to="/personality"
          active-class="leftColumn-first"
        >
          <i class="iconfont icon-yinle"></i>
          发现音乐
        </router-link>
      </li>
      <li>
        <div :plain="true" @click="collection">
          <i class="iconfont icon-shipin"></i>视频
        </div>
      </li>
      <li>
        <div :plain="true" @click="collection">
          <i class="iconfont icon-gengduo"></i>收藏
        </div>
      </li>
      <li>
        <router-link tag="div" to="/radioStation" active-class="leftColumn-first">
          <i class="iconfont icon-31dianzan"></i>电台
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    collection() {
      this.$message.error("需要登录才能查看哦!!!");
    },
  },
};
</script>
<style scoped>
/* 左侧导航 */
.leftColumn-list {
  list-style: none;
  margin-top: 20px;
}

.leftColumn-list li {
  margin: 30px 0 20px 0;
}

.leftColumn-list li div {
  width: 100%;
  height: auto;
  padding: 5px 0;
  cursor: pointer;
}

.leftColumn-list li div:hover {
  background-color: rgb(239, 243, 243);
}

.leftColumn-list li i {
  margin-left: 20px;
  font-size: 20px;
  margin-right: 15px;
}

.leftColumn-first {
  font-weight: bold;
}
</style>
