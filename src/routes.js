import { createWebHistory, createRouter } from 'vue-router';
import HomePage from './components/HomePage';
import RegisterPage from './components/auth/RegisterPage';
import LoginPage from './components/auth/LoginPage';
import UserDashboard from "./components/user/UserDashboard";
import FileList from './components/file/FileList';
import FileCreate from './components/file/FileCreate';
import FileShow from './components/file/FileShow';
import FileEdit from './components/file/FileEdit';

const routes = [
    // ---------- Base ----------
    {
        name: 'home',
        path: '/',
        component: HomePage,
    },

    // ---------- Auth ----------
    {
        name: 'register',
        path: '/register',
        component: RegisterPage,
    },
    {
        name: 'login',
        path: '/login',
        component: LoginPage,
    },

    // ---------- User ----------
    {
        name: 'userDashboard',
        path: '/dashboard',
        component: UserDashboard,
    },

    // ---------- Files ----------
    {
        name: 'fileList',
        path: '/files',
        component: FileList,
    },
    {
        name: 'fileCreate',
        path: '/files/create',
        component: FileCreate,
    },
    {
        name: 'fileShow',
        path: '/files/:id/show',
        component: FileShow,
    },
    {
        name: 'fileEdit',
        path: '/files/:id/edit',
        component: FileEdit,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior() {
        // Always scroll to top
        return {top: 0};
    },
});

export default router;