import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'
//注意路径
Vue.use(Router)

export default new Router({
    routes: [
        //根组件
        {
            name: 'root',
            path: '/',
            components: {
                main: PostList
            }
        },
        {
            name: 'post_content',
            path: '/topic/:id&author=:name', //从postlist传过来的id
            components: {
                main:Article, //指向组件
                slidebar:SlideBar
            }
        },
        {
            name: 'user_info',
            path:'/userinfo/:name',
            components:{
                main: UserInfo  //注意不是字符串
            }
        }
    ]
})
