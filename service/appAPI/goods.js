const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')
router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./newGoods.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    ctx.body="开始导入数据"
})
router.get('/insertAllCate',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    ctx.body = "开始插入数据"
})
router.get('/insertCatSub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub') 
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    ctx.body="开始插入数据"
})
// 获取商品详情信息的路由
router.post('/getDetailGoodsInfo',async(ctx)=>{
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    await Goods.findOne({ID:goodsId}).exec()
    .then((result)=>{
        
        ctx.body = {code:200,message:result}
    })
    .catch(error=>{
        ctx.body = {code:500,message:error}
    })
})
//获取商品大类信息的路由
router.get('/getCatgoryList',async(ctx)=>{
    const Category =  mongoose.model('Category')
    await Category.find().exec()
    .then(result=>{
        ctx.body = {code:200,message:result}
    })
    .catch(error=>{
        ctx.body={code:200,message:error}
    })
})
//获取商品小类别信息的路由
router.post('/getCatgorySubList',async(ctx)=>{
    let categoryId = ctx.request.body.categoryId
    const CategorySub =  mongoose.model('CategorySub')
    await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
    .then(result=>{
        ctx.body = {code:200,message:result}
    })
    .catch(error=>{
        ctx.body={code:200,message:error}
    })
})
//根据类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    let categorySubId  = ctx.request.body.categorySubId
    let page = ctx.request.body.page//当前页数
    let num =10 //每页显示数量
    let start = (page-1)*num

    const Goods =  mongoose.model('Goods')
    await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
    .then(result=>{
        ctx.body = {code:200,message:result}
    })
    .catch(error=>{
        ctx.body={code:200,message:error}
    })
})
module.exports = router