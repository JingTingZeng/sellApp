<template>
    <div v-bind:class="starType" class="star">
        <span v-for="(item,index) in itemClasses" v-bind:key="index" v-bind:class="item" class="star-item"></span>
    </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    props:{
        size:{
            type: Number
        },
        score:{
            type: Number
        }
    },
    computed:{
        starType(){
            return 'star-'+this.size
        },
        itemClasses(){
            let result = [];
            let score = Math.floor(this.score*2) /2;
            let hasDecimal = score % 1 !==0;
            let integer = Math.floor(score);

            for(let i =0 ; i <integer ; i++){
                result.push(CLS_ON);
            }
            if(hasDecimal){
                result.push(CLS_HALF);
            }
            while(result.length < LENGTH){
                result.push(CLS_OFF);
            }
            return result;
        }
    }
}
</script>