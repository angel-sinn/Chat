<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="Display Name" v-model="displayName">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Password" v-model="password">
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import useSignup from '../composables/useSignup';

export default {
  setup() {
    const { error, signup } = useSignup();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      console.log('user signed up');
    }

    return { displayName, email, password, handleSubmit };
  }
}
</script>
