<template>
  <div class="container">
    <Navbar/>
    <NewChatForm/>
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import Navbar from '../components/Navbar.vue';
import NewChatForm from '../components/NewChatForm.vue';
import getUser from '../composables/getUser';

export default {
  components: { Navbar, NewChatForm },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    // watch user obj
    watch(user, () => {
      // user is a ref, need to use user.value
      if (!user.value) {
        router.push({ name: 'Welcome' });
      }
    });

    return { user };
  }
};
</script>