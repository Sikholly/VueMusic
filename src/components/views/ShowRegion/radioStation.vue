<template>
  <div class="latest_video" v-if="isShow">
    <div class="latest_title">
      <h3>
        热门电台<i
          class="iconfont icon-jiantouyou"
          style="color: rgb(177, 177, 177)"
        ></i>
      </h3>
    </div>
    <div class="HotRadioStation">
      <div
        class="HotItem"
        v-for="(item, index) in itemRadioStation"
        :key="index"
      >
        <img :src="item.picUrl" alt="" />
        <div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 全部电台数据
      itemRadioStation: [],
      isShow: false,
    };
  },
  created() {
    axios({
      url: "/api/dj/hot",
      method: "get",
      params: { limit: 20 },
    }).then((res) => {
      this.itemRadioStation = res.data.djRadios;
      this.isShow = true;
    });
  },
};
</script>

<style>
.latest_title {
  margin-bottom: 20px;
}
.latest_video {
  width: 1100px;
  margin: 0 auto;
}
.HotRadioStation {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.HotItem {
  /* width: 100%; */
  cursor: pointer;
  height: 220px;
}
.HotItem > div {
  width: 258px;
  height: 45px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.HotRadioStation img {
  border-radius: 10px;
  width: 258px;
  height: 164px;
}
</style>