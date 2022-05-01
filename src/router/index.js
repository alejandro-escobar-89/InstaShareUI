import { createWebHistory, createRouter } from 'vue-router';
// import { storeToRefs } from 'pinia';
// import { useUserStore } from '../stores/user';
import HomePage from '../views/HomePage';
import RegisterPage from '../views/auth/RegisterPage';
import LoginPage from '../views/auth/LoginPage';
import UserDashboard from "../views/user/UserDashboard";
import FileList from '../views/file/FileList';
import FileCreate from '../views/file/FileCreate';
import FileShow from '../views/file/FileShow';
import FileEdit from '../views/file/FileEdit';

const index = [
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
  routes: index,
  scrollBehavior() {
    // Always scroll to top
    return {top: 0};
  },
});

/*router.beforeEach((to) => {
  const { authenticated } = storeToRefs(useUserStore());

  if (to.meta.authOnly && !authenticated && (to.name !== 'Login')) {
    return {name: 'login'};
  }

  if (to.meta.guestOnly && authenticated) {
    return false;
  }
});*/

export default router;