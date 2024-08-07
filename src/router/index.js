import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/LoginForm.vue";
import Signup from "@/components/SignUpForm.vue";
import CreateResumeChat from "@/CreateResumeChat.vue";
import UpdateResumeChat from "@/UpdateResumeChat.vue";
import CreateCoverLetterChat from "@/CreateCoverLetterChat.vue";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        name: "JobBot Login",
        component: Login
    },
    {
        path: "/signup",
        name: "JobBot Signup",
        component: Signup
    },
    {
        path: "/create/resume",
        name: "Create Resume Chat",
        component: CreateResumeChat
    },
    {
        path: "/update/resume",
        name: "Update Resume Chat",
        component: UpdateResumeChat
    },
    {
        path: "/create/cover-letter",
        name: "Create Cover Letter Chat",
        component: CreateCoverLetterChat
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
