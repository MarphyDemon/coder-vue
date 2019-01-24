<template>
  <div style="width:1280px;margin: 50px auto;">
    <el-form
      label-position="left"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="题目名称:" prop="question_title">
        <el-input v-model="ruleForm.question_title"></el-input>
      </el-form-item>
      <el-form-item label="题目详情:" prop="question_des">
        <el-input type="textarea" v-model="ruleForm.question_des"></el-input>
      </el-form-item>
      <el-form-item
        :label="`题目示例${index+1}:`"
        prop="question_example"
        v-for="(item,index) in ruleForm.question_example"
        :key="item.intput"
      >
        <el-form-item label="输入示例" prop="intput" style="width:400px; display: inline-block;">
          <el-input v-model="item.intput"></el-input>
        </el-form-item>
        <el-form-item
          label="输出示例"
          prop="output"
          style="width:400px; display: inline-block; margin-right: 40px;"
        >
          <el-input v-model="item.output"></el-input>
        </el-form-item>
        <el-button v-if="index == ruleForm.question_example.length-1" @click="addExample">新增示例</el-button>
        <el-button @click="delExample(index)">删除示例</el-button>
      </el-form-item>
      <el-form-item label="题目难度:" prop="question_grade">
        <el-select v-model="ruleForm.question_grade" placeholder="请选择题目难度">
          <el-option label="青铜" value="青铜"></el-option>
          <el-option label="白银" value="白银"></el-option>
          <el-option label="黄金" value="黄金"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="示例答案:" prop="question_right_code">
        <el-input type="textarea" :rows="8" v-model="ruleForm.question_right_code"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center; margin-top: 100px;">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
    
<script>
import API from "../fetch/api.js";
export default {
  data() {
    return {
      ruleForm: {
        question_title: "",
        question_des: "",
        question_example: [
          {
            intput: "",
            output: ""
          }
        ],
        question_grade: "",
        question_right_code: ""
      },
      rules: {
        question_title: [
          { required: true, message: "请输入题目名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        question_des: [
          { required: true, message: "请选择题目详情", trigger: "blur" },
          {
            min: 20,
            max: 500,
            message: "长度在 20 到 500 个字符",
            trigger: "blur"
          }
        ],
        question_example: [
          { required: true, message: "请输入题目示例", trigger: "change" }
        ],
        question_grade: [
          { required: true, message: "请输入题目难度", trigger: "change" }
        ],
        question_right_code: [
          { required: true, message: "请输入题目示例答案", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addExample() {
      if (this.ruleForm.question_example.length >= 5) {
        alert("题目示例不能超过5个！");
        return false;
      }
      this.ruleForm.question_example.push({ input: "", output: "" });
    },
    delExample(index) {
      if (this.ruleForm.question_example.length == 1) {
        alert("题目示例至少存在一个！");
        return false;
      }
      this.ruleForm.question_example.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let option = {
            question_title: this.ruleForm.question_title,
            question_des: this.ruleForm.question_des,
            question_example: JSON.stringify(this.ruleForm.question_example),
            question_templete: this.ruleForm.question_right_code,
            question_grade: this.ruleForm.question_grade,
            question_right_code: this.ruleForm.question_right_code,
            question_status: 0
          };
          API.createQuestion(option).then(res => {
            if (res.code == "200") {
              alert("创建成功！")
                this.resetForm('ruleForm')
            } else {
              console.log(res.body);
            }
          });
        } else {
          alert("请检查输入内容!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.question_example = [{ intput: "", output: "" }];
    }
  }
};
</script>
