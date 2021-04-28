import { createRouter, createWebHistory } from 'vue-router';

import { projectAuth } from '../firebase/config';

import Chatroom from '../views/Chatroom.vue';
import Welcome from '../views/Welcome.vue';

// auth guard
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  // console.log(user);
  if (!user) {
    next({ name: 'Welcome' });
  }
  next();
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    // check auth before entering the chatroom
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
