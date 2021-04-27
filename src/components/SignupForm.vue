<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="Display Name" v-model="displayName">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Password" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import useSignup from '../composables/useSignup';

export default {
  // context is second argument
  setup(props, context) {
    const { error, signup } = useSignup();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        // for composition api, need to use context to emit
        context.emit('signup')
      } 
    }

    return { displayName, email, password, handleSubmit, error };
  }
}
</script>
