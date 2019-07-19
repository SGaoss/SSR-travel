<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters  :data="fixedFlightsData" @changeDataList="changeDataList"/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                
                <!-- 航班信息 -->
                <div>
                   <FlightsItem 
                   v-for="(item,index) in dataList"
                  :key="index"
                   :data="item"
                   />

                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                </div>

            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead"
import FlightsItem from "@/components/air/flightsItem"
import FlightsFilters from "@/components/air/flightsFilters"
import FlightsAside from "@/components/air/flightsAside"
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
    data(){
        return {
          flightsData: {
            flights: [],
            info: {},
             options: {}
          },
          fixedFlightsData:{
             flights: [ ],
             info: {},
             options: {}
          },
        //   dataList:[],
          pageIndex: 1, // 当前页数
          pageSize: 5,  // 当前页面的条数
          total: 0,     // 总条数
        }
    },
     computed: {
       dataList(){
           return this.flightsData.flights.slice(
              (this.pageIndex - 1) * this.pageSize,
              this.pageSize * this.pageIndex);
       }
   },
   
    beforeRouteUpdate (to, from, next) {
        next();
        this.getData();
    },
     mounted () {
     this.getData()
   },
    methods: {
        getData(){
             this.$axios({
                url: `airs`,
                method:"GET",
                params: this.$route.query 
            }).then(res => {
            //   console.log(res)
                this.flightsData = res.data;
                // this.dataList = this.flightsData.flights;
                this.fixedFlightsData = {...res.data}
                this.total = this.flightsData.flights.length;
            });
        },
        handleSizeChange(value){
            this.pageSize = value;
            // this.setDataList();
        },
        handleCurrentChange(value){
            this.pageIndex = value;
            // this.setDataList();
        },
        // setDataList(){
        //     this.dataList = this.flightsData.flights.slice(
        //         (this.pageIndex - 1) * this.pageSize, 
        //         this.pageSize * this.pageIndex
        //     );
        // },
        changeDataList(arr){
            this.flightsData.flights = arr
        }
    } ,
  
  
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>