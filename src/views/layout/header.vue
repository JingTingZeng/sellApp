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
                <div v-if="seller.supports" class="support-count">
                    <span class="count">{{seller.supports.length}}個</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
            </div>
        </div>
        <div class="bulletin">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img width="100%" height="100%" v-bind:src="seller.avator" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props:{
        seller:{
            type:Object
        }
    },
    created(){
        this.classMap = ['decrease','discount','special','invoice','gurantee'];
    }
}
</script>