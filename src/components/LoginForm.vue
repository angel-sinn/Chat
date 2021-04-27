<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="Password" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import useLogin from '../composables/useLogin'

export default {
  // context is second argument
  setup(props, context) {
    const email = ref("");
    const password = ref("");

    const { error, login } = useLogin();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        // for composition api, need to use context to emit
        context.emit('login')
      } 
    }

    return { email, password, handleSubmit, error };
  }
}
</script>
