<template>
<div>
    <div class="shopcart">
        <div v-on:click="toggleList" class="shopcart-content">
            <div class="shopcart-left">
                <div class="shopcart-icon-content">
                    <div  v-bind:class="{'hightlight':totalCount>0}" class="shopcart-icon">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div v-show="totalCount>0" class="num">{{totalCount}}</div>
                </div>
                <div v-bind:class="{'hightlight':totalPrice>0}" class="shopcart-amount-price">${{totalPrice}}</div>
                <div class="shopcart-desc">另需運費${{deliveryPrice}}</div>
            </div>
            <div v-on:click.stop.prevent="pay" class="shopcart-right">
                <div v-bind:class="payClass" class="pay">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ball-content">
            <transition-group v-on:before-enter="dropBeforeEnter" v-on:enter="dropEnter" v-on:after-enter="dropAfterEnter" name="drop">
                <div v-for="(ball,n) in balls" v-bind:key="n" v-show="ball.show" class="ball">
                    <div class="inner inner-hook"></div>
                </div>
            </transition-group>
        </div>
        <transition name="fold">
            <div v-show="listShow" class="shopcart-list">
                <div class="shopcart-list-header">
                    <div class="shopcart-title">購物車</div>
                    <div v-on:click="empty" class="empty">清空</div>
                </div>
                <div ref="shopcartListWrapper" class="shopcart-list-body">
                    <ul>
                        <li v-for="item in selectProducts" class="shopcart-list-item">
                            <span class="name">{{item.name}}</span>
                            <div class="price">
                                <span>NT${{item.price*item.count}}</span>
                            </div>
                            <div class="cartControl-content">
                                <cartControl v-bind:product="item" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
    <transition name="fade">
        <div v-show="listShow" v-on:click="hideList" class="list-mask"></div>
    </transition>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import cartControl from '@/components/cartControl';
export default {
    components:{
        cartControl
    },
    props:{
        selectProducts:{
            type:Array,
            default(){
                return [];
            }
        },
        deliveryPrice:{
            type:Number,
            default:0
        },
        minPrice:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            balls:[
                {
                    show: false
                },
                // {
                //     show: false
                // },
                // {
                //     show: false
                // },
                // {
                //     show: false
                // },
                // {
                //     show: false
                // }
            ],
            dropBalls:[],
            fold: true
        }
    },
    computed: {
        totalPrice(){
            let total = 0 ;
            this.selectProducts.forEach((item)=>{
                total += item.price * item.count;
            })
            return total;
        },
        totalCount(){
            let count = 0 ;
            this.selectProducts.forEach((item)=>{
                count += item.count;
            })
            return count;
        },
        payDesc(){
            if(this.totalPrice ===0){
                return `$${this.minPrice}元起送`;
            }else if(this.totalPrice<this.minPrice){
                let diff = this.minPrice - this.totalPrice;
                return `還差$${diff}元起送`;
            }else{
                return '去結算';
            }
        },
        payClass(){
            if(this.totalPrice<this.minPrice){
                return 'not-enough'
            }
            return 'enough'
        },
        listShow(){
            if(!this.totalCount){
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if(show){
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs['shopcartListWrapper'],{
                        click:true
                    });
                }else{
                    this.scroll.refresh();
                }
                
            }
            return show;
        }
    },
    methods:{
        pay(){
            if(this.totalPrice < this.minPrice){
                return;
            }
            window.alert(`總金額${this.totalPrice}元`);
        },
        toggleList(){
            if(!this.totalCount){
                return;
            }
            this.fold = !this.fold;
        },
        hideList(){
            this.fold = true;
        },
        empty(){
            this.selectProducts.forEach((item)=>{
                item.count = 0;
            })
        },
        drop(element){
            for(let i=0;i<this.balls.length;i++){
                let ball = this.balls[i];
                if(!ball.show){
                    ball.show = true;
                    ball.element = element;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        dropBeforeEnter(element){
            let count = this.balls.length;
            while(count--){
                let ball = this.balls[count];
                if(ball.show){
                    let rect = ball.element.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top -22);
                    element.style.display = '';
                    element.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    element.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = element.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        dropEnter(element){
            let rf = element.offsetHeight;
            element.style.webkitTransform = 'translate3d(0,0,0)';
            element.style.transform = 'translate3d(0,0,0)';
            let inner = element.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
        },
        dropAfterEnter(element){
            let ball = this.dropBalls.shift();
            if(ball){
                ball.show = false;
                element.style.display = 'none';
            }
        }
    }
}
</script>