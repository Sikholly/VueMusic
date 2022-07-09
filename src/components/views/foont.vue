<template>
  <div id="foont">
    <div id="playMusic">
      <!--controls -->
      <audio autoplay class="audio" ref="audio" @ended="automaticPlayMusic" :src="$store.state.musicUrl[musicSubScript]"
        @canplay="getDuration" @timeupdate="updateTime"></audio>
    </div>
    <div class="foont-list1">
      <div class="foont-list-item">
        <img :src="$store.state.musicImg[musicSubScript]" alt="" />
      </div>
      <div class="foont-list-item" id="foont-list-item">
        <p>{{ $store.state.musicName[musicSubScript] }}</p>
        <p>{{ $store.state.musicArName[musicSubScript] }}</p>
      </div>
    </div>
    <div class="foont-list2">
      <div class="foont-list2-info">
        <span @click="lastSongMusic">
          <i class="iconfont icon-shangyishou"></i>
        </span>
        <!-- 开始按钮 -->
        <span @click="PlayOrPause" v-show="isPlay">
          <i class="iconfont icon-zanting"></i>
        </span>
        <!-- 暂停按钮 -->
        <span class="suspend" v-show="!isPlay" @click="PlayOrPause">
          <svg t="1648278707682" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4549" width="200" height="200">
            <path d="M204.58705 951.162088 204.58705 72.836889 819.41295 511.998977Z" p-id="4550"></path>
          </svg>
        </span>
        <span @click="nextSongMusic">
          <i class="iconfont icon-xiayishou"></i>
        </span>
      </div>
      <!-- ui -->
      <div class="foont-list2-info2">
        <div class="foont-list2-block">
          <span style="margin-right: 16px; font-size: 14px">{{
              conversionCurrentTime
          }}</span>
          <!-- ui歌曲时间 -->
          <el-slider :show-tooltip="false" v-model="currentTime" @change="changeCurrentTime"></el-slider>
          <span style="margin-left: 16px; font-size: 14px">
            {{ conversion }}</span>
        </div>
      </div>
      <!--  -->
    </div>
    <div class="foont-list3">
      <div class="foont-list3-info">
        <div class="foont-list3-block">
          <span style="margin-right: 16px">
            <i style="font-size: 22px" class="iconfont icon-yinliang"></i>
          </span>
          <!-- 音量ui滑块 -->
          <div style="width: 100px" @mousedown="isDraging = true" @mouseup="isDraging = false">
            <el-slider :show-tooltip="false" @input="changVolume" v-model="volume"></el-slider>
          </div>

          <span @click="drawer = true" type="primary" style="margin-left: 16px">
            <i style="font-size: 24px" class="iconfont icon-zhankaicaidan"></i>
          </span>
        </div>
      </div>
      <div class="foont-list3-info">
        <div ref="tooltip" class="tooltip">
          <div role="tooltip" id="el-tooltip-7556" aria-hidden="true" class="el-tooltip__popper is-dark"
            style="transform-origin: right center;z-index: 2037;display: block;">
            <div data-v-af883cd6="">
              <div style="text-align:center;font-size:12px;">
                个人邮箱: 2675670864@qq.com<br>本站为仿网易云音乐展示项目, 仅供学习使用!</div>
            </div>
            <div x-arrow="" class="popper__arrow" style="top: 25.5px;"></div>
          </div>
        </div>
        <span @mouseenter="darkMove" @mouseleave="darkMoveT" class="dark"
          style="margin-right: 60px;margin-top: -5px;">本站版权信息</span>
      </div>
    </div>
    <!-- ui歌单列表 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :append-to-body="true"
      :modal-append-to-body="false" :size="400" @open="openDrawer()">
      <span>共{{ numOfSongs }}首</span>
      <table class="drawer_table">
        <tr v-for="(item, index) in numOfName" :key="index">
          <td>{{ item }}</td>
          <td>{{ numOfArName[index] }}</td>
          <td>{{ numOfArTime[index] }}</td>
        </tr>
      </table>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 音量
      volume: 70,
      //歌曲全长
      duration: 0,
      //歌曲当前长度
      currentTime: 0,
      // 解决滑块回弹问题
      isDraging: false,
      // 播放设置
      isPlay: false,
      //时间换算
      listTime: {
        duration: [],
        currentTime: null,
      },
      // 控制vuex下标
      musicSubScript: 0,
      // 控制抽屉的显示
      drawer: false,
      // 歌曲数
      numOfSongs: 0,
      // 歌曲名称
      numOfName: [],
      // 歌手
      numOfArName: [],
      // 歌时间1
      numOfArTime: [],
    };
  },
  created() {
    this.iconPlay();
  },
  computed: {
    //使用计算属性来 换算分秒
    conversion() {
      if (this.duration != 0) {
        let dution = this.duration;
        let min = parseInt(dution / 60);
        let sec = parseInt(dution % 60);
        // 补0
        if (min < 10) min = "0" + min;
        if (sec < 10) sec = "0" + sec;
        return `${min}:${sec}`;
      } else {
        return "00:00";
      }
    },
    conversionCurrentTime() {
      if (this.duration != 0) {
        let dution = this.listTime.currentTime;
        let min = parseInt(dution / 60);
        let sec = parseInt(dution % 60);
        // 补0
        if (min < 10) min = "0" + min;
        if (sec < 10) sec = "0" + sec;
        return `${min}:${sec}`;
      } else {
        return "00:00";
      }
    },
  },
  methods: {
    darkMove() {
      this.$refs.tooltip.style.display = "block";
    },
    darkMoveT() {
      this.$refs.tooltip.style.display = "none";
    },
    iconPlay() {
      let audioPlayer = document.querySelector('.audio');
      if (audioPlayer != "" || audioPlayer != null) this.isPlay = true;
    },
    openDrawer() {
      this.numOfSongs = this.$store.state.musicName.length;
      this.numOfName = this.$store.state.musicName;
      this.numOfArName = this.$store.state.musicArName;
      this.numOfArTime = this.$store.state.musicTime;
    },
    automaticPlayMusic() {
      if (this.musicSubScript < this.$store.state.musicImg.length - 1) {
        this.musicSubScript++;
      }
    },
    changVolume(val) {
      this.$refs.audio.volume = val / 100;
    },
    //获取歌曲全长
    getDuration() {
      //此时可以获取到duration
      this.duration = this.$refs.audio.duration;
    },
    //滑动
    changeCurrentTime(val) {
      // val 将val转化为真实播放时间
      this.$refs.audio.currentTime = val * (this.duration / 100);
      // console.log("滑动到位置" + val * (this.duration / 100));
    },
    // 歌曲时间更新回调
    updateTime(e) {
      if (!this.isDraging) {
        //  现长 / 格式全长除于100  转化为百分比时间  e.target.currentTime; //获取audio当前播放时间
        this.currentTime = e.target.currentTime / (this.duration / 100);
        // 把音乐正在播放真实时间赋值
        this.listTime.currentTime = e.target.currentTime;
        //
      }
    },
    // 控制音乐播放和暂停
    PlayOrPause() {
      // 可以使用判断来写 为了简化代码使用三元判断
      return this.isPlay ? this.Pause() : this.Play();
    },
    // 播放音乐 由 PlayOrPause() 调用
    Play() {
      this.$refs.audio.play();
      this.isPlay = true;
    },
    // 暂停音乐 由 PlayOrPause() 调用
    Pause() {
      this.$refs.audio.pause();
      this.isPlay = false;
    },
    //上一首
    lastSongMusic() {
      if (this.musicSubScript >= 1) {
        this.musicSubScript--;
      }
    },
    // 下一首
    nextSongMusic() {
      if (this.musicSubScript < this.$store.state.musicImg.length - 1) {
        this.musicSubScript++;
      }
    },
  },
};
</script>

<style scoped>
/* 脚步 */
#foont {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgba(218, 218, 218, 0.63);
  z-index: 999;
}

i {
  cursor: pointer;
}

.foont-list1 {
  flex: 0 0 20%;
  display: flex;
  justify-content: center;
}

.foont-list-item {
  margin-top: 4px;
}

.foont-list-item img {
  width: 48px;
  margin-right: 20px;
}

.foont-list-item p {
  font-size: 12px;
}

.foont-list-item>p:first-child {
  font-weight: 500;
  font-size: 16px;
  margin-top: 3px;
}

#foont-list-item {
  width: 200px;
  height: 60px;
  white-space: nowrap;
  /* 2.超出的部分隐藏 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* 3.文字用省略号替代超出的部分 */
  text-overflow: ellipsis;
}

.foont-list2 {
  width: 100%;
  flex: 0 0 60%;
  display: block;
}

.foont-list3 {
  flex: 0 0 20%;
}

.foont-list2-info {
  display: flex;
  width: 100%;
  text-align: center;
  display: inline-block;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.foont-list2-info2 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.foont-list2-info span i {
  text-align: center;
  font-size: 24px;
  margin: 0 20px;
}

/* ui滑块自定义样式 da */
.foont-list2-block {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.foont-list2-block p {
  margin: 0 20px;
}

/* ui滑块自定义样式 xiao */
.foont-list3-block {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.foont-list3-info {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 5px;
  margin-right: 20px;
}

.foont-list3-info>span {
  font-size: 14px;
  color: rgb(141, 131, 131);
}

.suspend {
  width: 64px;
  height: 21px;
  margin: 0 16px;
}

.suspend svg {
  width: 30px;
  height: 21px;
}

.drawer_table {
  width: 100%;
  margin: 20px 0;
}

.drawer_table td {
  cursor: pointer;
  font-size: 14px;
  color: rgb(39, 39, 39);
}

.drawer_table>tr td:nth-child(1) {
  text-align: left;
  text-align: left;
  width: 175px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.drawer_table>tr td:nth-child(2) {
  width: 150px;
  text-align: center;
  height: 50px;
}

.drawer_table>tr td:nth-child(3) {
  width: 100px;
  height: 50px;
  text-align: right;
}

.tooltip {
  display: none;
  width: 300px;
  height: 100px;
  position: absolute;
  right: 160px;
  bottom: -57px;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
  line-height: 1.2;
  min-width: 10px;
  word-wrap: break-word;
}

.is-dark {
  position: relative;
}

.is-dark:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left-color: #303133;
  right: -15px;
  margin-left: -4px;
  bottom: 5px;
}

.dark {
  cursor: pointer;
}

.dark:hover {
  border-bottom: 1px solid rgb(112, 112, 112);
}
</style>