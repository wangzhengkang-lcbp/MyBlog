<template>
  <el-form ref="passForm" :model="passForm" label-width="100px" :rules="rules">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input type="password" v-model="passForm.oldPassword"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model="passForm.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="newPassword2">
      <el-input type="password" v-model="passForm.newPassword2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapMutations} from "vuex"
export default {
  name: "Updatapass",
  data() {
    return {
      passForm: {
        oldPassword: "", //旧密码
        newPassword: "", //新密码
        newPassword2: "",
      },
      rules: {
        oldPassword: [
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
        newPassword: [
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
        newPassword2: [
          {
            validator: (rule, value, callback)=>{
                if(this.passForm.newPassword === value){
                    callback();//密码一致
                }else{
                    callback(new Error("确认密码与新密码不一致"));
                }
            },
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["clearUserInfo"]),
    onSubmit() {
        this.$refs.passForm.validate(async v=>{
          
            if(v){
                let {data} = await this.$axios({
                    method:"POST",
                    url:"/pass",
                    data:{
                        oldPassword:this.passForm.oldPassword,
                        newPassword:this.passForm.newPassword
                    }
                });
                //修改失败
                if(data.code) return this.$message.error(data.message);
                //修改成功
                this.$message.success(data.message);//弹框提示
                this.clearUserInfo();//清空vuex里的数据
                this.$refs.passForm.resetFields(); //清空表单
                this.$router.push("/");//跳转到/路由下  编程式导航

            }else{
                return false;
            }
        })
    },
  },
};
</script>

<style>
</style>