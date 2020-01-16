<template>
    <div class="product">
        <div ref="menuWrapper" class="menu">
            <ul>
                <li v-for="(item,index) in goods" v-bind:key="index"  v-bind:class="{'current':currentIndex == index}" v-on:click="selectMenu(index,$event)" class="menu-item">
                    <span class="menu-text">
                        <span v-show="item.type>0" v-bind:class="classMap[item.type]" class="support-icon"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div ref="productWrapper" class="product-content">
            <ul>
                <li v-for="(item,index) in goods" v-bind:key="index" class="product-list product-list-hook">
                    <h1 class="product-list-title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,n) in item.foods" v-bind:key="n" class="product-item">
                            <div class="product-icon">
                                <img width="57" height="57" v-bind:src="food.icon" alt="">
                            </div>
                            <div class="product-body">
                                <h2 class="product-name">{{food.name}}</h2>
                                <p class="product-desc">{{food.description}}</p>
                                <div class="product-extra">
                                    <span class="product-count">月售{{food.sellCount}}份</span><span>好評率{{food.rating}}％</span>
                                </div>
                                <div class="product-price">
                                    <span class="now">$ {{food.price}}</span><span v-show="food.oldPrice" class="old">NT$ {{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart v-bind:delivery-price="seller.deliveryPrice" v-bind:min-price="seller.minPrice"/>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcart from '@/views/shopCart/shopcart';
import { mapState,mapActions } from 'vuex';
export default {
    components:{
        shopcart
    },
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            listHeight:[],
            scrollY: 0
        }
    },
    computed: {
        ...mapState(['goods']),
        currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                    return i;
                }
            }
            return 0;
        }
    },
    methods:{
        ...mapActions(['getGoods']),
        initScroll(){
            this.menuScroll = new BScroll(this.$refs['menuWrapper'],{
                click:true
            });
            this.productScroll = new BScroll(this.$refs['productWrapper'],{
                probeType: 3 
            });

            this.productScroll.on('scroll',(position)=>{
                this.scrollY = Math.abs(Math.round(position.y));
            })
        },
        caculateHeight(){
            let productList = this.$refs['productWrapper'].getElementsByClassName('product-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for(let i=0;i<productList.length;i++){
                let item = productList[i];
                height+=item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectMenu(index, event){
            // if(!event._constructed){
            //     return;
            // }
            let productList = this.$refs['productWrapper'].getElementsByClassName('product-list-hook');
            let el= productList[index];
            this.productScroll.scrollToElement(el,300);
        }
    },
    async created(){
        this.classMap = ['decrease','discount','special','invoice','gurantee'];
        await this.getGoods();
        await this.initScroll();
        await this.caculateHeight();
    }
}
</script>