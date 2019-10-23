const BASEURL = ' https://www.easy-mock.com/mock/5d86d5fbef4e69787bdfa2cf/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
    getShoppingMallInfo: BASEURL+'a', //商城首页信息
    registerUser: LOCALURL+'user/register',//用户注册接口
    loginUser:LOCALURL+'user/login',//用户登录接口

    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',//获取商品详情接口
    getCategoryList:LOCALURL+'goods/getCatgoryList', //获取商品大类接口
    getCategorySubList:LOCALURL+'goods/getCatgorySubList',   //得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',//得到小类商品信息
    
}
module.exports = URL