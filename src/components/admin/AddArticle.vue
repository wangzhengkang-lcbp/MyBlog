<template>
  <div>
    <el-form ref="articleForm" :model="articleForm" label-width="100px">
        <el-form-item label="标题">
            <el-input
                v-model="articleForm.title"
                placeholder="可以自动获取上传的md文件名称"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="描述">
            <el-input type="textarea" v-model="articleForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="上传md文件">
            <el-upload
                class="upload-demo"
                drag
                :action="baseURL + '/md'"
                :auto-upload="false"
                :limit="1"
                :with-credentials="true"
                ref="mdForm"
                :on-change="mdChange"
                :before-remove="beforeRemove"
                :on-success="mdUploadSuccess"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传文章封面">
            <el-upload
                class="avatar-uploader"
                :action="baseURL + '/cover'"
                :show-file-list="false"
                :auto-upload="false"
                :with-credentials="true"
                ref="coverForm"
                :on-change="coverChange"
                :on-success="coverUploadSuccess"
                
            >
            <!-- 缩略图 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">发表文章</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddArticle",
  data() {
    return {
      articleForm: {
        title: "",
        describe: "",
        mdUrl:"", //md文件的地址
        coverUrl:"" //封面的地址
      },
      imageUrl:""
    };
  },
  methods: {
    //添加md文件、成功上传md、上传失败时都会调用mdChange
    mdChange(file, fileList){ 
        // console.log(fileList);
        if(file.status === "ready"){ //为待上传状态时，对md文件做校验 
            if(/^(.+)\.md$/.test(file.name)){ //只有文件后缀名为.md时
                this.articleForm.title = RegExp.$1;  //获取上一次正则匹配结果中()组内匹配到的字符串内容
            }else{
                this.$message.error("只能上传.md后缀名的文件");
                fileList.pop(); //从尾部删除文件列表中的文件对象
            }
        }
    },
    //从文件列表中删除文件后，触发
    beforeRemove(file){
        this.articleForm.title = "";
    },
    //添加封面图片、成功上传封面、上传失败时都会调用coverChange
    coverChange(file, fileList){
        if(file.status === "ready"){
            const isJPG = file.raw.type === 'image/jpeg';
            const isLt2M = file.raw.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            if(isJPG && isLt2M){ //图片符合标准
                this.imageUrl = URL.createObjectURL(file.raw);//设置缩略图的路径
            }else{
                fileList.pop()
            }
        }
    },
    //点击提交按钮
    submitForm(){
        //先上传md文件
        this.$refs.mdForm.submit();   //先上传md文件
        console.log('上传按钮');
        
    },
    //文件上传后
    mdUploadSuccess(res){
        if(res.code) return this.$message.error(res.message);
        this.articleForm.mdUrl = res.mdUrl; //得到md文件的后端地址
        this.$message.success(res.message);
        console.log('md上传成功');
        

        //md上传成功后，接着上传的封面图
        if(this.imageUrl){
            //有封面，需要上传封面图
            this.$refs.coverForm.submit();//上传cover封面
        }else{
            //没有封面，接着提交表单的其他数据
            this.fromSubmit();//提交表单的数据到后端
        }
    },
    coverUploadSuccess(res){
        if(res.code) return this.$message.error(res.message);
        this.articleForm.coverUrl = res.coverUrl; //得到cover封面后端的地址
        this.$message.success(res.message);
        console.log('封面上传成功');
        
        this.fromSubmit();//提交表单的数据到后端
    },
    // 提交表单的数据到后端
    async fromSubmit(){
        let {data} = await this.$axios({
            method:"POST",
            url:"/addArticle",
            data:this.articleForm  //表单数据
        });
        this.$router.push(`/message/${data.data.id}`); //跳转到id对应的文章详情页
    }
  },
};
</script>


<style lang="less" scoped>
/deep/.el-upload {
  position: relative;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  border-radius: 6px;
  .avatar {
    display: block;
    max-width: 178px;
    max-height: 178px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>

