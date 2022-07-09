// 引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

// 注册vuex
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //音乐路径
        musicUrl: [],
        //歌曲的id
        musicName: [],
        //歌手
        musicArName: [],
        //歌曲图片
        musicImg:[],
        //歌曲时间
        musicTime:[]
    },
    //改变state值
    mutations: {
        //给vuex添加 音乐地址
        addMusicUrl(state, MusicId) {
            state.musicUrl.unshift(`https://music.163.com/song/media/outer/url?id=${MusicId}.mp3`);
        },
        //给vuex添加 音乐名字
        addMusicName(state, musicName) {
            state.musicName.unshift(musicName);
        },
        //给vuex添加 歌手名字
        addMusicArName(state, musicArName) {
            state.musicArName.unshift(musicArName)
        },
        //给vuex添加 图片
        addMusicImg(state, musicImg) {
            state.musicImg.unshift(musicImg)
        },
        //给vuex添加 时间
        addMusicTime(state, musicTime) {
            state.musicTime.unshift(musicTime)
        }
    },
    actions: {
        addMusicInFo(context, step) {
            axios({
                url: `/api/song/detail?ids=${step}`,
                method: "get",
            }).then((res) => {
                // 歌曲名称
                // console.log(res.data.songs[0].name);
                context.commit('addMusicName', res.data.songs[0].name)
                // 歌曲歌手
                // console.log(res.data.songs[0].ar[0].name)
                context.commit('addMusicArName',res.data.songs[0].ar[0].name)
                //歌曲图片
                // console.log(res.data.songs[0].al.picUrl)
                context.commit('addMusicImg',res.data.songs[0].al.picUrl)
            });
        }
    }
})