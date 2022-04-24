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
    meta: { guestOnly: true }
  },

  // ---------- Auth ----------
  {
    name: 'register',
    path: '/register',
    component: RegisterPage,
    meta: { guestOnly: true }
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: { guestOnly: true }
  },

  // ---------- User ----------
  {
    name: 'userDashboard',
    path: '/dashboard',
    component: UserDashboard,
    meta: { authOnly: true }
  },

  // ---------- Files ----------
  {
    name: 'fileList',
    path: '/files',
    component: FileList,
    meta: { guestOnly: true }
  },
  {
    name: 'fileCreate',
    path: '/files/create',
    component: FileCreate,
    meta: { authOnly: true }
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
    meta: { authOnly: true }
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

/*router.beforeEach((to) => {
  if (to.meta.authOnly && !isAuthenticated && (to.name !== 'Login')) {
    return {name: 'login'};
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return false;
  }
});*/

export default router;