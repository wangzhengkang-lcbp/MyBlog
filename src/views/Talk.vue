<template>
  <div>
    <article>
      <h2>留言板</h2>
      <p>请文明发言，禁止广告。不然拉黑了嗷😂\(^o^)/~</p>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="100"
        show-word-limit
      ></el-input>
      <div class="publish">
        <div class="emoji-box">
          <i class="iconfont" @click.stop="showEmoji">😁</i>
          <div class="emoji" v-show="isShow">
            <ul>
              <li v-for="(item,index) in arrEmoji" :key="index" @click="printEmoji(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <el-button type="primary" size="mini" @click="submit">发表留言</el-button>
      </div>
    </article>
    <article class="comment-area">
      <ul>
        <li v-for="item in arrMessage" :key="item._id">
          <!-- 评论(父级/一级) -->
          <div class="comment-wrap">
            <img :src="baseURL+'/head_photo'+item.author.head_photo"> <!--用户头像-->
            <div class="message-box"> <!-- 右侧的盒子 -->
              <div class="name-time">
                <span>{{item.author.user}}</span>
                <span>{{formatDate(item.date)}}</span>
              </div>
              <p class="text">{{item.content}}</p>
              <div class="like-reply">
                <i class="iconfont icon-xiai" @click="likes(item._id)"  :class="{red: userInfo._id && item.likes.includes(userInfo._id)}"></i>
                <span>{{item.likes.length}}</span>
                <i class="iconfont icon-huifu" @click="fatherReplay(item)"></i>
              </div>
            </div>
          </div>
          <!-- 回复(子级/二级) -->
          <div class="reply-wrap" v-for="(childItem,index) in item.children" :key="childItem._id">
            <img :src="baseURL+'/head_photo'+childItem.author.head_photo"> 
            <div class="message-box"> 
              <div class="name-time">
                <span>{{childItem.author.user}}</span>
                <span>{{formatDate(childItem.date)}}</span>
              </div>
              <p class="text"><span>@{{childItem.toId.user}}&nbsp</span>{{childItem.content}}</p>
              <div class="like-reply">
                <i class="iconfont icon-xiai" @click="childrenLikes(item._id, childItem._id, index)" :class="{red: userInfo._id && childItem.likes.includes(userInfo._id)}"></i>
                <span>{{childItem.likes.length}}</span>
                <i class="iconfont icon-huifu" @click="childReplyBtn(item, childItem)"></i>
              </div>
            </div>
          </div>
          <!-- 回复框 -->
          <div class="print-reply" :class="{show: item.isShowReply}">
            <el-input size="mini" v-model="item.replyContent" :placeholder="`@${item.toId.user}`"></el-input>
            <el-button type="primary" size="mini" @click="childrenReplay(item)">提交回复</el-button>
          </div>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "Talk",
  data(){
    return {
      textarea:"",
      isShow:false,
      arrEmoji:[
        "😃","😁","😂","😊","🙃","🥰","😘","🤭","🤔","😏","😵","😟","🙁","😳","😰","😭","😖","😡","😠","😈","🤡","☠️","👻","🙈","🙉","❤️","💖","💢","💣","💤","👋","👍","👌","🤞","🤟","🤙","👊","🖕","🤝","🙏","🙅","🙅‍♂️","👨‍✈️","👩‍✈️","👷","👷‍♀️","🤦","🤦‍♂️","👴","🧓","🐴","🐮","🐖","🐑","🐓","🦚","🐲","🐳","🐟","🐌"
      ],
      //评论数据的数组
      arrMessage:[]
    }
  },
  computed: {...mapState(["userInfo"])},
  methods:{
    showEmoji(){
      this.isShow = !this.isShow; //显示/关闭表情框
    },
    printEmoji(item){
      this.textarea += item; //点击输入表情到文本域
    },
    //发起请求，将评论/留言的数据提交给后端
    async submit(){
      //判断用户是否登录
      if(!this.userInfo.user) return this.$message.error("请登录，登录后才能发表留言哦！");
      this.textarea.trim();
      if(!this.textarea)  return this.$message.error("留言内容不能为空");

      // 提交数据到后端
      let {data} = await this.$axios({
        method:"POST",
        url:"/talkAbout",
        data:{textarea:this.textarea}
      });
      console.log(data);
      if(data.code) return this.$message.error(data.message); //提交失败
      //发表成功
      this.getMessage()
      this.$message.success(data.message);
      this.textarea = "";//清空文本域内容
    },
    //发起请求，获取所有留言数据
    async getMessage(){
      let {data} = await this.$axios({
        method:"GET",
        url:"/getTalk"
      });

      data.data.forEach(item => {
        item.isShowReply = false; //控制当前这条评论下的回复框显示 / 隐藏
        item.replyContent = ""; //控制当前评论下的回复input框里的内容
        item.toId = item.author;  //子级的父级作者id
      });

      console.log(data.data);
      this.arrMessage = data.data; //将数据赋值给数组
    },
    //父点赞
    async likes(fatherId){
       //判断用户是否登录
      if(!this.userInfo.user) return this.$message.error("请登录，登录后才能发表留言哦！");
      /* 
        点击按钮： 点赞 / 取消点赞    后端
      */
      //提交当前的评论fatherId + 当前点击了按钮的用户id
      let {data} = await this.$axios({
        method:"POST",
        url:"/likes",
        data:{fatherId}   //传第这条评论的id给后端
      });

      if(data.code) return this.$message.error(data.message); //点赞失败
      //点赞成功
      this.getMessage(); //重新请求获取全部的留言数据
    },
    //父留言
    async fatherReplay(item){//item父留言数据对象
      //判断用户是否登录
      if(!this.userInfo.user) return this.$message.error("请登录，登录后才能发表留言哦！");

      //判断一级评论的作者 是否 不等于 存储里的toId里的用户id， 点开
      if(item.author._id !== item.toId._id){
        item.isShowReply = true;
      }else{
        item.isShowReply = !item.isShowReply;  //点击显示/隐藏
      }
      //修改@后面的名字。  修改一级评论对象里的replayUser = 父评论的作者数据
      item.toId = item.author;
    },
    //时间格式转换
    formatDate(date){
      let d = new Date(date),
          YY = d.getFullYear(),
          MM = d.getMonth() +1,
          DD = d.getDate(),
          hh = d.getHours(),
          mm = d.getMinutes(),
          ss = d.getSeconds();
      return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    },
    //父留言回复按钮，显示/隐藏回复框
    async childrenReplay(item){
      if(!this.userInfo.user) return this.$message.error("请登录，登录后才能发表留言哦！");  //判断用户是否登录
      let content = item.replyContent.trim(); //获取input内容
      if(!content) return this.$message.error("请输入回复的内容！");
      if(content.length > 100) return this.$message.error("字数不能超过100");

      let {data} = await this.$axios({
        method:"POST",
        url:"/reply",
        data:{
          fatherId: item._id,  //留言人id
          content,  //回复的内容
          toId: item.toId._id //a回复的b，这是b的id
        }
      });
      if(data.code) return this.$message.error(data.message); //回复失败
      this.$message.success(data.message); //回复成功
      this.getMessage();  //重新获取所有的留言数据
    },
    //子点赞
    async childrenLikes(parentId, childId, childIndex){
      //判断用户是否登录
      if(!this.userInfo.user) return this.$message.error("请登录，登录后才能发表留言哦！");
      //提交数据
      let {data} = await this.$axios({
        method:"POST",
        url:"/childrenLikes",
        data:{parentId, childId, childIndex}
      });
      
      if(data.code) return this.$message.error(data.message); //回复失败
      this.getMessage(); //重新获取最新的留言数据
    },
    //点击子级回复的  回复按钮，显示/隐藏回复框
    childReplyBtn(item, childItem){
      //判断用户是否登录
      if(!this.userInfo.user) return this.$message.error("请登录，登录后才能发表留言哦！");
      //判断，当前点击了按钮的作者是否 与  所在的一级评论的作者不相同
      if(childItem.author._id !== item.toId._id){
        item.isShowReply = true;
      }else{
        item.isShowReply = !item.isShowReply;  //点击显示/隐藏
      }
      //点击时，设置一级评论对象里的replyUser =  子评论的作者（我要@的用户）
      item.toId = childItem.author;
    }
  },
  created(){
    this.getMessage();
  },
  mounted(){
    document.addEventListener("click", ()=>{
      this.isShow = false;//关闭
    });
  }
};
</script>

<style lang="less" scoped>
article {
  width: 100%;
  margin-bottom: 15px;
  padding: 25px 20px;
  background-color: #fff;
  font-family: Quicksand, Microsoft YaHei, sans-serif;
  box-sizing: border-box;
  box-shadow: 0 0 4px #ddd;
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
  }
  p {
    text-indent: 2em;
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
  }
  /deep/ textarea{
    margin-top: 10px;
  }
  .publish{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .emoji-box{
      position: relative;
      .emoji{
        position: absolute;
        top: 30px;
        padding: 8px;
        background-color: #fff;
        box-shadow: 0 0 3px #ccc;
        &::before{
          content: "";
          position: absolute;
          top: -12px;
          left: -1px;
          z-index: 10;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-bottom-color: #d8d6d6;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          width: 250px;
          border-left: 1px solid #d8d6d6;
          border-bottom: 1px solid #d8d6d6;
          li{
            overflow: hidden;
            width: 25px;
            height: 25px;
            border-right: 1px solid #d8d6d6;
            border-top: 1px solid #d8d6d6;
            line-height: 25px;
            font-size: 18px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
article.comment-area{
  ul li{
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px dashed #ddd;
    font-size: 12px;
    font-family: Microsoft YaHei, "sans-serif";
    .reply-wrap{
      margin: 10px 8px 8px 55px;
    }
    .comment-wrap, .reply-wrap{ //评论
      display: flex;
      img{
        width: 40px;
        height: 40px;
        margin-right: 15px;
        border-radius: 50%;
      }
      .message-box{
        .name-time{
          font-size: 12px;
          margin-bottom: 3px;
          span:nth-child(1){
            color: #73b899;
          }
          span:nth-child(2){
            color: #aaa;
            margin-left: 10px;
          }
        }
        p.text{
          text-indent: 0;
          color: #666;
          letter-spacing: 2px;
          margin-bottom: 3px;
          word-break: break-word;
          span{
            color: rgb(39, 179, 235);
          }
        }
        .like-reply{
          i{
            cursor: pointer;
            font-size: 14px;
            color: #aaa;
          }
          .red{
            color: red;
          }
          span{
            margin-right: 40px;
            font-size: 12px;
            color: #aaa;
          }
        }
      }
    }
    // 回复框
    .print-reply{
      overflow: hidden;
      width: 100%;
      height: 0;
      margin-top: 5px;
      padding-left: 55px;
      box-sizing: border-box;
      transition: height .2s;
      &.show{
        height: 60px;
      }
      .el-button{
        float: right;
      }
    }
  }
}
</style>
