<template>
  <div class="interface">
    <div class="header">
      <a href="/">主页</a>
      <span class="divider">/</span>
      <span class="title">API</span>
    </div>
    <div
      class="top"
      v-show="isScrollTop"
      @click="scrollToTop"
    >
      <img
        src="../assets/up.png"
        alt="图片"
      >
      <p>顶部</p>
    </div>
    <section>
      <div class="api">
        <p>以下 api 路径均以<a
            href="https://cnodejs.org/api/v1"
            target="_blank"
          >https://cnodejs.org/api/v1</a> 为前缀</p>
      </div>
      <div class="timeline">
        <h2>主题</h2>
        <h4>get /topics 主题首页</h4>
        <p>接收 get 参数</p>
        <ul>
          <li><span>page</span> <code>Number</code> 页数</li>
          <li><span>tab </span><code>String</code> 主题分类。目前有 ask share job good</li>
          <li><span>limit</span> <code>Number</code> 每一页的主题数量</li>
          <li><span>mdrender</span> <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
        </ul>
        <p>示例：<a href="/api/v1/topics">/api/v1/topics</a></p>
        <h4>get /topic/:id 主题详情</h4>
        <p>接收 get 参数</p>
        <ul>
          <li><span>mdrende</span> <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
          <li><span>accesstoken</span> <code>String</code> 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的is_collect以及replies 列表中的is_uped值。</li>
        </ul>
        <p>示例：<a href="/api/v1/topic/5433d5e4e737cbe96dcef312">/api/v1/topic/5433d5e4e737cbe96dcef312</a></p>
      </div>
      <div class="collect">
        <h2>主题收藏</h2>
        <h3>post /topic_collect/collect 收藏主题</h3>
        <p>接收 post 参数</p>
        <ul>
          <li><span>accesstoken</span> <code>String</code> 用户的 accessToken</li>
          <li><span>topic_id</span> <code>String</code> 主题的id</li>
        </ul>
        <p>返回值示例</p>
        <pre class="prettyprint language-js"><code>{&quot;success&quot;: true}</code></pre>
        <h4>post /topic_collect/de_collect 取消主题</h4>
        <p>接收 post 参数</p>
        <ul>
          <li><span>accesstoken</span> <code>String</code> 用户的 accessToken</li>
          <li><span>topic_id</span> <code>String</code> 主题的id</li>
        </ul>
        <p>返回值示例</p>
        <pre class="prettyprint language-js"><code>{success: true}</code></pre>
        <h4>get /topic_collect/:loginname 用户所收藏的主题</h4>
        <p>示例：<a href="/api/v1/topic_collect/alsotang">/api/v1/topic_collect/alsotang</a></p>
      </div>
      <div class="user">
        <h2>用户</h2>
        <h4>get /user/:loginname 用户详情</h4>
        <p>示例：<a href="/api/v1/user/alsotang">/api/v1/user/alsotang</a></p>
        <h4>post /accesstoken 验证 accessToken 的正确性</h4>
        <p>接收 post 参数</p>
        <ul>
          <li>accesstoken <code>String</code> 用户的 accessToken</li>
        </ul>
        <p>如果成功匹配上用户，返回成功信息。否则 403。</p>
        <p>返回值示例</p>
        <pre class="prettyprint language-js"><code>{success: true, loginname: req.user.loginname, id: req.user.id, avatar_url: req.user.avatar_url}</code></pre>
      </div>
      <div class="message">
        <h2>消息通知</h2>
        <h4>get /message/count 获取未读消息数</h4>
        <p>接收 get 参数</p>
        <ul>
          <li>accesstoken <code>String</code></li>
        </ul>
        <p>返回值示例</p>
        <pre class="prettyprint language-js"><code>{ data: 3 }</code></pre>
        <h4>get /messages 获取已读和未读消息</h4>
        <p>接收 get 参数</p>
        <ul>
          <li>accesstoken <code>String</code></li>
          <li>mdrender <code>String</code> 当为 <code>false</code> 时，不渲染。默认为 <code>true</code>，渲染出现的所有 markdown 格式文本。</li>
        </ul>
        <p>返回值示例</p>
        <pre class="prettyprint language-js"><code>{
  data: {
    has_read_messages: [],
    hasnot_read_messages: [
      {
        id: &quot;543fb7abae523bbc80412b26&quot;,
        type: &quot;at&quot;,
        has_read: false,
        author: {
          loginname: &quot;alsotang&quot;,
          avatar_url: &quot;https:&#x2F;&#x2F;avatars.githubusercontent.com&#x2F;u&#x2F;1147375?v=2&quot;
        },
        topic: {
          id: &quot;542d6ecb9ecb3db94b2b3d0f&quot;,
          title: &quot;adfadfadfasdf&quot;,
          last_reply_at: &quot;2014-10-18T07:47:22.563Z&quot;
        },
        reply: {
          id: &quot;543fb7abae523bbc80412b24&quot;,
          content: &quot;[@alsotang](&#x2F;user&#x2F;alsotang) 哈哈&quot;,
          ups: [ ],
          create_at: &quot;2014-10-16T12:18:51.566Z&quot;
          }
        },
    ...
    ]
  }
}
</code></pre>
        <h4>post /message/mark_all 标记全部已读</h4>
        <p>接收 post 参数</p>
        <ul>
          <li>accesstoken <code>String</code></li>
        </ul>
        <p>返回值示例</p>
        <pre class="prettyprint language-js"><code>{ success: true,
  marked_msgs: [ { id: &#x27;544ce385aeaeb5931556c6f9&#x27; } ] }
</code></pre>
        <h4>post /message/mark_one/:msg_id 标记单个消息为已读</h4>
        <p>请求示例：<a href="/message/mark_one/58ec7d39da8344a81eee0c14">/message/mark_one/58ec7d39da8344a81eee0c14</a></p>
        <p>接收 post 参数</p>
        <ul>
          <li>accesstoken <code>String</code></li>
        </ul>
        <p>返回值示例</p>
        <pre class="prettyprint language-js"><code>{
  success: true,
  marked_msg_id: &quot;58ec7d39da8344a81eee0c14&quot;
}
</code></pre>
      </div>
      <div class="knowledge">
        <h2>知识点</h2>
        <ol>
          <li>如何获取 accessToken？
            用户登录后，在设置页面可以看到自己的 accessToken。
            建议各移动端应用使用手机扫码的形式登录，验证使用 <code>/accesstoken</code> 接口，登录后长期保存 accessToken。</li>
        </ol>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "Interface",
  data() {
    return {
      scrollTop: null,
      isScrollTop: false
    };
  },
  mounted() {
    //window.addEventListener('scroll', this.handleScroll)
    window.addEventListener(
      "scroll",
      () => {
        this.scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;

        // 控制滚动按钮的隐藏或显示
        if (this.scrollTop > 300) {
          this.isScrollTop = true;
        } else {
          this.isScrollTop = false;
        }
      },
      true
    );
  },
  methods: {
    scrollToTop() {
      let $this = this;
      // 返回顶部动画特效
      setTimeout(function animation() {
        if ($this.scrollTop > 0) {
          setTimeout(() => {
            // 步进速度
            $this.scrollTop = $this.scrollTop - 30;
            // 返回顶部
            if (document.documentElement.scrollTop > 0) {
              document.documentElement.scrollTop = $this.scrollTop - 30;
            } else if (window.pageYOffset > 0) {
              window.pageYOffset = $this.scrollTop - 30;
            } else if (document.body.scrollTop > 0) {
              document.body.scrollTop = $this.scrollTop - 30;
            }
            animation();
          }, 1);
        }
      }, 1);
    }
  }
};
</script>
<style scoped>
.interface {
  width: 80%;
  background-color: white;
  padding: 20px;
}
.header{
   padding-bottom: 16px;
   border-bottom: 1px solid rgb(225, 225, 225);
}
h4{
  border-bottom: 4px solid rgb(231, 231, 231);
  padding-bottom: 20px;
}
a{
  color: #4078c0;
  text-decoration: none;
}
.timeline,
.collect,
.user,
.message,
.knowledge {
  padding: 20px;
}
.timeline,
.collect,
.user,
.message {
  border-bottom: 1px solid rgb(225, 225, 225);
}
 li {
  line-height: 2;
  font-size: 14px;
}
.timeline ul span {
  display: inline-block;
  width: 80px;
  padding-right: 10px;
}
.collect ul span {
  display: inline-block;
  width: 90px;
  padding-right: 10px;
}
.timeline ul code {
  display: inline-block;
 
  text-align: start;
  padding: 0 15px;
}
.collect ul code {
  display: inline-block;
  width: 40px;
  text-align: start;
  padding: 0 15px;
}
.prettyprint {
  background-color: rgb(247, 247, 247);
  padding: 5px;
  color: #080;
}
.top {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgb(32, 160, 255);
  position: fixed;
  bottom: 40px;
  right: 60px;
}
.top p {
  text-align: center;
  line-height: 20px;
  color: black;
}
.top img {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 5px;
  top: -6px;
  color: red;
}
</style>
