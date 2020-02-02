<template>
    <div class="shopcart">
        <div class="shopcart-content">
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
            <div class="shopcart-right">
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
    </div>
</template>

<script>
export default {
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
            dropBalls:[]
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
        }
    },
    methods:{
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