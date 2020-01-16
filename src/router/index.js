import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../views/product/product.vue'
import Ratings from '../views/ratings/ratings.vue'
import Seller from '../views/seller/seller.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: Seller
  }
]

const router = new VueRouter({
  mode:'hash',
  routes,
  linkActiveClass:'active',
  // scrollBehavior: 
})

router.beforeEach(async(to, from, next) => {
  if (to.fullPath === "/"){
    next({
        path: "/product"
    });
  }else{
    next();
  }
});

export default router
