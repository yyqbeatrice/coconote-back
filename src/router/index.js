import {createRouter, createWebHistory} from 'vue-router'


import ContentPage from '../components/content.vue'
import EditPage from '../components/edit.vue'
import NewPage from '../components/newpage.vue'
import CalendarPage from '../components/calendar.vue'
import TrashPage from '../components/trash.vue'


const routes = [
    {
        path: '/',
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;