<template>
  <div>
    <el-table :data="contactData" style="width: 100%">
        <el-table-column label="日期" width="110">
            <template #default="scope">
                <span>{{ new Date(scope.row.date).toLocaleString() }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="100"> </el-table-column>
        <el-table-column prop="email" label="Email"> </el-table-column>
        <el-table-column prop="message" label="内容"> </el-table-column>
        <el-table-column label="是否处理">
            <template #default="scope">
               <el-switch
                    style="display: block"
                    v-model="scope.row.reading"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="已阅读"
                    inactive-text="未阅读"
                    @change="switchState(scope.row)"
                >
                </el-switch>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:"Feedback",
    data(){
        return {
            contactData:[] //反馈数据
        }
    },
    methods:{
        async getContactData(){//获取所有的反馈数据
            let {data} = await this.$axios({
                method:"GET",
                url:"/getFeedback"
            });
            if(data.code) return; //没有数据
            this.contactData = data.data;
        },
        //点击开关修改状态时触发
        async switchState(item){
            let {data} = await this.$axios({
                method:"POST",
                url:"/updateFeedback",
                data:{
                    id:item._id,
                    reading:item.reading //开关的状态布尔值
                }
            });
            if(data.code) return this.$message.error("状态修改失败"); //失败
            this.getContactData();
        }
    },
    created(){
        this.getContactData();
    }
}
</script>

<style>

</style>