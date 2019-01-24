<style lang="scss">
</style>

<template>
  <div class="myEditor">
    <div class="set-editor" style="margin: 20px 0;">
      <el-select v-model="language" size="mini" @change="languageChange" placeholder="请选择语言">
        <el-option
          v-for="item in languageList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="theme" size="mini" @change="themeChange" placeholder="请选择主题">
        <el-option
          v-for="item in themeOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button @click="testCode()" size="mini">测试</el-button>
      <el-button type="primary" @click="submitCode()" size="mini">提交</el-button>
    </div>
    <div id="container" ref="container" style="height:400px;border:1px solid #dcdfe6;"></div>
    <el-tabs v-model="activeTest" type="border-card" tab-position="top">
        <!-- <el-tab-pane label="测试数据" name="testData">
            <div style="height: 140px;">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 5}"
                    placeholder="请输入内容"
                    v-model="testInput">
                </el-input>
            </div>
        </el-tab-pane> -->
        <el-tab-pane label="执行结果" name="testResult">
            <div style="height: 140px;">
                <div>
                    <span>运行结果:</span>
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 1}"
                        placeholder="请输入内容"
                        v-model="testOutput">
                    </el-input>
                </div>
                <!-- <div>
                    <span>期望结果:</span>
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 1}"
                        placeholder="请输入内容"
                        v-model="testOutput">
                    </el-input>
                </div> -->
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import * as monaco from "monaco-editor";
import store from '../../store/store';
import API from '../fetch/api'
export default {
  props: {
    question: {
      type: Object
    },
    codes: {
      type: String,
      default: function() {
        return this.question.question_templete;;
      }
    },
    language: {
      type: String,
      default: function() {
        return "python";
      }
    },
    editorOptions: {
      type: Object,
      default: function() {
        return {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false, // 只读
          cursorStyle: "line", //光标样式
          automaticLayout: false, //自动布局
          glyphMargin: true, //字形边缘
          useTabStops: false,
          fontSize: 28, //字体大小
          autoIndent: true //自动布局
        };
      }
    }
  },
  data() {
    return {
      themeOption: [
        {
          value: "vs",
          label: "纯白"
        },
        {
          value: "hc-black",
          label: "高亮"
        },
        {
          value: "vs-dark",
          label: "深色"
        }
      ],
      theme: "vs",
      codesCopy: null, //内容备份
      languageList: [
        {
          value: "python",
          label: "python"
        }
      ],
      testInput: '',
      testOutput: '',
      activeTest: 'testResult',
      username: store.state.username,
      result_status: false
    };
  },
  watch: {
    codes(){
      if(this.codes){
        this.initEditor();
      }
    }
  },
  methods: {
    initEditor() {
      let self = this;
      self.$refs.container.innerHTML = "";
      self.monacoEditor = monaco.editor.create(self.$refs.container, {
    // this.codesCopy = this.question.question_templete;
        value: self.codesCopy || self.codes,
        language: self.language,
        theme: self.theme, //vs, hc-black, or vs-dark
        editorOptions: self.editorOptions
      });
      self.$emit("onMounted", self.monacoEditor); //编辑器创建完成回调
      self.monacoEditor.onDidChangeModelContent(function(event) {
        //编辑器内容changge事件
        self.codesCopy = self.monacoEditor.getValue();
        self.$emit("onCodeChange", self.monacoEditor.getValue(), event);
      });
      //编辑器随窗口自适应
      window.addEventListener("resize", function() {
        self.initEditor();
      });
    },
    themeChange(val) {
      this.initEditor();
    },
    languageChange(val) {
      this.initEditor();
    },
    testCode() {
      let test_code = this.codesCopy || this.codes;
      test_code = test_code.replace(/^\n+|\n+$/g,"");
      let option = {
        question_id: this.question.id,
        question_title: this.question.question_title,
        result_code: test_code,
        question_right_code: this.question.question_right_code
      }
      API.testCode(option).then(res => {
        if (res.code == "200") {
          let data = res.data.runRes;
          this.result_status = res.data.result_status
          if (data.stderr) {
            this.testOutput = data.stderr;
          } else {
            this.testOutput = data.stdout;
          }
        } else {
          console.log(res.body);
        }
      });
    },
    submitCode() {
      let test_code = this.codesCopy || this.codes;
      test_code = test_code.replace(/^\n+|\n+$/g,"");
      let option = {
        question_id: this.question.id,
        result_code: test_code,
        result_status: this.result_status?1:0,
        is_own: 0
      }
      API.submitResult(option).then(res => {
        if (res.code == "200") {
          let data = res.data.runRes;
          if (data.stderr) {
            this.testOutput = data.stderr;
          } else {
            this.testOutput = data.stdout;
          }
        } else {
          console.log(res.body);
        }
      });
    }
  }
};
</script>
<style scoped>
#container {
  text-align: left;
}
</style>