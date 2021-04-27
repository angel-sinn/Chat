<template>
  <nav>
    <div>
      <p>Hey there... display name here</p>
      <p class="email">Currently logged in as... email</p>
    </div>
    <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout';

export default {
  setup() {
    const { error, logout } = useLogout();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log('use logged out');
      }
    }

    return { error, handleClick };
  }
}
</script>

<style>
  nav {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: rgb(26, 38, 77);
  }
  nav p.email {
    font-size: 14px;
    color: rgb(128, 127, 127);
  }
</style>