import { createRouter, createWebHistory } from 'vue-router';
import Login from "@/components/LoginForm.vue";
import Signup from '@/components/SignUpForm.vue';
import Chat from '@/CreateResumeChat.vue';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
