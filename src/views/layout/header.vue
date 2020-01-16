<template>
    <div class="header">
        <div class="header-content">
            <div class="avatar">
                <img width="64" height="64" v-bind:src="seller.avator" alt="">
            </div>
            <div class="header-body">
                <div class="header-title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="header-description">
                    {{seller.description}}/{{seller.deliveryTime}}分鐘送達
                </div>
                <div v-if="seller.supports" class="support">
                    <span v-bind:class="classMap[seller.supports[0].type]" class="support-icon"></span>
                    <span class="support-text">{{seller.supports[0].description}}</span>
                </div>
                <div v-if="seller.supports" v-on:click="toggleDetail" class="support-count">
                    <span class="count">{{seller.supports.length}}個</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
            </div>
        </div>
        <div v-on:click="toggleDetail" class="bulletin">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img width="100%" height="100%" v-bind:src="seller.avator" alt="">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-content clearfix">
                    <div class="detail-body">
                        <h1 class="detail-name">{{seller.name}}</h1>
                        <div class="detail-star-content">
                            <star v-bind:size="48" v-bind:score="seller.score"/>
                        </div>
                        <div class="detail-title">
                            <div class="line"></div>
                            <div class="text">優惠訊息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li v-for="(item,index) in seller.supports" v-bind:key="index" class="support-item">
                                <span v-bind:class="classMap[item.type]" class="support-icon"></span>
                                <span class="support-text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="detail-title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="detail-bulletin">
                            <p class="detail-bulletin-content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div v-on:click="toggleDetail" class="detail-close">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '@/components/star';
export default {
    components:{
        star
    },
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            detailShow:false
        }
    },
    methods:{
        toggleDetail(){
            this.detailShow = !this.detailShow; 
        }
    },
    created(){
        this.classMap = ['decrease','discount','special','invoice','gurantee'];
    }
}
</script>