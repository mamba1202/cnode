<template>
  <div class="UserInfo">
    <!--如果正在加载显示此div-->
    <div
      class="loading"
      v-if="isLoading.gif"
    >
      <!--加载动画-->
      <img
        class="user-avatar"
        src="../assets/loading.gif"
      >
    </div>
    <div
      class="userInfomation"
      v-else
    >
      <main>
        <img :src="userinfo.avatar_url">
        <!--src动态绑定-->
        <section class="info">
          <p class="info-list">
            <span>用户名:</span>
            <span>{{userinfo.loginname}}</span>
          </p>
          <p class="info-list">
            <span> 积分:</span>
            <span>{{userinfo.score}}</span>
          </p>
          <p class="info-list">
            <span> 注册时间:</span>
            <span>{{userinfo.create_at | formatDate }}</span>
          </p>
        </section>

      </main>
      <div class="replies">
        <p>回复的主题</p>
        <ul>
          <li v-for="item in userinfo.recent_replies">
            <router-link :to="{
            name:'post_content',  //路由跳转
            params:{
              id: item.id  //拿到id
            }}">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="topics">
        <p>创建的主题</p>
        <ul>
          <li v-for="item in userinfo.recent_topics">
            <router-link :to="{
            name:'post_content',  //路由跳转
            params:{
              id: item.id  //拿到id
            }}">
              {{item.title}}
            </router-link>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false, //是否正在加载
      userinfo: {} //代表当前文章页的所有内容和所有属性
    };
  },
  methods: {
    getData() {
      //this.$http.get('https://cnodejs.org/api/v1/topic'+'this.$route.params.id')
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          if (res.data.success == true) {
            this.isLoading = false;
            this.userinfo = res.data.data
          }
        })
        .catch(function(err) {
          //处理返回失败后的问题
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  }
};
</script>
<style scoped>

.userInfomation {
  background: white;
  width: 75%;
  margin: 10px auto;
}
.userInfomation main {
  padding: 12px;
  display: flex;
}
.userInfomation .info {
  padding-left: 20px;
}
.info span:first-child {
  width: 70px;
  height: 20px;
  display: inline-block;
  margin-right: 10px;
  color: #ccc;
}
.userInfomation img {
  height: 100px;
  width: 100px;
  margin: 10px;
}
.userInfomation li {
  list-style: none;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 0.72rem;
  border-top: 10px #dddddd solid;
}
.userInfomation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.75rem;
  margin: 0;
}
.userInfomation > div > ul > li {
  padding: 4px 0 4px 12px;
  white-space: nowrap;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  vertical-align: middle;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}
.userInfomation > div > ul > li:last-child{
 border-bottom: none;
}
.userInfomation > div > ul > li > a {
  color: #094e99;
  text-decoration: none;
  font-size: 13px;
}
</style>

