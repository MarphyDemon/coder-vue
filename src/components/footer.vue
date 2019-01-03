<style lang="scss">
.footer{
    width: 100%;
    border-top: 1px solid #eeeeee;
    text-align: center;
    line-height: 48px;
    position: absolute;
    left: 0;
    bottom: 0;
    .footer-link{
        span{
            img{
                width: 14px;
            }
        }
        a{
            margin-left: 10px;
        }
    }
}
</style>

<template>
    <div class="footer">
        <div class="footer-link">
            <span>Copyright @2018 MarphyDemon 版权所有</span>
            <span>陇ICP备17002990号-1
                <img src="../assets/img/beian.png" alt="">
                陇ICP备17002990号
            </span>    
            <a href="">帮助中心</a>
            <a href="">常见问题</a>
            <a href="">问题反馈</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            img:''
        }
    }
}
</script>
