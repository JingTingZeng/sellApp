<template>
  <div id="app">
    <v-header v-bind:seller="seller"/>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/product">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">評論</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import VHeader from '@/views/layout/header'

export default {
  components:{
    VHeader
  },
  data(){
    return{
    }
  },
  computed: {
    ...mapState(['seller'])
  },
  methods:{
    ...mapActions(['getSeller'])
  },
  async created(){
    await this.getSeller();
  }
}
</script>

