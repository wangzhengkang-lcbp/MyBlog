<template>
  <div>
    <article>
        <el-tabs v-model="activeName">
            <el-tab-pane label="发表文章" name="first">
                <AddArticle></AddArticle>
            </el-tab-pane>
            <el-tab-pane label="文章管理" name="second">
                <ArticleManager></ArticleManager>
            </el-tab-pane>
            <el-tab-pane label="添加友链" name="third">
                <AddLink></AddLink>
            </el-tab-pane>
            <el-tab-pane label="友链管理" name="fourth">
                <MangerLink></MangerLink>
            </el-tab-pane>
            <el-tab-pane label="反馈收集" name="fifth">
                <Feedback></Feedback>
            </el-tab-pane>
        </el-tabs>
    </article>
  </div>
</template>

<script>
import AddLink from "../components/admin/AddLink";
import MangerLink from "../components/admin/MangerLink";
import AddArticle from "../components/admin/AddArticle";
import ArticleManager from "../components/admin/ArticleManager";
import Feedback from "../components/admin/Feedback";
export default {
  name: "Admin",
  data(){
    return {
        activeName:"second"
    }
  },
  components:{AddLink,MangerLink,AddArticle,ArticleManager,Feedback },
  methods:{
    // 验证是否具有管理员权限
    async isCheck(){
      let {data} = await this.$axios({
          method: "POST",
          url:"/isAdmin"
      });
      if(data.code){ //不是管理员
        this.$router.replace("/"); //重定向首页路由
        this.$message.error(data.message)
      }else{
        this.$message.success(data.message);
        
      }
    }
  },
  created(){
    this.isCheck();   
  }
};
</script>

<style lang="less" scoped>
article {
  width: 100%;
  min-height: 720px;
  padding: 25px 20px;
  margin-bottom: 15px;
  background-color: #fff;
  font-family: Quicksand, Microsoft YaHei, sans-serif;
  box-sizing: border-box;
  box-shadow: 0 0 4px #ddd;
}
</style>