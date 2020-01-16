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
}
</script>