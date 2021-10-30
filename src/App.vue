<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/chat">Chat</router-link> |
      <router-link to="/admin-chat">AdminChat</router-link> |
      <router-link to="/about" v-if="isLogged">About</router-link>
      <router-link to="/login" v-else>Login</router-link>
    </div>
    <template v-if="isLogged">
      {{user.user.name}} {{user.user.email}}
    </template>
    <button type="button" @click="logout()" v-if="isLogged">
      Logout
    </button>

    <router-view/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isLogged', 'user'
    ])
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
