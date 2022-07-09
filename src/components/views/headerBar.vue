<template>
  <div id="nav">
    <div class="nav-c1">
      <div>
        <img class="logo" src="../../assets/images/logo.png" alt="" />
      </div>
      <div class="nav-c1-d2">
        <div class="in-ss">
          <el-input v-model="input" @focus="hotSearchList" @blur="showList" @change="mySearch" placeholder="请输入内容"
            prefix-icon="el-icon-search">
          </el-input>
          <div class="search">
            <div v-if="loading" id="svgLodaing">
              <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20"></circle>
              </svg>
            </div>
            <div ref="list" class="list" v-else>
              <div>热搜榜</div>
              <div class="list_item">
                <div class="list_item2" v-for="(item, index) in hotList" :key="index">
                  <span id="list_item2_s1">{{ index + 1 }}</span>
                  <span @click="getSearch(item.first)" id="list_item2_s2">{{
                      item.first
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-c2">
      <div :plain="true" @click="loginTis">
        <img src="../../assets/images/test.png" alt="" />
        <span for="">注册/登录</span>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 控制loading显示隐藏
      loading: false,
      input: "",
      hotList: [],
    };
  },
  created() {
  },
  methods: {
    //点击搜索推荐给路由跳转传参
    getSearch(first) {
      this.$refs.list.style.display = "none";
      first = encodeURIComponent(first);
      this.$router.push(`/searchSongs?id=${first}`);
      location.reload();
    },
    hotSearchList() {
      // if (this.loading == false) this.$refs.list.style.display = "block";
      // 发起请求,打开loading
      axios.interceptors.request.use((config) => {
        this.loading = true;
        return config;
      });
      // 响应回来关闭loading
      axios.interceptors.response.use((config) => {
        this.loading = false;
        return config;
      });
      axios({
        url: `/api/search/hot`,
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        if ((this.hotList = [])) {
          this.hotList = res.data.result.hots;
        }
        this.$refs.list.style.display = "block";
      });
    },
    showList() {
      setTimeout(() => {
        if (this.loading == false) this.$refs.list.style.display = "none";
      }, 200);
    },
    mySearch(val) {
      this.$router.push(`/searchSongs?id=${val}`);
    },
    loginTis() {
      this.$message.error("登录功能正在维护,多谢体谅!!!");
    },
  },
};
</script>

<style scoped>
/* svg */
.search {
  position: relative;
}
.el-input__prefix{
  transition: all 0s !important;
  left: -5px;
  margin: 0 -10px !important;
}

#svgLodaing {
  position: absolute;
  z-index: 1;
  left: 80px;
}

svg {
  width: 47px;
  transform-origin: center;
  animation: rotate 2s linear infinite;
}

circle {
  fill: none;
  stroke: #fc2f70;
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}

/* list */
.list {
  width: 290px;
  padding: 15px;
  margin-left: -98px;
  background: #ffffff;
  box-shadow: 0px 1px 10px #c2bebe;
  border-radius: 5px;
  margin-top: 5px;
  display: none;
}

.list div {
  font-size: 16px;
  font-weight: 600;
  color: #78797c;
}

.list_item {
  margin-top: 20px;
}

.list_item2 {
  display: flex;
  height: 20px;
  margin-top: 20px !important;
  cursor: pointer;
  position: relative;
}

#list_item2_s1 {
  width: 20px;
}

#list_item2_s2 {
  margin-left: 20px !important;
  color: #000 !important;
  font-size: 16px;
  font-weight: 600;
}

.list_item2 span {
  color: rgb(80, 78, 78) !important;
  margin-top: 0 !important;
  margin-left: 0 !important;
}

.list_item2 ::before {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff000d;
  transform-origin: bottom right;
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.list_item2 :hover::before {
  transform-origin: bottom left;
  transform: scaleX(1);
}

.list_item2 span:nth-child(2) {
  margin-left: 15px;
}

.list_item span:nth-child(2) {
  color: rgb(238, 29, 29);
}

.list_item div:nth-child(1) span:nth-child(1) {
  color: rgb(231, 35, 35) !important;
}

.list_item div:nth-child(2) span:nth-child(1) {
  color: rgb(230, 70, 42) !important;
}

.list_item div:nth-child(3) span:nth-child(1) {
  color: rgb(224, 95, 36) !important;
}

/*  */
#nav {
  width: 100vw;
  height: 64px;
  background-color: #ec4141;
  display: flex;
  justify-content: space-between;
  position: fixed;
}

#nav .nav-c1 {
  width: 580px;
  height: 100%;
  display: flex;
}

#nav .logo {
  text-align: center;
  width: 180px;
  height: 40px;
  margin-top: 10px;
}

#nav .nav-c1-d2 {
  margin-left: 50px;
}

#nav .nav-c1-d2 div {
  margin: 8px 0;
}

#nav .nav-c1-d2 input {
  width: 150px;
  height: 24px;
  border-radius: 20px;
  margin-top: 2px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  outline: none;
  padding-left: 5px;
  margin-left: 20px;
  caret-color: rgba(255, 255, 255, 1);
}

#nav .nav-c1-d2 div label {
  width: 180px;
  margin-top: 2.5px;
  margin-left: 26px;
  color: rgb(255, 255, 255);
  font-size: 14px;
}

#nav .nav-c1-d2 div span {
  margin-top: 5px;
  margin-left: 8px;
  color: rgb(255, 255, 255);
}

.in-ss {
  border-radius: 20px;
  width: 180px;
  height: 28px;
}

#nav .nav-c2 {
  width: 500px;
  height: 100%;
  position: relative;
}

#nav .nav-c2 div {
  width: 200px;
  height: 100%;
  display: flex;
  position: absolute;
  right: 60px;
}

#nav .nav-c2 div img {
  width: 42px;
  height: 42px;
  margin-top: 8px;
  border-radius: 100%;
}

#nav .nav-c2 div span {
  line-height: 60px;
  margin-left: 35px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

/* 穿透 scoped*/
.in-ss>>>.el-input__inner {
  border: 0px !important;
  background: #e13e3e;
  background-image: none !important;
  width: 100%;
}

.in-ss>>>input {
  outline: none;
  border: none !important;
  border-radius: 50px;
  width: 170px;
  height: 30px;
  background-color: #ffffff23;
  box-shadow: none;
}
</style>