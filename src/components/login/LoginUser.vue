<template>
  <div class="LoginUser">
    <el-popover
      placement="bottom-end"
      :width="200"
      trigger="hover"
    >
      <template #reference>
        <img :src="baseURL + '/head_photo' + userInfo.photo" alt="头像">
      </template>
      <div>
        <el-button type="primary" size="mini" @click="Updataname">修改信息</el-button>
        <el-button type="danger" size="mini" @click="logout">退出登录</el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"
export default {
  name: "LoginUser",
  computed:{...mapState(["userInfo"])},
  methods: {
    ...mapMutations(["clearUserInfo"]),
    Updataname(){
      this.$router.push("/updatauser")
    },
    async logout(){
      let {data} = await this.$axios({
        method:"POST",
        url:"/logout",
      });
      console.log(data);
      
      this.$message.success(data.message); //退出登录后弹框提示
      this.clearUserInfo();//清空vuex里的数据
      //跳转到/路由下  编程式导航
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
.LoginUser {
  width: 28px;
  height: 28px;
  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>