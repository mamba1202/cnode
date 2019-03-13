import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'

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
            path: '/topic/:id', //从postlist传过来的id
            components: {
                main: Article //指向组件
            }
        }
    ]
})
