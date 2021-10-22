<template>
  <ul>
    <li>
      <h2>修改用户名</h2>
      <Updataname></Updataname>

    </li>
    <li>
      <h2>修改密码</h2>
      <Updatapassword></Updatapassword>

    </li>
    <li>
      <h2>头像上传</h2>
      <Updataphoto></Updataphoto>

    </li>
  </ul>
</template>

<script>
import Updataname from "@/components/user/Updataname"
import Updatapassword from "@/components/user/Updatapassword"
import Updataphoto from "@/components/user/Updataphoto"
export default {
  name: "UpdataUser",
  components: {Updataname,Updatapassword,Updataphoto}
};
</script>

<style lang="less" scoped>
ul {
  width: 100%;
  font-family: Quicksand, Microsoft YaHei, sans-serif;
  box-sizing: border-box;
  li {
    width: 100%;
    margin-bottom: 10px;
    padding: 25px 20px;
    background-color: #fff;
    box-shadow: 0 0 4px #ddd;
    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }
  }
}
</style>