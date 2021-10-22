<template>
  <div class="me">
    <div class="hello">
      <h3>HELLO!</h3>
      <p>
        你好！欢迎来到我的博客！我是一名WEB前端工程师，热衷于研究JavaScript、Node、Vue、微信小程序……这是我的主页！我会在这里发表一些不成熟的技术文章，记录一些沙雕的日常。博客目前使用的是Vue
        + Element + Node + Koa2 +
        MongoDB搭建的，如果对源码感兴趣的话可以联系我哦~ 欢迎提出宝贵的建议哦！
      </p>
    </div>
    <div class="text">
      <div class="skill">
        <div class="msg">
          <h3>个人信息</h3>
          <ul>
            <li>
              <p>NICKNAME</p>
              <p>乐此不疲</p>
            </li>
            <li>
              <p>SEX</p>
              <p>🚹♂🚹♂</p>
            </li>
            <li>
              <p>AGE</p>
              <p>永远18</p>
            </li>
            <li>
              <p>HOBBY</p>
              <p>必然是学习</p>
            </li>
          </ul>
        </div>
        <div class="can">
          <h3>技能</h3>
          <ul>
            <li>
              <p class="lang">
                <span>HTML5 &amp; CSS3</span>
                <span>90%</span>
              </p>
              <p class="level1 level"></p>
            </li>
            <li>
              <p class="lang">
                <span>JavaScript</span>
                <span>80%</span>
              </p>
              <p class="level2 level"></p>
            </li>
            <li>
              <p class="lang">
                <span>Vue.js</span>
                <span>80%</span>
              </p>
              <p class="level3 level"></p>
            </li>
            <li>
              <p class="lang">
                <span>Node &amp; Koa2</span>
                <span>75%</span>
              </p>
              <p class="level4 level"></p>
            </li>
            <li>
              <p class="lang">
                <span>Mongodb</span>
                <span>70%</span>
              </p>
              <p class="level5 level"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="recommend">
    <div class="describe">
      <h2>推荐</h2>
      <p><a href="/message">更多热门文章</a> 请访问文章页（￣︶￣）↗　</p>
    </div>
    <div class="article-list">
      <ul>
        <li v-for="item in recommendArticle" :key="item._id">
          <img :src="baseURL + item.coverUrl" alt="图片" />
          <h3>{{ item.title }}</h3>
          <div class="cover">
            <a :href="`/message/${item._id}`">
              <p>{{ item.describe }}</p>
              <p>点击</p>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="work">
    <h2>学习经历</h2>
    <ul>
      <li>
        <p class="time">2018-2019</p>
        <div class="introduce">
          <h3>初学前端</h3>
          <p class="company">自学</p>
          <p class="describe">
            刚开始认识前端一是专业相似、二就是兴趣而爱、 刚开始自学了html+css3、 能够自己写一些小的静态网页、 也就自能自己瞅瞅、 因为丑的一批、 不忍直视。
          </p>
        </div>
      </li>
      <li>
        <p class="time">2019-2020</p>
        <div class="introduce">
          <h3>数据交互</h3>
          <p class="company">线上培训班</p>
          <p class="describe">
            对前端有了一定的了解之后、因为兴趣愈加浓厚、就找到了一个web全栈培训班、虽然有点小贵、但我还是毅然决然的报名了、当然在培训期间我也是学到了许多知识、动手操作能力更强了、碰到了bug老师还会帮忙分析纠错、这对我来说真的太有帮助了、我突然觉的我当时的决定是对的
          </p>
        </div>
      </li>
      <li>
        <p class="time">2020-2021</p>
        <div class="introduce">
          <h3>Vue,Koa2框架</h3>
          <p class="company">实战训练</p>
          <p class="describe">
            经过两年的学习、对前端工程师也有了更深刻的理解、学习的路上很坎坷、 解bug很头疼、 经历了各种各样的稀奇古怪的磨练、最终打算写了一个个人博客、 希望在面试中面试官能瞅上两眼、 虽然这个作品平平无奇、 但也是对于实习应届生的我来说是一个大工程和大考验、 希望未来前途光名、 继续努力的一直走下去。
          </p>
        </div>
      </li>
    </ul>
  </div>
  <div class="callme">
    <div class="describe">
      <h2>联系我</h2>
      <p>有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
    </div>
    <!-- 表单 -->
    <el-form
      :model="contactForm"
      :rules="rules"
      ref="contactForm"
      label-position="top"
    >
      <el-form-item label="你的名字是？" prop="name">
        <el-input v-model="contactForm.name"></el-input>
      </el-form-item>
      <el-form-item label="你的邮箱" prop="email">
        <el-input v-model="contactForm.email"></el-input>
      </el-form-item>
      <el-form-item label="你要发送的消息内容" prop="message">
        <el-input v-model="contactForm.message"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      //推荐文章数据的数组
      recommendArticle: [],
      contactForm: {
        //表单的数据对象
        name: "",
        email: "",
        message: "",
      },
      rules: {
        //表单的验证规则   与标签中的prop属性值对应
        name: [{ required: true, message: "name值必须填写", trigger: "blur" }],
        email: [{ required: true, type: "email", trigger: "blur" }],
        message: [{ required: true, trigger: "blur" }],
      },  
    };
  },
  methods: {
        submitForm() {
          /* 
        在html标签里写ref属性，比如ref="wanzi"
        在js中，通过this.$refs.wanzi 得到写了ref属性的dom节点。
      */
          console.log('反馈请求成功'); //表单节点代理对象
          this.$refs.contactForm.validate(async (result) => {
            if (result) {
              //校验通过  发起请求，将数据发送给后端
              let { data } = await this.$axios({
                method: "POST",
                url: "/feedback",
                data: this.contactForm,
              });
              if (data.code) return this.$message.error(data.message);
              this.$message.success(
                "已收到您的反馈，作者会在7个工作日内回复的！"
              );
              this.$refs.contactForm.resetFields(); //清空表单
            } else {
              //未通过校验
              return false;
            }
          });
        },
        //请求获取所有的文章数据
        async getArticles() {
          let { data } = await this.$axios({
            method: "GET",
            url: "/getAllArticle",
          });
          if (data.code) return; //没有文章时直接return
          this.recommendArticle = data.data.slice(0, 4); //0-4下标位置的文章数据
        },
      },
      created() {
        this.getArticles();
      },
};
</script>
<style lang="less" scoped>
.me {
  width: 100%;
  background: white;
  box-sizing: border-box;
  padding: 10px;
  font-family: "Quicksand";
  .hello {
    border-bottom: 1px solid #ccc;
    h3 {
      margin: 20px 0px;
      font-size: 25px;
      font-weight: bold;
      letter-spacing: 4px;
      font-family: Quicksand;
    }
    p {
      // border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      font-family: "Quicksand";
    }
  }
  .skill {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .msg {
      width: 50%;
      h3 {
        margin: 20px 0px;
        font-size: 22px;
        color: rgb(114, 112, 112);
      }
      ul {
        width: 100%;
        overflow: hidden;
        li {
          display: flex;
          margin-bottom: 52px;
          font-size: 13px;
          font-family: "Quicksand";
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
          p {
            flex: 1;
          }
          p:nth-child(1) {
            font-weight: 700;
          }
        }
      }
    }
    .can {
      width: 50%;
      h3 {
        margin: 20px 0px;
        font-size: 22px;
        color: rgb(114, 112, 112);
      }
      li {
        margin-bottom: 30px;
        font-size: 13px;
        .lang {
          display: flex;
          justify-content: space-between;
          span {
            font-weight: bold;
            letter-spacing: 2px;
          }
          span:nth-child(2) {
            color: #999;
          }
        }
        .level {
          width: 100%;
          height: 5px;
        }
        .level1{background-image: linear-gradient(to right, #bfe2e6 90%, #ececec 90%);}
        .level2 {background-image: linear-gradient(to right, #bfe2e6 80%, #ececec 80%);}
        .level3 {background-image: linear-gradient(to right, #bfe2e6 80%, #ececec 80%);}
        .level4 {background-image: linear-gradient(to right, #bfe2e6 75%, #ececec 75%);}
        .level5 {background-image: linear-gradient(to right, #bfe2e6 70%, #ececec 70%);}
        &:nth-last-child(1) {
          margin-bottom: 0px;
        }
      }
    }
  }
}
// 推荐 + 工作经历
.recommend {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
  background: white;
  .describe {
    padding-bottom: 24px;
    font-size: 14px;
    border-bottom: 1px solid rgb(150, 148, 148);
    h2 {
      font-weight: bolder;
      font-size: 24px;
      margin: 15px 0px;
    }
    p {
      margin-left: 30px;
      a {
        text-decoration: underline;
        color: #aaa;
      }
    }
  }
  .article-list ul {
    display: flex;
    overflow: hidden;
    width: 100%;
    margin-top: 20px;
    justify-content: space-between;
    li {
      position: relative;
      width: 24%;
      img {
        width: 100%;
        height: 100%;
      }
      h3 {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 26px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        line-height: 26px;
        text-align: center;
        font-size: 12px;
      }
      .cover {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        transition: 0.3s;
        a {
          display: block;
          width: 100%;
          height: 100%;
          color: #fff;
          text-align: center;
          p {
            position: absolute;
            font-weight: bold;
            transition: 0.3s;
          }
          p:nth-child(1) {
            width: 100%;
            top: 20%;
            font-size: 18px;
          }
          p:nth-child(2) {
            left: 50%;
            bottom: 20%;
            width: 50%;
            height: 30px;
            line-height: 30px;
            background-color: rgb(191, 226, 230);
            color: #000;
            font-size: 14px;
            transform: translateX(-50%);
            border-radius: 15px;
          }
        }
      }
      &:hover .cover {
        opacity: 1;
        p:nth-child(1) {
          top: 30%;
        }
        p:nth-child(2) {
          bottom: 30%;
        }
      }
    }
  }
}
.work {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
  background: white;
  h2 {
    font-weight: bolder;
    font-size: 24px;
    margin: 15px 0px;
  }
  ul {
    margin-top: 45px;
    width: 100%;
    li {
      display: flex;
      justify-content: space-between;
      width: 100%;
      // margin-bottom: 40px;
      .time {
        position: relative;
        top: -15px;
        width: 100px;
        height: 30px;
        margin-right: 28px;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
        background-color: #bfe2e6;
        &::after {
          position: absolute;
          content: "";
          top: 0;
          right: -30px;
          width: 0;
          height: 0;
          border: 15px solid transparent;
          border-left-color: #bfe2e6;
        }
      }
      .introduce {
        position: relative;
        padding: 0 40px 40px 20px;
        border-left: 2px solid #bfe2e6;
        &::after {
          position: absolute;
          top: 0;
          left: -3px;
          content: "";
          width: 4px;
          height: 4px;
          background-color: #000;
        }
        h3 {
          position: relative;
          margin-bottom: 20px;
          bottom: 11px;
          line-height: 25px;
          font-size: 20px;
          font-weight: bold;
        }
        .company {
          color: #000;
          margin-bottom: 20px;
        }
        .describe {
          width: 575px;
          color: #777;
          letter-spacing: 1px;
          font-size: 16px;
          line-height: 26px;
        }
      }
      &:nth-last-child(1) .introduce {
        padding-bottom: 0;
      }
    }
  }
}
.callme {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
  background: white;
  .describe {
    padding-bottom: 24px;
    font-size: 14px;
    border-bottom: 1px solid rgb(150, 148, 148);
    h2 {
      font-weight: bolder;
      font-size: 24px;
      margin: 15px 0px;
    }
    p {
      margin-left: 30px;
      color: rgb(122, 121, 121);
    }
  }
}
</style>
