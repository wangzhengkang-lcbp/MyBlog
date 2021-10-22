<template>
  <TopNav></TopNav>
  <div class="main">
    <div class="left">
      <Maxleft></Maxleft>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav"
import Maxleft from "@/components/Maxleft"
import {mapMutations,mapState} from "vuex"
export default {
  name:"App",
  components: {
    TopNav,Maxleft
  },
  methods: {
    ...mapMutations(["updateUserInfo"]),
  },
  computed: {
    ...mapState(["userInfo"])
  },
  async created(){
    let {data} = await this.$axios({
      method:"POST",
      url:"/isCheck"
    });
    
    // console.log(data.data);
    
    if(data.data){
      
      this.updateUserInfo(data.data);
    }else{
      return false
    }
    console.log(this.userInfo.user);
    
  },
}
</script>

<style lang="less">
  @import"./assets/css/reset.css";
  @import "assets/css/font.css";
  @import "assets/css/font/iconfont.css";
  body{
    background: url(./assets/imgs/b3.jpg) no-repeat 50%/cover fixed;
  }
  .main{
    display: flex;
    font-family: Quicksand;
    justify-content: space-between;
    margin: 45px auto;
    width: 70%;
    // background-color: brown;
    .left{
      width: 25%;
      // background-color: burlywood;
    }
    .right{
      width: 74%;
      // background-color: cadetblue;
    }
  }
</style>