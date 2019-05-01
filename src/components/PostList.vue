<template>
  <div class="PostList">
   
    <!--代表主题帖子列表-->
    <div class="post">
       <!--在数据未返回时，显示这个正在加载的gif-->
    <div class="loading" v-if="isLoading" >
      <!--加载动画-->
      <img src="../assets/loading.gif">
    </div>
    <ul>
       <li>
          <div class="toobar">
            <span @click="changeTab('')" :class="{active:tabString===''}">全部</span>
            <span @click="changeTab('good')" :class="{active:tabString==='good'}">精华</span>
            <span @click="changeTab('share')" :class="{active:tabString==='share'}">分享</span>
            <span @click="changeTab('ask')" :class="{active:tabString==='ask'}">问答</span>
            <span @click="changeTab('job')" :class="{active:tabString==='job'}">招聘</span>
          </div>
        </li>
    </ul>
    <div></div>
      <ul class="articles-lists">
        <li v-for="post in posts">
          <!--:key="post.posts"-->
          <!--头像-->
          <img
            :src="post.author.avatar_url"
            alt=""
          >
          <!--动态绑定-->
          <!--回复/浏览-->
          <span class='reply '>
            <span class="reply_count">{{post.reply_count}}</span>
            <span>/</span>
            <span class="count_of_visits">{{post.visit_count}}</span>
          </span>
          <!--帖子的分类-->
          <span
            class="all"
            :class="[{put_good:(post.good ==true),put_top:(post.top == true),put_tab:(post.tab == 'ask'),
           'topiclist-tab':(post.good !=true && post.top !=true &&post.tab != 'ask')}]"
          >
            <span>
              {{post | tabFormatter}}
            </span>
          </span>
          <!--标题-->
          <router-link :to="{
            name:'post_content', 
            params:{
              id: post.id,
              name: post.author.loginname
            }}">
            <span>
              {{post.title}}
            </span>
          </router-link>

          <!--最终回复时间-->
          <span class="last_reply">
            {{post.last_reply_at | formatDate}}
          </span>
        </li>
        <li>
          <!--分页-->
          <pagination @handleList="renderList"></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from "./Pagination";
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: [], //代表页面列表数组
      postpage: 1,
      tabString: ""
    };
  },
  components: {
    pagination
  },
  methods: {
    getData: function() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            //get请求要用params
            page: this.postpage,
            limit: 20,
            tab: this.tabString
          }
        })
        .then(res => {
          (this.isLoading = false), //加载成功之后去除动画
            (this.posts = res.data.data);
        })
        .catch(function(err) {
          //处理返回失败后的问题
          console.log(err);
        });
    },
    renderList(value) {
      this.postpage = value;
      this.getData();
    },
    changeTab(value) {
      this.tabString = value;
      this.getData();
    }
  },
  beforeMount() {
    this.isLoading = true, //加载成功之前显示加载动画
      this.getData(); //在页面加载之前获取数据
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.PostList {
  background-color: #e1e1e1;
}
.post {
  margin-top: 10px;
  height: 100vh;
}
.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li{
  padding: 9px 15px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}
li {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}
.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}
.reply {
  width: 70px;
  display: inline-block;
  text-align: center;
  height: 30px;
  white-space: nowrap;
}
.reply_count {
  color: #9e78c0;
  font-size: 14px;
}
.count_of_visits {
  font-size: 10px;
  color: rgb(180, 180, 180);
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
.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 60px;
  background-color: #f5f5f5;
  line-height: 60px;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
}
.toobar span.active {
  background-color: #80bd01;
  color: #fff;
  padding: 1px 4px;
  border-radius: 3px;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
a {
  text-decoration: none;
  color: black;
  margin-left: 20px;
  height: 30px;
}
a:hover {
  text-decoration: underline;
}
a span {
  height: 30px;
}
.loading {
  text-align: center;
  padding-top: 300px;
}
</style>


