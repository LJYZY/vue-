const mongoose = require('mongoose')
const db = "mongodb://localhost/shopDB"
const glob = require('glob')
const {resolve} = require('path')

exports.initSchema = () =>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db)
    let macConnectTimes = 0
    return new Promise((resolve,reject)=>{
    //增加数据库的监听事件
    mongoose.connection.on('disconnected',()=>{
        console.log('*********数据库断开')
        if(macConnectTimes<=3){
            macConnectTimes++
            mongoose.connect(db)
        }else {
            reject()
            throw new Error('数据库出现问题，请求次数过多')
        }
        
    })
    mongoose.connection.on('error',(err)=>{
        console.log('*********数据库错误')
        if(macConnectTimes<=3){
            macConnectTimes++
            mongoose.connect(db)
        }else {
            reject(err)
            throw new Error('数据库出现问题，请求次数过多')
        }
    })
    mongoose.connection.once('open',()=>{
        console.log('***数据库连接成功***')
        resolve()
    })
})
}