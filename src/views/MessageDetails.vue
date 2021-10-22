<template>
    <div>
        <article>
            <main id="mdHtml"></main>
        </article>
    </div>
</template>

<script>
export default {
    name:"MessageDetails",
    async mounted(){
        const id = this.$route.params.id;  //得到动态路由的id值
        console.log(id, "检查接收到的动态路由id是否为正确的文章id");
        
        let {data} = await this.$axios({
            method:"GET",
            url:"/getArticle",
            params:{id}
        });
        // console.log(data, "检查返回的data数据中是否有正确的md文件路径");
        

        if(data.code){
            this.$message.error("你要查阅的文章不存在!");
            //重定向回到文章页面
            this.$router.replace("/message");
        }else{
            //发起请求，通过md文件地址得到文件数据
            let mdData = await this.$axios({
                method:"GET",
                url: data.data.mdUrl,
            });
            console.log(mdData); //........................404
            
            editormd.markdownToHTML("mdHtml", {
                markdown: mdData.data //md文件数据
            });
        }
    }
}
</script>