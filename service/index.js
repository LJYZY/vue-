const koa = require('koa')
const app = new koa()
const {connect,initSchema} = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyParser')
const cors = require('koa2-cors')
const Router = require('koa-router')
app.use(bodyParser())
app.use(cors())
let user = require('./appAPI/user.js')
let goods = require('./appAPI/goods.js')
//装载子路由
let router = new Router() 
router.use('/user',user.routes())
router.use('/goods',goods.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;(async ()=>{
    await connect()
    initSchema()
})()

// app.use(async(ctx)=>{
//     ctx.body='<h1>梁佳跃</h1>'
// })

app.listen(3000,()=>{
    console.log('is running')
})