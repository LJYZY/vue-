const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.post('/register',async(ctx)=>{
    const User = mongoose.model('User') 
    let newUser = new User(ctx.request.body)
    await newUser.save().then(()=>{
        ctx.body = {
            code:200,
            message:'注册成功'
        }
    })
    .catch(error=>{
        ctx.body = {
            code:500,
            message:error
        }
    })
    
})
router.post('/login',async(ctx)=>{
    const User = mongoose.model('User')
    let loginUser = ctx.request.body
    let userName = loginUser.userName
    let password = loginUser.password

    await User.findOne({userName:userName}).exec().then((result)=>{
        if(result){
            if(password==result.password){
                ctx.body={
                    code:200,
                    message:'登陆成功'
                }
            }else{
                ctx.body = {
                    code:500,
                    message:'用户名或密码错误'
                }
            }
        }else{
            ctx.body={
                code:300,
                message:'用户名不存在'
            }
        }
    })
    .catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})

module.exports = router