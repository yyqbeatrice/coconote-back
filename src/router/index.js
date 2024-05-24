import {createRouter, createWebHistory} from 'vue-router'


import ContentPage from '../components/content.vue'
import EditPage from '../components/edit.vue'
import NewPage from '../components/newpage.vue'
import CalendarPage from '../components/calendar.vue'
import TrashPage from '../components/trash.vue'
import WelcomePage from '@/components/welcome.vue'
import RegisterPage from '@/components/registerpage.vue'
import LoginPage from '@/components/loginpage.vue'
import DetailPage from '@/components/notedetail.vue'


const routes = [
    {
        path: '/',
        name: 'WelcomePage',
        component: WelcomePage,
    },
    {
        path: '/content',
        name: 'ContentPage',
        component: ContentPage,
    },
    {
        path: '/edit',
        name: 'EditPage',
        component: EditPage
    },
    {
        path: '/new',
        name: 'NewPage',
        component: NewPage
    },
    {
        path: '/calendar',
        name: 'CalendarPage',
        component: CalendarPage
    },
    {
        path: '/trash',
        name: 'TrashPage',
        component: TrashPage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    },
    {
        path: '/detail',
        name: 'DetailPage',
        component: DetailPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;