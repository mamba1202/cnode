<template>
  <div class="article">
    <!--如果正在加载显示此div-->
    <div
      class="loading"
      v-if="isLoading"
    >
      <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <div class="topic_header">
        <span
          class="all"
          :class="[{put_good:(post.good ==true),put_top:(post.top == true),put_tab:(post.tab == 'ask'),
           'topiclist-tab':(post.good !=true && post.top !=true &&post.tab != 'ask')}]"
        >
          <span class="classif">
            {{post | tabFormatter}}
          </span>
        </span>
        <span class="topic_title">{{post.title}}</span>
        <ul>
          <li>• 发布于: {{post.create_at | formatDate}}</li>
          <li>• 作者: {{post.author.loginname}}
          </li>
          <li>• {{post.visit_count}}次浏览</li>
          <li>• 来自{{post | tabFormatter}}</li>
        </ul>
        <main class="markdown-body topic_content"
          v-html="post.content"
        ></main>
        
      </div>
      <div id="reply"   class="markdown-body">
        <div class="topbar">回复</div>
        <div
          v-for="(reply,index)  in post.replies"
          class="replySec"
        >
          <div class="replyUp">
            <router-link :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }">
              <img
                :src="reply.author.avatar_url"
                alt=""
              >
            </router-link>
            <router-link :to="{
          name:'user_info',
          params:{
            name:reply.author.loginname
          }
          }">
              <span class="name">{{reply.author.loginname}}</span>
            </router-link>
            <span class="floor">
              {{index+1}}楼
            </span>
            <span class="time">发布于: {{post.create_at | formatDate}}</span>
            <span class="like" v-if="reply.ups.length>0">
              ☝ {{reply.ups.length}}
            </span>
            <span v-else>
            </span>
          </div>
          <p v-html="reply.content" class="content"></p>
        </div>
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
      post: {} //代表当前文章页的所有内容和所有属性
    };
  },
  methods: {
    getArticleData() {
      //this.$http.get('https://cnodejs.org/api/v1/topic'+'this.$route.params.id')
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          if (res.data.success == true) {
            this.isLoading = false;
            this.post = res.data.data;
            console.log(this.post);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
  //检测路由变化
  watch: {
    $route(to, from) {
      //从哪里来到哪里去
      this.getArticleData(); // 如果监测到路由发生变化就执行这个函数
    }
  }
};
</script>
<style>
@import url("../assets/markdown-github.css");
body {
  background-color: rgb(225, 225, 225);
}
.put_good {
  width: 28px;
  height: 24px;
  padding: 3px 3px 3px 5px;
  background-color: rgba(255, 73, 73, 0.1);
  border: 1px solid rgba(255, 73, 73, 0.2);
  color: #ff4949;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
}
.put_top {
  width: 28px;
  height: 24px;
  padding: 3px 3px 3px 5px;
  background-color: rgba(18, 206, 102, 0.1);
  color: #13ce66;
  border: 1px solid rgba(18, 206, 102, 0.2);
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
}
.put_tab {
  width: 28px;
  height: 24px;
  padding: 3px 3px 3px 5px;
  background-color: #e5e9f2;
  border: 1px solid #e5e9f2;
  color: #475669;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
}
.topiclist-tab {
  width: 28px;
  height: 24px;
  padding: 3px 3px 3px 5px;
  background-color: rgba(32, 159, 255, 0.1);
  color: #20a0ff;
  border: 1px solid rgba(32, 159, 255, 0.2);
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
}
.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 36px;
  font-size: 12px;
  margin-top: 10px;
}
.article {
  background-color: rgb(255, 255, 255);
  margin-left: -70px;
}
.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}
#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 15px;
  margin-bottom: 40px;
}

.replyUp img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}
.replyUp{
  margin-bottom: 15px;
}
.replyUp a,
.replyUpspan {
  font-size: 12px;
  color: #666;
  text-decoration: none;
}
.name{
  margin-left: 20px;
}
.floor {
  color: #08c;
  font-size: 12px;
  margin-left: 10px;
}
.time {
  color: #08c;
  font-size: 12px;
  margin-left: 10px;
}
.replySec{
  border-bottom: 1px solid #e5e5e5;
  padding: 0 20px;
  margin: 10px 0;
}
.like{
  float: right;
}
.loading {
  text-align: center;
  padding-top: 300px;
}
.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_header {
  padding: 10px 30px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
  padding-left: 5px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  color: #838383;
  display: inline;
  padding-left: 10px;
  font-size: 12px;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}
.topic_content ul {
  text-decoration: circle;
}
.topic_content li {
  font-size: 14px;
  line-height: 2em;
  list-style-type: disc;
}
.topic_content li a {
  color: rgb(9, 147, 172);
}
.topic_content li > ul > li {
  margin-left: 20px;
  list-style-type: circle;
}
.content {
  margin-top: 0;
  margin-bottom: 16px;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  margin-left: 50px;
  background: 0 0;
  color: #333;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
p {
  display: block;
  margin: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.markdown-text{
  vertical-align: baseline;
  
}
.markdown-text img {
  width: 92% !important;
}
.markdown-body {
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 20px;
}
.markdown-body >*:last-child{
   border-bottom: none;
}
</style>

