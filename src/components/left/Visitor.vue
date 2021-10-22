<template>
  <div class="visitor">
    <h3>最近访客</h3>
    <ul>
      <li v-for="item in visitorData" :key="item._id">
        <img
          :src="baseURL + '/head_photo' + item.visitor.head_photo"
          alt="头像"
        />
        <p>{{ item.visitor.user }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Visitor",
  data() {
    return {
      visitorData: [], //访客数据
    };
  },
  methods: {
    async getVisitor() {
      let { data } = await this.$axios({
        method: "GET",
        url: "/getVisitor",
      });
      if (data.code) return; //没有访客时直接return
      data.data.sort(function (a, b) {
        return b.date - a.date;
      });
      console.log(data.data);
      
      this.visitorData = data.data.slice(0, 8);
    },
  },
  created() {
    this.getVisitor();
  },
};
</script>

<style lang="less" scoped>
.visitor {
  width: 100%;
  padding: 20px;
  margin-bottom: 5px;
  box-sizing: border-box;
  background: #fff;
  h3 {
    width: 100%;
    height: 25px;
    font-weight: bold;
    border-bottom: 1px solid rgb(160, 158, 158);
  }
  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 20px;
    li {
      position: relative;
      width: 20%;
      height: 46px;
      margin: 5px;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgb(114, 110, 110);
        color: white;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        opacity: 0.6;
      }
    }
  }
}
</style>