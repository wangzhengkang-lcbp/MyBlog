<template>
  <el-button type="success" size="mini" @click="no_log_rig()"
    >登录 / 注册</el-button
  >
  <div class="win" v-show="log_rig" @click.self="off_log_rig()">
    <div class="formbox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
           <el-form
            :model="logForm"
            :rules="rules"
            ref="logForm"
            label-width="100px"
          >
            <el-form-item label="用户名" prop="user">
              <el-input v-model="logForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="logForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="logSubmit()">立即登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form
            :model="regForm"
            :rules="rules"
            ref="regForm"
            label-width="100px"
          >
            <el-form-item label="用户名" prop="user">
              <el-input v-model="regForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input type="password" v-model="regForm.password2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="regSubmit">立即注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: "LoginBut",

  data() {
    return {
      activeName: "first",
      log_rig: false,
      regForm: {
        //注册表单内控件绑定的数据
        user: "",
        password: "",
        password2: "",
      },
      logForm: {
        //登录表单内控件绑定的数据
        user: "",
        password: "",
      },
      rules: {
        //form表单里rules属性绑定的对象，用来对表单内控件做格式校验
        user: [
          { required: true, message: "请输入用户名" },
          {
            validator(rule, value, callback) {
              //长度
              if (value.length < 2 || value.length > 8) {
                callback(new Error("请输入2-8位字符"));
              } else {
                //字符验证
                if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
                  callback(); //验证成功
                } else {
                  callback(new Error("只允许汉字、字母、下划线"));
                }
              }
            },
          },
        ],
        password: [
          { required: true, message: "请输入密码" },
          {
            validator(rule, value, callback) {
              //长度
              if (value.length < 6 || value.length > 18) {
                callback(new Error("请输入6-18位字符"));
              } else {
                //字符验证
                if (/^[a-zA-Z]\w{5,17}$/.test(value)) {
                  callback(); //验证成功
                } else {
                  callback(new Error("以字母开头,只能包含字符、数字和下划线"));
                }
              }
            },
          },
        ],
        password2: [
          { required: true, message: "请确认密码" },
          {
            validator: (rule, value, callback) => {
              // console.log(this);
              if (this.regForm.password === value) {
                callback(); //密码一致
              } else {
                callback(new Error("两次密码不一致"));
              }
            },
          },
        ],
      },
    };
  },

  methods: {
    ...mapMutations(["updateUserInfo"]),
    no_log_rig() {
      this.log_rig = true;
    },
    off_log_rig() {
      this.log_rig = false;
    },
    regSubmit() {
      //注册的提交按钮  发起请求到后端
      this.$refs.regForm.validate(async (bool) => {
        if (bool) {
          //表单数据校验成功
          let {data} = await this.$axios({
            method: "POST",
            url: "/reg",
            data: {
              user: this.regForm.user,
              password: this.regForm.password,
            },
          });

          console.log(data);
          if(data.code){
            //注册失败
            if(data.code === 2){
              this.$message.error("用户名已存在");
            }
          }else{
            //成功......................................................................................
            this.$message.success("注册成功");
            this.activeName = "first";
            this.$refs.regForm.resetFields();//清空表单数据
          }
        } else {
          return false;
        }
      });
    },
    logSubmit() {
      //登录的提交按钮  发起请求到后端
      this.$refs.logForm.validate(async (bool) => {
        if (bool) {
          //表单数据校验成功
          let {data} = await this.$axios({
            method: "POST",
            url: "/log",
            data: {
              user: this.logForm.user,
              password: this.logForm.password,
            },
          });

          console.log(data);
          if(data.code){
            //登录失败
            if(data.code === 2){
              this.$message.error("用户名不存在,请注册");
            }
            if(data.code === 3){
              this.$message.error("密码错误");
            }
          }else{
            //成功......................................................................................
            this.$message.success("登录成功");
            this.$refs.logForm.resetFields();//清空表单数据
            this.log_rig = false;
            console.log(decodeURIComponent(data.data.user));
            
            data.data.user = decodeURIComponent(data.data.user)
            this.updateUserInfo(data.data);
            console.log(data.data);
            
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.win {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  .formbox {
    position: absolute;
    width: 280px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background: #fff;
  }
}
</style>