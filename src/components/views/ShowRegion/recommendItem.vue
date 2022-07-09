<template>
  <div id="exhibition" v-if="isShow">
    <!-- https://p1.music.126.net/KZryrneGU7_Y-dL5IMUkew==/109951165622964474.jpg -->
    <div id="exhibition-detailed">
      <div id="exhibition-detailed-header">
        <div>
          <img class="tis" :src="coverImgUrl" alt="" />
        </div>
        <div class="exhibition-detailed-header-title">
          <div class="title-item1">
            <div><span class="ts">歌单</span></div>
            <div>
              <span class="title">{{ songName }}</span>
            </div>
          </div>
          <div class="download">
            <ul>
              <li @click="playAll()">播放全部</li>
              <li>收藏</li>
              <li>分享</li>
            </ul>
          </div>
          <div class="SmallLabel">
            <div class="label">
              <span>标签 :
                <span style="color: rgb(52, 150, 216)">
                  {{ songTags[0] }}
                </span>
                <span style="color: rgb(52, 150, 216)">
                  {{ songTags[1] }}
                </span>
                <span style="color: rgb(52, 150, 216)">
                  {{ songTags[2] }}
                </span>
              </span>
            </div>
            <div class="song">
              <span>歌曲 : {{ subscribedCount }}</span>
              <span style="margin-left: 30px">播放 : {{ playCount }}</span>
            </div>
            <div class="briefIntroduction">
              <span>
                简介 :
                {{ description }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div id="exhibition-detailed-header2"></div> -->
      <div class="SongNavigation">
        <div class="SongNavigation-Nav">
          <ul>
            <li id="Highlight">歌曲列表</li>
            <li>评论</li>
            <li>收藏者</li>
          </ul>
        </div>
      </div>
      <div class="MusicList">
        <table border="0">
          <tr>
            <th style="height: 30px"></th>
            <th class="td2">标题</th>
            <th class="td2">歌手</th>
            <th class="td2">专辑</th>
            <th>时间</th>
          </tr>
          <tr v-for="(item, index) in allSongs" :key="index">
            <td class="td2" style="width: 100px">{{ index + 1 }}</td>
            <td class="td2" style="width: 350px" @click="obtainUrl(item.id, listTime.duration[index])">
              {{ item.name }}
            </td>
            <td class="td2" style="width: 300px">{{ item.ar[0].name }}</td>
            <td class="td2" style="width: 200px">{{ item.name }}</td>
            <td style="width: 200px">{{ listTime.duration[index] }}</td>
          </tr>
          <div style="width:100%;height: 60px;"></div>
        </table>
        <!-- <audio autoplay :src="urlSong"></audio> -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  namspaced: true,
  data() {
    return {
      coverImgUrl: [],
      songName: [],
      songTags: [],
      subscribedCount: [],
      playCount: [],
      description: [],
      allSongs: [],
      listTime: {
        duration: [],
      },
      urlSong: [],
      isShow: false
    };
  },
  computed: {},
  methods: {
    playAll() {
      for (let i = 0; i < this.allSongs.length; i++) {
        this.$store.commit('addMusicUrl', this.allSongs[i].id);
        this.$store.dispatch('addMusicInFo', this.allSongs[i].id);
        this.$store.commit("addMusicTime", this.listTime.duration[i]);
      }
    },
    // 使用到vueX
    obtainUrl(url, time) {
      this.$store.commit('addMusicUrl', url);
      //
      this.$store.dispatch('addMusicInFo', url)
      //
      this.$store.commit("addMusicTime", time);
      // console.log(url);
    },
  },
  // 生命周期钩子created
  created() {
    // 响应回来关闭loading
    axios.interceptors.response.use((config) => {
      this.isShow = true;
      return config;
    });
    axios({
      // 获取歌单详情 /playlist/detail?id=24381616
      url: `/api/playlist/detail`,
      method: "get",
      params: {
        id: this.$router.history.current.query.id,
        // limit:10,
        // offset:0
      },
    }).then((res) => {
      // 图片url
      // console.log(res.data.playlist.coverImgUrl);
      this.coverImgUrl = res.data.playlist.coverImgUrl;
      //歌单名字
      // console.log(res.data.playlist.name);
      this.songName = res.data.playlist.name;
      // 标签
      // console.log(res.data.playlist.tags);
      this.songTags = res.data.playlist.tags;
      // 歌曲
      // console.log(res.data.playlist.subscribedCount);
      this.subscribedCount = res.data.playlist.subscribedCount;
      // 播放次数
      // console.log(res.data.playlist.playCount);
      this.playCount = res.data.playlist.playCount;
      // 简介
      // console.log(res.data.playlist.description);
      this.description = res.data.playlist.description;

    });
    // 歌曲列表
    axios({
      // 获取歌单详情 /playlist/detail?id=24381616
      url: `/api/playlist/track/all`,
      method: "get",
      params: {
        id: this.$router.history.current.query.id,
        limit: 15,
        offset: 0,
      },
    }).then((res) => {
      this.allSongs = res.data.songs;
      // this.dt = res.data.songs.dt;
      // 把毫秒遍历成为分秒使用for循环完成 可以使用过滤器完成更加方便
      for (let i = 0; i < res.data.songs.length; i++) {
        let duration = res.data.songs[i].dt;
        let min = parseInt(duration / 1000 / 60);
        let sec = parseInt((duration / 1000) % 60);
        // 补0
        if (min < 10) min = "0" + min;
        if (sec < 10) sec = "0" + sec;
        this.listTime.duration[i] = `${min}分${sec}秒`;
      }
    });
  },
};
</script>
<style scoped>
#exhibition {
  margin: 0 auto;
  width: calc(100% - 200px);
  margin: 0 auto;
  max-height: calc(100vh - 124px);
}

#exhibition-detailed {
  width: 1200px;
  height: 800px;
  margin: 20px auto 0 auto;
  /* 控制可以延y轴滚动 */
}

.tis {
  width: 170px;
  height: 170px;
  border-radius: 15px;
}

#exhibition-detailed-header {
  display: flex;
}

.ts {
  color: rgb(255, 0, 0);
  padding: 1px;
  font-size: 12px;
  border: 1px solid red;
  border-radius: 3px;
}

.title {
  font-size: 22px;
  font-weight: 600;
  line-height: 23px;
  margin-left: 10px;
}

.title-item1 {
  display: flex;
}

.exhibition-detailed-header-title {
  margin-left: 30px;
  /* display: flex; */
  margin-top: 20px;
}

.download {
  margin-top: 13px;
  margin-left: -9px;
}

.download ul {
  display: flex;
  list-style: none;
}

.download ul li {
  border: 1px solid red;
  border-radius: 50px;
  padding: 2px 10px;
  margin: 0 7px;
  cursor: pointer;
}

.download ul li:nth-child(1) {
  background-color: red;
  color: aliceblue;
}

.download ul li:nth-child(2),
.download ul li:nth-child(3) {
  color: rgb(130, 136, 141);
  border: 1px solid rgb(214, 202, 202);
}

.SmallLabel {
  width: 100%;
  margin-top: 10px;
}

.SmallLabel div {
  width: 100%;
  margin-top: 5px;
  color: rgb(105, 99, 99);
}

.label,
.song,
.briefIntroduction {
  width: 900px !important;
  white-space: nowrap;
  /*溢出部分文字隐藏*/
  overflow: hidden;
  /*溢出部分省略号处理*/
  text-overflow: ellipsis;
  font-size: 14px;
}

.briefIntroduction span {
  width: 500px;
  height: auto;
}

.SongNavigation {
  margin-top: 20px;
}

.SongNavigation-Nav ul {
  display: flex;
}

.SongNavigation-Nav ul li {
  list-style: none;
  font-size: 16px;
  cursor: pointer;
}

.SongNavigation-Nav ul li:nth-child(2),
.SongNavigation-Nav ul li:nth-child(3) {
  margin-left: 30px;
}

#Highlight {
  font-size: 20px;
  margin-top: -5px;
  border-bottom: 3px solid rgb(236, 65, 65);
}

.MusicList {
  width: 100%;
  height: 100px;
}

.table {
  width: 100%;
  height: 500px;
}

td {
  height: 32px;
  text-align: center;
  cursor: pointer;
}

.td2 {
  text-align: left;
}
</style>
