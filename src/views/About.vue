<template>
  <ul>
    <li>
      <h2>关于我</h2>
      <p>帅气这个形容词，大概就是为我而创造的吧😏</p>
      <p>谢谢你这么好看还这么关注我鸭！</p>
      <p>有必要强调一下！我还没有脱发！大概是写的代码还不够多...</p>
    </li>
    <li>
      <h2>关于网站</h2>
      <p class="it"><span>前 端</span>：<span>Vue + Element</span></p>
      <p class="it"><span>后 端</span>：<span>Node + Koa2 + Mongodb</span></p>
      <p>
        <span>服务器</span>：<a href="#">阿里云ECS</a> | <a href="#"> 腾讯云</a>
      </p>
      <p>这个博客终于能够在2021年上线了！</p>
      <p>
        每当我好不容易挤点时间写好代码准备上线时，总有前端技术在这个时间点做大的更新...ES2015、Node、Vue...很绝望，每次都是推翻重写，裂开...😭
      </p>
    </li>
    <li>
      <h2>关于版权</h2>
      <p>在注明出处的前提下，本站文章允许非商业用途的转载。</p>
    </li>
    <li>
      <h2>其他</h2>
      <p>
        我是一名前端开发者，也是一名前端技术讲师，如果有合作相关事宜的话，可以点这里联系我
        。或者可以在👈左侧边栏找到我的联系方式哦。
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "About",
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
    h2{
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }
    p{
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      a{
        color: #409eff;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    p.it{
      span:nth-child(2){
        color: #bd4147;
        background-color: rgba(27, 31, 35, 0.05);
        font-weight: 700;
      }
    }
  }
}
</style>
