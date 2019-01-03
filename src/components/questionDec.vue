<!--题目 
     描述
     示例[
         {输入，结果}
     ]
     通过数
     通过率
     难度
     点赞
     收藏 -->
<style lang="scss">
    .question-dec{
        width: 100%;
        padding-right: 30px;
        .easy-dec{
            width: 100%;
            margin: 20px 0;
            line-height: 28px;
            float: right;
            padding-right: 50px;
            .question-title{
                display: inline-block;
            }
            .right-dec{
                display: block;
                float: right;
                span{
                    font-size: 12px;
                    margin-right: 10px;
                }
            }
        }
        .description{
            margin-bottom: 20px;
            p{
                text-indent:2em;
                line-height: 24px;
            }
        }
        .example{
            .example-box{
                padding: 10px 20px;
                background: #eee;
            }
        }
    }
</style>

<template>
    <div class="question-dec">
        <div class="easy-dec">
            <h2 class="question-title">{{questionXh}}.{{question.question_title}}</h2>
            <span>贡献者:{{creater}}</span>
            <div class="right-dec">
                <span>通过数:{{question.question_pass}}</span>
                <span>挑战数:{{question.question_count}}</span>
                <span>难度:{{question.question_grade}}</span>
            </div>
        </div>
        <div class="description">
            <h3>题目描述:</h3>
            <p>{{question.question_des}}</p>
        </div>
        <div class="example">
            <h3>示例:</h3>
            <div class="example-box">
                <span v-for="item in examples" :key="item.intput">
                    <p><span>输入:</span><span>{{item.intput}}</span></p>
                    <p><span>输出:</span><span>{{item.output}}</span></p>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        question: {
            type: Object
        },
        questionXh: '',
        creater: {
            type: String
        },
        examples: {
            type: Array
        }
    },
    data() {
        return {
        }
    },
    created() {
    }
}
</script>
