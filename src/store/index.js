const baseUrl = "http://localhost:3000";
import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        seller:{},
        goods:[],
        ratings:[]
    },
    getters:{
        // getSeller: (state) => state.seller
    },
    mutations:{
        setSeller(state, data){
            state.seller = data;
        },
        setGoods(state, list){
            state.goods = list;
        },
        setRatings(state, list){
            state.ratings = list;
        }
    },
    actions:{
        async getSeller ({ commit }) {
            const { data } = await axios.get(`${baseUrl}/seller`);
            commit('setSeller', data);
        },
        async getGoods ({ commit }) {
            const { data } = await axios.get(`${baseUrl}/goods`);
            commit('setGoods', data);
        },
        async getRatings ({ commit }) {
            const { data } = await axios.get(`${baseUrl}/ratings`);
            commit('setRatings', data);
        }
    }
});