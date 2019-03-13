<template>
  <div id="app">
    <Header></Header>
    <div class="main">
    <router-view name="main"><PostList></PostList></router-view> <!--对应index.js路由中的main--对应显示那个组件的内容-->
    </div>
    
  </div>
</template>

<script>
import Header from "./components/Header"
import PostList from './components/PostList'
export default {
  name: "App",
  components: {
    Header,
    PostList
  }
}
</script>

<style>
.main{
  width: 80%;
  margin: 0 auto;
}
</style>
