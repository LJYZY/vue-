<template>
    <div>
     <van-nav-bar
     title="用户注册"
     left-text="返回"
     left-arrow
     @click-left="goBack"
     />
    <div class="register-panel">
        <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
        required
        :error-message="usernameErrorMsg"
        />
        <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
        />

        <div class="register-button">
            <van-button type="primary" @click="registerAction" size="large" :loading="openLoading">马上注册</van-button>
        </div>
    </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    export default {
        data(){
            return {
                username:'',
                password:'',
                openLoading:false,//是否开启用户注册的loading状态
                usernameErrorMsg:'',
                passwordErrorMsg:''
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            registerAction(){
                if(this.checkForm()){
                    this.axiosRegisterUser()
                }
            },
            axiosRegisterUser(){
                this.openLoading = true;
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code==200){
                        Toast.success(response.data.message)
                        this.$router.push('/')
                    }else {
                        console.log(response.data.message)
                        this.openLoading = false
                        Toast.fail('注册失败')
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    this.openLoading = false
                    Toast.fail('注册失败')
                })
            },
            checkForm(){
                let isOK = true;
                if(this.username.length<2){
                    this.usernameErrorMsg="用户名不能少于2位"
                    isOK = false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<3){
                    this.passwordErrorMsg="密码不能少于3位"
                    isOK = false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOK
            }
        }
    }
</script>

<style scoped>
   
</style>