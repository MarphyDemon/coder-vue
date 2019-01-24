<template>
  <div>
    <el-table :data="tableData" border stripe style="width: 100%" fit>
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column prop="question_title" label="题名">
        <template slot-scope="scope">
          <el-button
            @click="goQuestion(scope.row, scope.$index)"
            type="text"
            size="small"
            style="text-align:left"
          >{{scope.row.question_title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="question_des" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column label="解答">
        <template slot-scope="scope">
          <el-button 
            @click="handleClick(scope.row, scope.$index)" 
            type="text" 
            size="small"
            style="text-align:left">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="question_pass" label="通过数"></el-table-column>
      <el-table-column prop="question_grade" label="难度"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20,30,40,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="float: right;margin-right:100px;margin-top:30px;"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
        type: Array,
        default: []
    },
    currentPage: {
        type: Number
    },
    total: {
        type: Number
    },
    pageSize: {
        type: Number
    }
  },
  methods: {
    handleClick(row, index) {
        this.$router.push({path: '/question', query:{'questionId':row.id,'createId':row.question_author,'xh': index+1,'checkResult': true}})
    },
    goQuestion(row, index) {
        this.$router.push({path: '/question', query:{'questionId':row.id,'createId':row.question_author,'xh': index+1}})
    },
    handleSizeChange(val){
      this.$emit("size-change",val)
    },
    handleCurrentChange(val){
      this.$emit("page-change",val)
    }
  }
};
</script>
