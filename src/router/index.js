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

// if user is logged in, then they don't see the welcome(login) page
const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: 'Chatroom' });
  }
  next();
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth
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
