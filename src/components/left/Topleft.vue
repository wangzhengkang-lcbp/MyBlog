<template>
  <div class="personal">
    <div class="top">
      <div class="avatar"></div>
      <div class="info">
        <h5>乐此不疲</h5>
        <p>web develop</p>
      </div>
    </div>
    <div class="cintact">
      <a href="#" class="iconfont icon-github-fill"></a>
      <!-- <a href="#" class="iconfont icon-weibo"></a> -->
      <el-popover
        placement="bottom"
        :width="130"
        trigger="click"
        content="I don't have weibo"
      >
        <template #reference>
          <a href="#" class="iconfont icon-weibo"></a>
        </template>
      </el-popover>
      <!-- <a href="#" class="iconfont icon-douyin"></a> -->
      <el-popover
        placement="bottom"
        :width="130"
        trigger="click"
        content="I don't have douyin"
      >
        <template #reference>
          <a href="#" class="iconfont icon-douyin"></a>
        </template>
      </el-popover>
      <!-- <el-button><a href="#" class="iconfont icon-weixin"></a></el-button> -->
      <el-popover
        placement="bottom"
        :width="90"
        trigger="click"
        content="18720442933"
      >
        <template #reference>
          <a href="#" class="iconfont icon-weixin"></a>
        </template>
      </el-popover>
      <!-- <a href="#" class="iconfont icon-weixin"></a> -->
      <!-- <a href="#" class="iconfont icon-QQ"></a> -->
      <el-popover
        placement="bottom"
        :width="130"
        trigger="click"
        content="I don't have QQ"
      >
        <template #reference>
          <a href="#" class="iconfont icon-QQ"></a>
        </template>
      </el-popover>
    </div>
    <div class="download">
      <!-- <el-button type="primary" round size="small">DOWNLOAD CV</el-button> -->
      <a href="#"
        ><el-button type="primary" round size="small">DOWNLOAD CV</el-button></a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Topleft",
  visible: true,
};
</script>

<style lang="less" scoped>
.personal {
  width: 100%;
  height: 200px;
  margin-bottom: 5px;
  background-color: #bfe2e6;
  .top {
    padding: 20px 0;
    text-align: center;
    // background-color: #ccc;
    .avatar {
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: #fff 2px solid;
      vertical-align: middle;
      background: url("../../assets/imgs/1.png") no-repeat 50% / cover;
    }
    .info {
      display: inline-block;
      margin-left: 18px;
      vertical-align: middle;
      h5 {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 5px;
      }
      p {
        font-family: Quicksand;
        margin-top: 10px;
      }
    }
  }
  .cintact {
    display: flex;
    height: 30px;
    justify-content: space-around;
    align-items: center;
    // background-color: #fff;
    margin-bottom: 0px;
    a {
      font-size: 20px;
      color: #000;
    }
  }
  .download {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    margin-top: 6px;
    background: white;
    button {
      background: #bfe2e6;
      border-color: #bfe2e6;
      color: #000;
      a {
        display: inline-block;
      }
    }
  }
}
</style>