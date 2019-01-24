<!-- 题目 
     描述
     示例[
         {输入，结果}
     ]
     通过数
     通过率
     难度
     点赞
     收藏
     评价
     答案
     提交记录、提交数（后）
     贡献者
     同类题目     
     是否为面试题
-->
<style lang="scss">
.page {
  width: 1280px;
  margin: 0 auto;
}
</style>
<template>
  <div class="page">
    <el-row>
      <el-col :span="12" style="height:680px;">
        <el-tabs
          v-model="activeTab"
          type="card"
          tab-position="top"
          style="height: 100%; margin-top: 20px;"
        >
          <el-tab-pane label="题目详情" name="des">
            <question-dec 
              :question="question" 
              :question-xh="questionXh"
              :creater="creater"
              :examples="examples"></question-dec>
          </el-tab-pane>
          <el-tab-pane label="评论" name="comments"></el-tab-pane>
          <el-tab-pane label="示例答案" name="results">
            <div style="white-space: pre;">
              <span>{{question.question_right_code}}</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="码友解答" name="userResults"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12" style="height:680px;">
        <code-editor
          :question="question"
          ></code-editor>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import API from "../fetch/api.js";
import store from "../../store/store";
import questionDec from "COMPONENTS/questionDec";
import codeEditor from "COMPONENTS/editor";
export default {
  components: { questionDec, codeEditor },
  data() {
    return {
      question: {},
      ruleForm: {
        username: "ldd",
        code: `
def LetterCapitalize(str):
    arr = []
    strArr = str.split(" ")
    for i in strArr:
        a = i.capitalize()
        arr.append(a)
    newStr = " ".join(arr)
    return newStr
print(LetterCapitalize("Hello World!!!"))`,
        type: "python",
        questionTitle: "first",
      },
      result: "",
      questionId: this.$route.query.questionId,
      createId: this.$route.query.createId,
      questionXh: this.$route.query.xh,
      checkResult: this.$route.query.checkResult,
      activeTab: "des",
      creater: '',
      examples: []

    };
  },
  created() {},
  mounted() {
    if(this.checkResult){
      this.activeTab = "results"
    }
    this.getUserName();
    this.getQuestion();
  },
  methods: {
    getUserName() {
      let obj = {
        id: this.createId
      };
      API.getCreater(obj).then(res => {
        if (res.code == "200") {
          this.creater = res.data.username;
        } else {
          console.log(res.body);
        }
      });
    },
    getQuestion() {
      let obj = {
        id: this.questionId
      };
      API.getQuestion(obj).then(res => {
        if (res.code == "200") {
          this.question = res.data.data;
          this.examples = eval(res.data.data.question_example);
        } else {
          console.log(res.body);
        }
      });
    }
  }
};
</script>
