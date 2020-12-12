<template>
  <v-card elevation-12>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          @keyup.enter="login"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show ? 'text' : 'password'"
          label="Password"
          required
          @keyup.enter="login"
          @click:append="show = !show"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="login-actions">
      <v-btn color="primary" @click.stop="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'unauthorized',
  middleware: 'guest',
  data() {
    return {
      valid: true,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [(v) => !!v || 'Password is required'],
      show: false,
    }
  },
  methods: {
    login() {
      const validEmail = this.email === 'dev@dev.io'
      const validPassword = this.password === '12345678'

      if (validEmail && validPassword) {
        this.$cookiz.set('logged-in', true)
        this.$router.push('/')
      }
    },
  },
}
</script>
<style lang="scss">
.login-actions {
  justify-content: flex-end;
}
</style>
