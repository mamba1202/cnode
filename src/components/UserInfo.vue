<template>
  <div class="UserInfo">
    <!--如果正在加载显示此div-->
    <div
      class="loading"
      v-if="isLoading.gif"
    >
      <!--加载动画-->
      <img src="../assets/loading.gif">
    </div>
    <div
      class="userInfomation"
      v-else
    >
      <section>
        <img src="userinfo.avatar_url">
        <!--src动态绑定-->
        <span>{{userinfo.loginname}}</span>
        <p>
          {{userinfo.score}}积分
        </p>
        <p>
          注册时间：{{userinfo.create_at | formatDate}}
        </p>
      </section>
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
            this.userinfo = res.data.data;
            console.log(this.post);
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
.userInfomation section {
  padding: 12px;
}
.userInfomation img {
  width: 30px;
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
}
.userInfomation > div > ul > li > a {
  color: #094e99;
  text-decoration: none;
}
</style>

