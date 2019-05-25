<template>
  <div class="about">
    <div class="header">
      <a href="/">主页</a>
      <span class="divider">/</span>
      <span class="title">关于</span>
    </div>
    <main>
      <section>
        <div class="about-v">
        <h1>关于 cnode-vue</h1>
        <blockquote>
        <span>基于vue和vue-router构建的cnodejs web网站,调用 cnode 社区提供的 API 为接口。</span>
        <br>
        <span>
          以 Vue-cli 创建项目模版，使用 Axios 获取数据，
          使用 Vue Router 进行前端路由的切换及传参，使用 watch 监听路由的
          变化。
        </span>
        </blockquote>
        </div>
        <div class="address">
        <h2 class="about-v">源码地址</h2>
        <a href="https://github.com/mamba1202/cnode" target="_blank">https://github.com/mamba1202/cnode</a>
         </div>
         <div class="about-v">
        <h2>所用知识</h2>
        <ul>
          <li>Vue2</li>
          <li>Vue Router</li>
          <li> Axios</li>
          <li>ES6</li>
          <li>Vue-cli</li>
        </ul>
        </div>
         <div class="about-v">
        <h2>组件</h2>
        <ul class="details">
          <li><span>PosltList</span> <span>主列表</span></li>
          <li><span>Psgination </span><span>分页组件</span></li>
          <li><span>Article</span><span>文章的详情页</span> </li>
          <li><span>SlideBar</span><span>侧边栏</span> </li>
          <li><span>UserInfo </span><span>用户个人信息</span></li>
        </ul>
        </div>
      </section>
      <section>
        <h1>关于我</h1>
        <p>
          访问我的
          <a href="https://github.com/mamba1202/" target="_blank">github</a>
        </p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>

<style scoped>
.about {
  width: 80%;
  background-color: rgb(255, 255, 255);
  padding: 30px;
}
blockquote{
  padding: 0 1em;
  color: #777;
  border-left: .25em solid #ddd;
}
blockquote span{
  line-height: 2em;
}
.details span:first-child{
    display: inline-block;
    width: 90px;
    margin: 0 20px 0 0;
}
.about-v{
    border-bottom: 1px solid rgb(224,224,224);
}
ul li{
  color: #777;
}
a{
  padding-bottom: 20px;
}
.address h2{
  padding-bottom: 5px;
}
a{
  padding-bottom: 30px;
  color:#4078c0;
  text-decoration: none;
  }
</style>