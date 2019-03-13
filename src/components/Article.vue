<template>
  <div class="article">
    <!--如果正在加载显示此div-->
    <div
      class="loading"
      v-if="isLoading.gif"
    >
      <!--加载动画-->
      <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">{{post.title}}</div>
        <ul>
          <li>发布与：{{post.create_at | formdtDate}}</li>
          <li>作者{{post.author.loginname}}</li>
          <li>{{post.visit_count}}次浏览</li>
          <li>来自{{post | tabFormatter}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Article",
  data() {
    return {
      isLoading: false, //是否正在加载
       post: {}, //代表当前文章页的所有内容和属性
    };
  }
};
</script>
<style scoped>
</style>

