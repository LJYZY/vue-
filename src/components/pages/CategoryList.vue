<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>

    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActive:categoryIndex==index}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">

          <div class="tabCategorySub" >
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>

        <div id="list-div">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
          >
        <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
            
            <div class="list-item-img"><img :src="item.IMAGE1" width="100%"/></div>
              <div class="list-item-text">
                <div>{{item.NAME}}</div>
                <div class="">￥{{item.ORI_PRICE}}</div>
              </div>

        </div>
          </van-list>
          </van-pull-refresh>
    </div>

        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub:[],
      active:0,
      loading:false,//上拉加载
      finished:false,//上拉加载是否没有数据了
      isRefresh:false,//下拉加载
      //List:[],
      page:1,          //商品列表的页数
      goodList:[],     //商品信息
      categorySubId:'' ,//商品子分类ID
    };
  },
  created() {

    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight-46-50 + "px";
    document.getElementById('list-div').style.height=winHeight-90-50 +'px'
  },
  methods: {
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      //****** */
      this.page=1
        this.finished = false
        this.goodList=[]
        //******** */
      this.getCategorySubByCategoryId(categoryId);
    },
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID)
          } else {
            Toast("服务器错误，获取信息失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //根据大类ID读取小类
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0
            this.categorySubId = this.categorySub[0].ID
            this.onLoad()
           
           
          } else {
            Toast("服务器错误，获取信息失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onLoad(){
      setTimeout(()=>{
        this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
        this.getGoodList()
      },500)
    },
    onRefresh(){
      setTimeout(()=>{
        this.isRefresh=false
        this.List=[]
        this.onLoad()
      },1000)
    },
    
//*************
    getGoodList(){
        axios({
        url:url.getGoodsListByCategorySubID,
        method:'post',
        data:{
                categorySubId:this.categorySubId,
                page:this.page
            }
    })
    .then(response=>{
        console.log(response)
        if(response.data.code == 200 && response.data.message.length ){
            this.page++
            this.goodList=this.goodList.concat(response.data.message)
        }else{
                this.finished = true;
        }
        this.loading=false;
        
    })
    .catch(error=>{
        console.log(error)
    })
},
onClickCategorySub(index,title){
    //console.log( this.categorySub)
    this.categorySubId= this.categorySub[index].ID
    console.log(this.categorySubId)
    
    this.goodList=[]
    this.finished = false
    this.page=1
    this.onLoad()

},
goGoodsInfo(id){
  this.$router.push({name:'Goods',params:{goodsId:id}})
}
  
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
 .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>