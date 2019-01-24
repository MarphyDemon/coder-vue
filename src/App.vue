<template>
  <div id="app">
    <header-bar v-if="urlFlag"></header-bar>
    <router-view></router-view>
    <!-- <footer-bar v-if="urlFlag"></footer-bar> -->
  </div>
</template>

<script>
import HeaderBar from "COMPONENTS/headerBar";
import footerBar from "COMPONENTS/footer";

export default {
  name: "App",
  components: { HeaderBar, footerBar },
  data() {
    return {
      urlFlag: true
    }
  },
  mounted(){
  },
  watch: {
    "$route": "urlChange"
  },
  created() {
    this.urlFlag = window.location.href.indexOf('/login')>0?false:true;
  },
  methods: {
    urlChange() {
      this.urlFlag = window.location.href.indexOf('/login')>0?false:true;
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/common";
</style>

