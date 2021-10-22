<template>
  <div id="nav">
      <div class="content">
          <a href="#" class="logo"></a>
          <div class="option">
              <router-link to="/">主页</router-link>
              <router-link to="/Message">动态</router-link>
              <router-link to="/Talk">留言</router-link>
              <router-link to="/Link">友链</router-link>
              <router-link to="/About">关于</router-link>
          </div>
          <div class="login">
              <LoginUser v-if="userInfo.user"></LoginUser>
              <LoginBtn v-else></LoginBtn>
          </div>
      </div>
  </div>
</template>

<script>
import LoginBtn from "@/components/login/LoginBtn"
import LoginUser from "@/components/login/LoginUser"
import {mapState} from "vuex";
export default {
    name:"TopNav",
    computed:{
        ...mapState(["userInfo"])
    },
    components: {
        LoginBtn,LoginUser
    }
}
</script>

<style lang="less" scoped>
    #nav{
        display: flex;
        position: fixed;
        top: 0;
        z-index: 9999999;
        width: 100%;
        height: 40px;
        background-color: #ffff;
        justify-content: center;
        .content{
            display: flex;
            width: 70%;
            height: 100%;
            justify-content: space-between;
            .logo{
                width: 80px;
                height: 100%;
                background-color: skyblue;
                background: url("../assets/imgs/1.png") no-repeat 50%/cover;
            }
            .option{
                display: flex;
                width: 40%;
                height: 100%;
                justify-content: space-around;
                a{
                    display: inline-block;
                    width: 60px;
                    height: 38px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 18px;
                    font-weight: bolder;
                    color: rgb(134, 130, 130);
                    &:hover{color: tomato;}
                }
                a.router-link-active {
                        color: tomato;
                        border-bottom: solid 2px tomato;
                    }
            }
            .login{
                margin-top: 6px;
                .el-button{
                    margin: 6px auto;
                }
            }
        }
    }
</style>