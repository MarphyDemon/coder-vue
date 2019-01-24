<template>
  <div>
    <el-container style="height: 680px;">
      <el-aside style="width: 100px;">
        <el-tabs v-model="activeTab" type="border-card" tab-position="left" style="height: 100%;" @tab-click="changeGrade">
          <el-tab-pane label="初级挑战" name="primary"></el-tab-pane>
          <el-tab-pane label="中级挑战" name="middle"></el-tab-pane>
          <el-tab-pane label="高级挑战" name="senior"></el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main>
        <question-list 
          :table-data="tableData"
          :current-page="page" 
          :total="total" 
          :page-size="pageSize"
          @size-change="changePageSize"
          @page-change="changeCurPage"
          ></question-list>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import API from "../fetch/api.js";
import questionList from "COMPONENTS/questionList";

export default {
  components: { questionList },
  data() {
    return {
      tableData: [],
      activeTab: "primary",
      page: 1,
      total: 10,
      pageSize: 10
    };
  },
  created() {
    this.getQuestionList();
  },
  methods: {
    getQuestionList() {
      let option = {
        question_grade: this.activeTab=='primary'?'青铜':this.activeTab=='middle'?"白银":"黄金",
        page: this.page,
        page_size: this.pageSize
      };
      API.questionList(option).then(res => {
        if (res.code == "200") {
          this.tableData = res.data.questionList;
          this.page = res.data.meta.current_page;
          this.total = res.data.meta.total;
          this.total = res.data.meta.total;
          this.pageSize = res.data.meta.page_size;
        } else {
          console.log(res.body);
        }
      });
    },
    changePageSize(val) {
      this.pageSize = val;
      this.getQuestionList();
    },
    changeCurPage(val) {
      this.page = val;
      this.getQuestionList();
    },
    changeGrade(){
      this.getQuestionList();
    }
  }
};
</script>
