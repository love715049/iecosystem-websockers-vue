<template>
  <div class="chat">
    <h1>This is an chat page</h1>
    <ul v-for="message in messages">
      <li>
        {{ message.user_id }}
        {{ message.user_id === userId ? 'user:' : 'admin:' }}
        {{ message.body }}
      </li>
    </ul>
    <input name="" placeholder="Type your message..." v-model="newMessage">
    <button type="button" @click="addMessage">送出</button>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  export default {
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    data() {
      return {
        messages: [],
        newMessage: '',
        userId: 25 //TODO
      }
    },
    created: function () {
      this.axios.get('http://iecosystem_backend.test/api/users/' + this.userId + '/messages?page=1&perPage=100')
        .then((response) => {
          this.messages = (response.data.data)
        })
      this.$echo.channel('users.' + this.userId)
        .listen('UserMessageCreatedEvent', e => {
          this.messages.push(e.message)
        })
    },
    methods: {
      addMessage () {
        if (this.newMessage === '') {
          return false;
        }
        this.axios.post('http://iecosystem_backend.test/api/users/' + this.userId + '/messages', {body: this.newMessage})
          .then((response) => {
            this.messages.push({body:this.newMessage, user_id:this.user.user.id})
            this.newMessage = ''
          })
      }
    }
  }
</script>
