<template>
    <div>
        <div class="search-bar">
            <van-row >
        <van-col span="3">
            <img :src="locationIcon" width="60%" class="location-icon"/>
        </van-col>
        <van-col span="16">
            <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
            <van-button size="mini">查找</van-button>
        </van-col>
       </van-row>
        </div>
        <!-- 轮播图 -->
        <div class="swipe-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner ,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- type bar -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%"/>
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- 广告 -->
        <div>
            <img v-lazy="adBanner" width="100%"/>
        </div>

        <!-- 商品推荐 -->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item" >
                            <img :src="item.image" width="80%"/>
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <floorComponent :floorData="floor1"></floorComponent>
     <!-- 热卖商品 -->
    <div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
      <!--这里需要一个list组件-->
      <van-list>
            <van-row gutter="20">
                <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                    <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                </van-col>
            </van-row>
        </van-list>
    </div>
</div>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper , swiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '@/components/component/floorComponent.vue'
    import goodsInfo from '@/components/component/goodsInfoComponent.vue'
    import url from '@/serviceAPI.config.js'
    export default {
        
        data() {
            return {
                swiperOption:{
                    slidesPerView:3
                },
                msg: 'shoppingmall',
                locationIcon:require('../../assets/images/location.png'),
                bannerPicArray:[],
                category:[],
                adBanner:'',
                recommendGoods:[],
                floor1:[],
                floor1_0:{},
                floor1_1:{},
                floor1_2:{},
                hotGoods:[],

            }
        },
        components:{
            swiper,swiperSlide,floorComponent,goodsInfo
        },
        created(){
            axios({
                url:url.getShoppingMallInfo,
                method:'get'
            })
            .then(response=>{
                console.log(response)
                if(response.status==200){
                     this.category = response.data.data.category;
                     this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                     this.bannerPicArray = response.data.data.slides;
                     this.recommendGoods = response.data.data.recommend;
                     this.floor1 = response.data.data.floor1;
                     this.floor1_0 = this.floor1[0];
                     this.floor1_1 = this.floor1[1];
                     this.floor1_2 = this.floor1[2];
                     this.hotGoods = response.data.data.hotGoods 
                }
               
            })
            .catch(error=>{
                console.log('错误'+error)
            })
        }
    }
</script>

<style>
    .search-bar{
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input{
        width: 100%;
        height: 1.3rem;
        border-top: 0px;
        border-left: 0px;
        border-bottom: 1px solid #fff;
        border-right: 0px;
        background-color: #e5017d;
        color:#fff;
    }
    .location-icon{
        padding-top: .3rem;
        padding-left: .3rem;
    }
    .swipe-area{
        clear:both;
        max-height: 12rem;
        overflow: hidden;
    }
    .type-bar{
        background-color: #fff;
        margin: 0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

    }
    .type-bar div{
        padding: .3rem;
        font-size: 12px;
        text-align: center;
    }
    .recommend-area{
        background-color: #fff;
        margin-top: .3rem;
    }
    .recommend-title{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: .2rem;
        color: #e5017d;
    }
    .recommend-body{
        border-bottom: 1px solid #eee;
    }
    .recommend-item{
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }
    .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
    
</style>