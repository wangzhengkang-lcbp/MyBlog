<template>
  <Topleft></Topleft>
  <!-- <div :class="{"fixed"="fixd"}"> -->
  <div :class="{fixedbox:fixed}">
    <HotArtical></HotArtical>
    <Visitor></Visitor>
  </div>
</template>

<script>
import Topleft from "@/components/left/Topleft";
import HotArtical from "@/components/left/HotArtical";
import Visitor from "@/components/left/Visitor";
export default {
  data() {
    return {
        fixed:false
    }
  },
  name: "Maxleft",
  components: {
    Topleft,
    HotArtical,
    Visitor,
  },
  methods:{
      scroll(){
          let top = document.documentElement.scrollTop;
          this.fixed = (top >= 205)
      } 
  },
  mounted(){
      this.scroll()
      window.addEventListener("scroll",()=>{
          this.scroll();
      })
  }
};
</script>
<style lang="less" scoped>
.fixedbox {
  position: fixed;
  top: 45px;
  width: 265.85px;
}
</style>