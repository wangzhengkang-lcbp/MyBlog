<template>
  <div class="hot">
      <h3>热门文章</h3>
      <ul>
          <li v-for="(item, index) in hotArticle" :key="item._id">
              <i>{{index+1}}</i>
              <router-link :to="`/message/${item._id}`" target="_blank">{{item.title}}</router-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: "HOtArtical",
    data(){
        return {
            hotArticle:[]
        }
    },
    methods:{
        //请求获取所有的文章数据
        async getArticles(){
            let {data} = await this.$axios({
                method:"GET",
                url:"getAllArticle"
            });
            if(data.code) return ;//没有文章时直接return
            this.hotArticle = data.data.slice(0,3); //0-3下标位置的文章数据
        }
    },
    created(){
        this.getArticles();
    }
}
</script>

<style lang="less" scoped>
    .hot{
        width: 100%;
        padding: 20px;
        margin-bottom: 5px;
        box-sizing: border-box;
        background: #fff;
        h3{
            width: 100%;
            height: 25px;
            font-weight: bold;  
            border-bottom: 1px solid rgb(160, 158, 158);
        }
        ul{
            width: 100%;
            li{
                display: flex;
                overflow: hidden;
                align-items: center;
                margin-top: 20px;
                i{
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    margin-right: 10px;
                    font-size: 16px;
                    font-family: Quicksand;
                    background-color: gold;
                }
                a{  
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: gray;
                    font-size: 14px;
                }
            }
        }
    }
</style>