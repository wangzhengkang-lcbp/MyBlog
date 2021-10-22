<template>
  <el-form ref="userForm" :model="userForm" label-width="100px" :rules="rules">
    <el-form-item label="当前用户名">
      <span>{{ userInfo.user }}</span>
    </el-form-item>
    <el-form-item label="新的用户名" prop="user">
      <el-input v-model="userForm.user"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "Updatename",
  data() {
    return {
      userForm: {
        user: "",
      },
      rules: {
        user: [
          {
            validator: (rule, value, callback) => {
              //长度
              if (value.length < 2 || value.length > 8) {
                callback(new Error("请输入2-8位用户名"));
              } else {
                //字符验证
                if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
                  callback(new Error("只允许汉字、字母、下划线"));
                }
                //当新名字与旧名字同名时，提示
                if (value === this.userInfo.user) {
                  callback(new Error("不能修改为原来的名称"));
                } else {
                  callback(); //验证成功
                }
              }
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["updateUserInfo"]),
    onSubmit() {
      this.$refs.userForm.validate(async (v) => {
        if (v) {
          let { data } = await this.$axios({
            method: "POST",
            url: "/personalname",
            data: { user: this.userForm.user },
          });
          console.log(data.message);
          console.log(data.data.user,'后端传回来的网名');
          
          if (data.code) {
            this.$message.error(data.message);
          } else {
            this.$message.success(data.message);
            this.updateUserInfo(data.data);
            this.$refs.userForm.resetFields();
          }
        }
      });
    },
  },
};
</script>

<style>
</style>