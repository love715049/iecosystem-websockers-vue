<template>
  <div class="chat">
    <h1>This is an chat page</h1>
    <ul v-for="message in messages">
      <li>
        {{ message.user_id }}
        {{ message.user_id === user.user.id ? 'user:' : 'admin' }}
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
        newMessage: ''
      }
    },
    created: function () {
      this.axios.get('https://iecosystem-api.tomyue.cc/api/messages?page=1&perPage=100')
        .then((response) => {
          this.messages = (response.data.data)
        })
      this.$echo.channel('users.' + this.user.user.id)
        .listen('AdminMessageCreatedEvent', e => {
          this.messages.push(e.message)
        })
    },
    methods: {
      addMessage () {
        if (this.newMessage === '') {
          return false;
        }
        this.axios.post('https://iecosystem-api.tomyue.cc/api/messages', {body: this.newMessage})
          .then((response) => {
            this.messages.push({body:this.newMessage, user_id:this.user.user.id})
            this.newMessage = ''
          })
      }
    }
  }
</script>
