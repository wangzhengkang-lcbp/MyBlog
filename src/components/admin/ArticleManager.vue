<template>
  <div class="article-manager">
    <el-input
      @input="searchArticle"
      placeholder="请输入搜索内容"
      v-model="searchText"
      prefix-icon="el-icon-search"
    ></el-input>
    <el-table :data="resultArticleData" style="width: 100%">
      <el-table-column label="标题" width="140">
        <template #default="scope">
          <el-input v-model="scope.row.title"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="140">
        <template #default="scope">
          <el-input v-model="scope.row.describe"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="重新上传md">
        <template #default="scope">
          <el-upload
            class="upload-demo"
            :action="`${baseURL}/md`"
            :limit="1"
            :with-credentials="true"
            :on-success="
              function (res) {
                //这里接收res数据，并调用mdUploadSuccess，传入res/id
                mdUploadSuccess(res, scope.row._id);
              }
            "
            :before-upload="mdBeforeUpload"
            :show-file-list="false"
          >
            <el-button size="mini" type="success">重新上传</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="重新上传封面图" width="180">
        <template #default="scope">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <el-image
              style="width: 50px; height: 50px"
              :src="baseURL + scope.row.coverUrl"
              :preview-src-list="[baseURL + scope.row.coverUrl]"
              :hide-on-click-modal="true"
            >
            </el-image>
            <el-upload
              class="upload-demo"
              :action="`${baseURL}/cover`"
              :limit="1"
              :with-credentials="true"
              :show-file-list="false"
              :on-success="
                function (res) {
                  coverUploadSuccess(res, scope.row._id);
                }
              "
              :before-upload="coverBeforeUpload"
            >
              <el-button size="mini" type="warning">重传封面</el-button>
            </el-upload>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            @click="
              updateArticle(scope.row._id, {
                title: scope.row.title,
                describe: scope.row.describe,
              })
            "
          >
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="deleteArticle(scope.row._id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ArticleManager",
  data() {
    return {
      allArticleData: [], //文章数据数组
      resultArticleData: [], //存放当前搜索文章的结果的数组
      searchText: ""   //搜索的内容关键词
    };
  },
  methods: {
    //根据关键词搜索表格中的文章内容
    searchArticle() {
      let text = this.searchText.trim(); //得到搜索关键词
      //如果
      if (text) {
        let arr = [];
        //根据关键词，显示匹配的文章
        this.allArticleData.forEach((item) => {
          if (item.title.includes(text) || item.describe.includes(text)) {
            //文章标题和描述中包含关键词
            arr.push(item);
          }
        });
        this.resultArticleData = arr;
      } else {
        //显示全部的文章
        this.resultArticleData = this.allArticleData;
      }
    },
    //请求获取所有的文章数据
    async getArticles() {
      let { data } = await this.$axios({
        method: "GET",
        url: "/getAllArticle",
      });
      if (data.code) return this.$message.error(data.message);
      this.allArticleData = data.data;//全部的文章数据存到数组中
      this.searchArticle();
    },
    //md上传文件之前调用的钩子函数
    mdBeforeUpload(file) {
      let isMd = /^(.+)\.md$/.test(file.name);
      if (isMd) {
        //只有文件后缀名为.md时
        return true;
      } else {
        this.$message.error("只能上传.md后缀名的文件");
      }
    },
    //md文件上传后调用的钩子函数
    mdUploadSuccess(res, id) {
      if (res.code) return this.$message.error(res.message); //失败
      this.updateArticle(id, { mdUrl: res.mdUrl });
      // this.articleForm.mdUrl = res.mdUrl; //得到md文件的地址
    },
    //封面图片上传文件之前调用的钩子函数
    coverBeforeUpload(file) {
      if (file.status === "ready") {
        const isJPG = file.raw.type === "image/jpeg";
        const isLt2M = file.raw.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        
        return isJPG && isLt2M;
      }
    },
    //封面图片上传后调用的钩子函数
    coverUploadSuccess(res, id) {
      if (res.code) return this.$message.error(res.message); //失败
      this.updateArticle(id, { coverUrl: res.coverUrl }); //更新文章数据中的coverUrl值
    },
    //修改文章数据
    async updateArticle(id, doc) {
      let { data } = await this.$axios({
        method: "POST",
        url: "/updateArticle",
        data: { id, doc },
      });
      console.log(data);
      if (data.code) return this.$message.error(data.message);
      this.getArticles(); //修改文章数据后，重新获取最新的文章数据
    },
    //删除文章
    async deleteArticle(id) {
      let { data } = await this.$axios({
        method: "DELETE",
        url: `/deleteArticle/${id}`,
      });
      console.log(data);
      this.getArticles(); //修改删除数据后，重新获取最新的文章数据
    },
  },
  created() {
    this.getArticles();
  },
};
</script>

<style>
</style>