<template>
  <div>
    <div class="nav-bar">
      <van-nav-bar title="购物车" />
    </div>

    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>

    <div class="cart-list">
        <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
            <div class="cart-img"><img :src="item.image" width="100%"/></div>
            <div class="cart-text">
                <div class="cart-goods-name">{{item.Name}}</div>
            
                <div class="cart-control">
                <van-stepper v-model="item.count" />
                </div>
            </div>
            <div class="cart-goods-price">
                <div>￥{{item.price}}</div>
                <div>x{{item.count}}</div>
                <div class="aiiPrice">￥{{item.price*item.count}}</div>
            </div>
            
        </div>
        
    </div>
    <!-- 显示总价 -->
            <div class="toAllMoney">
                商品总价:￥{{toAllMoney}}
            </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false
    };
  },
  computed:{
        toAllMoney(){
            let allMoney = 0
            this.cartInfo.forEach((item,index) => {
               allMoney += item.price*item.count
            });

            localStorage.cartInfo=JSON.stringify(this.cartInfo)

            return allMoney
        }
    },
  created() {
    this.getCartInfo();
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log(JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    //清空购物车的商品
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style  scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list{
    background-color: #fff;
}
.cart-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
    
   
}
.cart-img{
    flex:6;
}
.cart-text{
    flex:14;
    padding-left:10px;
}
.cart-control{
    padding-top: 10px;
}
.cart-goods-price{
    flex:4;
    text-align: right;
}
.toAllMoney{
    text-align: right;
    background-color: #fff;
     border-bottom:1px solid #E4E7ED;
     padding: 5px;
}
</style>