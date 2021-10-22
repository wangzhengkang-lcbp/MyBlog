<template>
  <div class="all-article">
    <ul v-infinite-scroll="load">
      <li v-for="item in pageArticleData" :key="item._id">
        <header>
          <h2>{{item.title}}</h2>
          <div class="date">
            <p class="day">{{new Date(item.date).getDate()}}</p>
            <p class="month-year">
              <span>{{new Date(item.date).getMonth()+1}}</span>
              <span>{{new Date(item.date).getFullYear()}}</span>
            </p>
          </div>
        </header>
        <div class="article-content">
          <img :src="baseURL+item.coverUrl" alt="">
          <p class="describe">{{item.describe}}</p>
        </div>
        <div class="other">
          <p>阅读数：{{item.readingNum}}</p>
          <router-link :to="`/message/${item._id}`">点击阅读</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data(){
    return{
      pageArticleData:[],//文章数据列表 
      allArticleData:[], //所有文章数据
      skip:5 //初始5
    }
  },
  methods:{
    //请求获取所有的文章数据
    async getArticles(){
      let {data} = await this.$axios({
        method:"GET",
        url:"/getAllArticle"
      });
      if(data.code) return this.$message.error(data.message);//没有文章时/报错，直接return
      console.log(data);
      this.allArticleData = data.data; //所有文章数据给allArticleData
      this.pageArticleData.push(
        ...this.allArticleData.slice(0, this.skip) //截取0-5下标位置的数组成员（返回值也是数组）
      );
    },
    load(){
      if(!this.allArticleData.length) return; //不存在文章数据时直接返回
      this.pageArticleData.push(
        ...this.allArticleData.slice(this.skip, this.skip+3) //截取5-10下标位置的数组成员（返回值也是数组）
      );
      this.skip += 3;
    }
  },
  created(){
    this.getArticles(); //请求获取所有的文章数据
  }
}
</script>
<style lang="less" scoped>
.all-article li{
  position: relative;
  width: 100%;
  padding: 20px;
  margin-bottom: 8px;
  background-color: #fff;
  box-shadow: 0 0 4px #ddd;
  font-family: Quicksand;
  
  header{
    h2{
      margin-bottom: 15px;
      border-left: 5px solid #73b899;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      text-indent: 10px;
    }
    .date{
      position: absolute;
      top: 0;
      right: 10px;
      width: 60px;
      .day{
        font-weight: bolder;
        font-size: 40px;
        text-align: center;
        color: #6bc30d;
      }
      .month-year *{
        margin-right: 15px;
      }
    }
  }
  .article-content{
    overflow: hidden;
    display: flex;
    width: 100%;
    height: 145px;
    img{
      width: 200px;
      height: 145px;
      border-radius: 8px;
    }
    .describe{
      padding-left: 2%;
      line-height: 30px;
      font-size: 14px;
      letter-spacing: 2px;
      color: #333;
    }
  }
  .other{
    position: absolute;
    right: 20px;
    bottom: 20px;
    p{
      position: relative;
      top: -10px;
      color: #aaa;
      font-size: 12px;
    }
    a{
      padding: 6px 10px;
      background-color: #409eff;
      color: #fff;
      font-size: 14px;
      transition: opacity 0.3s;
      &:hover{
        opacity: 0.8;
      }
    }
  }
}
</style>
