<template>
    <div class="cartControl">
        <transition name="move">
            <div v-show="product.count > 0" v-on:click="decreaseCart" class="cart-decrease">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div v-show="product.count > 0" class="cart-count">{{product.count}}</div>
        <div v-on:click="increaseCart" class="cart-increase icon-add_circle"></div>
    </div>
</template>
<script>
export default {
    props:{
        product:{
            type: Object
        }
    },
    methods:{
        increaseCart(){
            if(!event._constructed){
                return;
            }
            if(!this.product.count){
                this.$set(this.product,'count',1);
            }else{
                this.product.count++;
            }

            this.$emit('cart-add', event.target);
        },
        decreaseCart(){
            if(this.product.count){
                this.product.count--;
            }
        }
    }
}
</script>