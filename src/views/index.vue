<style lang="scss">
.page{
    width: 400px;
    margin: 200px auto;
    .el-input{
        margin-bottom: 20px;
    }
}

</style>
<template>
<div class="page">

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px">  
        <!--  :model="ruleForm" :rules="rules"  -->
        <el-form-item label="用户名称" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="代码类型" prop="type">
            <el-input v-model="ruleForm.type"></el-input>
        </el-form-item>
        <el-form-item label="问题序号" prop="questionTitle">
            <el-input v-model="ruleForm.questionTitle"></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="code">
            <el-input type="textarea" autosize v-model="ruleForm.code"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm()">执行</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
    <div>
        <el-input type="textarea" autosize v-model="result"></el-input>
    </div>
</div>
</template>


<script>
import API from "../fetch/api.js";
import store from "../../store/store"
export default {
	data(){
		return {
            ruleForm:{
                username:'ldd',
                code:`
def LetterCapitalize(str):
    arr = []
    strArr = str.split(" ")
    for i in strArr:
        a = i.capitalize()
        arr.append(a)
    newStr = " ".join(arr)
    return newStr
print(LetterCapitalize("Hello World!!!"))`,
                type: 'python',
                questionTitle: 'first'
            },
            result: ""
		}
	},
	mounted(){

	},
    methods:{
        submitForm(){
            var self=this;
			API.runCode(self.ruleForm).then(res => {
				if(res.code=="200"){
                    let data = res.data;
                    if(data.stderr){
                        this.result = data.stderr;
                    }else{
                        this.result = data.stdout;
                    }
					
				}else{
					console.log(res.body)
				}
			})
        },
        resetForm(){

        }
    }
}
</script>
