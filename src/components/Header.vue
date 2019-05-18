<template>
  <div class="header">
    <router-link :to="{name:'root'}">
     <img src="../assets/cnodejs_light.svg">
    </router-link>
    <ul class="title">
      <router-link :to="{name:'root'}"><li>首页</li> </router-link>
      <li>新手入门</li>
      <router-link :to="{name:'interface'}"><li>API</li> </router-link>
      <router-link :to="{name:'about'}"><li>关于</li> </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header"
}
 
</script>
<style scoped>
.header{
    background-color: rgb(50, 64, 87);
    height: 60px;
}
img{
    max-width: 120px;
    margin-left: 150px;
    margin-top: 10px;
}
ul{
    list-style: none;
    float:right;
    margin: 4px;
    padding-right: 150px;}
li{
    display:inline-block;
    padding: 10px 15px;
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
}
.title li:hover{
     color: #80bd01;
}
</style>

